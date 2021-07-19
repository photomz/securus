import { AppSyncResolverEvent } from 'aws-lambda';
import { ID } from 'src/handlers/root.type';
import { docClient } from '@libs/setup';
import { Friend } from '../friends.type';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<Friend[]> => {
  const { userId } = event.arguments;

  const { pairIds } = (
    await docClient
      .get({
        TableName: process.env.DDB_TABLE_NAME!,
        Key: {
          pk: `USER#${userId}`,
          sk: 'profile',
        },
        ProjectionExpression: `pairIds`,
      })
      .promise()
  ).Item;

  if (pairIds === undefined) {
    throw new Error('User does not exist');
  }

  const friends =
    pairIds.length === 0
      ? []
      : (
          await docClient
            .transactGet({
              TransactItems: pairIds.map((pairId) => ({
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

  return friends;
};

export type Arguments = { userId: ID };
