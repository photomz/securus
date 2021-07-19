import { AppSyncResolverEvent } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { InputUser } from 'src/handlers/root.type';
import { docClient } from '@libs/setup';
import { Friend } from '../friends.type';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<Friend> => {
  const { initiator, newFriend } = event.arguments;

  const pairId = uuid();
  const userIds = [initiator, newFriend];

  const newPair = {
    pairStreak: {
      max: 0,
      current: 0,
      isFrozen: false, // NOTE: For now isFrozen is static and inactive
    },
    befriendDate: new Date(),
  };

  await docClient
    .transactWrite({
      TransactItems: [
        {
          Put: {
            TableName: process.env.DDB_TABLE_NAME!,
            ConditionExpression: 'attribute_not_exists(sk)',
            Item: {
              pk: `PAIR#${pairId}`,
              sk: 'null',
              ...newPair,
              userIds,
            },
          },
        },
        ...userIds.map((user) => ({
          Update: {
            TableName: process.env.DDB_TABLE_NAME!,
            Key: {
              pk: `USER#${user.userId}`,
              sk: 'profile',
            },
            ExpressionAttributeValues: {
              ':item': [pairId],
              ':limit': 10,
            },
            ConditionExpression: 'size(pairIds) <= :limit',
            UpdateExpression: 'SET pairIds = list_append(pairIds, :item)',
          },
        })),
      ],
    })
    .promise();

  return {
    ...newPair,
    ...newFriend,
  } as Friend;
};

export type Arguments = { initiator: InputUser; newFriend: InputUser };
