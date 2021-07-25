import { AppSyncResolverEvent } from 'aws-lambda';
import { ID } from 'src/handlers/root.type';
import { docClient } from '@libs/setup';
import { Profile } from '../profile.type';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<Profile> => {
  const { userId, isMe } = event.arguments;

  const rawData = (
    await docClient
      .transactGet({
        TransactItems: [
          {
            Get: {
              TableName: process.env.DDB_TABLE_NAME!,
              Key: {
                pk: `USER#${userId}`,
                sk: 'profile',
              },
              ExpressionAttributeNames: {
                '#name': 'name',
              },
              ProjectionExpression: `#name, pairIds${
                isMe ? ', bubbleId, faceId' : ''
              }`,
            },
          },
          {
            Get: {
              TableName: process.env.DDB_TABLE_NAME!,
              Key: {
                pk: `USER#${userId}`,
                sk: 'leaderboard',
              },
              ExpressionAttributeNames: {
                '#name': 'name',
              },
              ProjectionExpression: `coinTotal, division, #name, userId, currentStreak`,
            },
          },
          {
            Get: {
              TableName: process.env.DDB_TABLE_NAME!,
              Key: {
                pk: `USER#${userId}`,
                sk: 'stockroom',
              },
              ProjectionExpression: `powerups, avatars, currentAvatar, currentPowerup`,
            },
          },
        ],
      })
      .promise()
  ).Responses;

  if (rawData?.some((item) => !item.Item)) {
    throw new Error('User does not exist');
  }

  const { pairIds, name, bubbleId, faceId } = rawData![0]!.Item;

  const friends =
    pairIds.length === 0
      ? []
      : (
          await docClient
            .transactGet({
              TransactItems: rawData![0]!.Item!.pairIds.map((pairId) => ({
                Get: {
                  TableName: process.env.DDB_TABLE_NAME!,
                  Key: {
                    pk: `PAIR#${pairId}`,
                    sk: 'null', // Sort key not needed but must be non-empty string
                  },
                  ProjectionExpression: `pairStreak, befriendDate, userIds`,
                },
              })),
            })
            .promise()
        ).Responses?.map(({ Item }) => {
          const [friend] = Item.userIds.filter(
            (user) => user.userId !== userId
          ); // Only return friend's names and ids
          return {
            ...Item,
            userId: friend.userId,
            name: friend.name,
          };
        });

  return {
    name,
    userId,
    bubbleId,
    faceId,
    leaderboard: rawData![1]!.Item,
    arsenal: rawData![2]!.Item,
    friends,
  };
};

export type Arguments = { userId: ID; isMe: boolean };
