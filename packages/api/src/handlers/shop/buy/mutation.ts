import { AppSyncResolverEvent } from 'aws-lambda';
import { docClient } from '@libs/setup';
import { ID } from 'src/handlers/root.type';
import { Avatar, Powerup, StockRoom } from '../shop.type';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<StockRoom> => {
  const { userId, price, avatar, powerup } = event.arguments;

  await docClient
    .transactWrite({
      TransactItems: [
        {
          Update: {
            TableName: process.env.DDB_TABLE_NAME!,
            Key: {
              pk: `USER#${userId}`,
              sk: 'stockroom',
            },
            ExpressionAttributeValues: {
              ':1': 1,
            },
            UpdateExpression: `ADD ${powerup ? 'powerups' : 'avatars'}.${
              powerup || avatar
            }.quantity :1`,
          },
        },
        {
          Update: {
            TableName: process.env.DDB_TABLE_NAME!,
            Key: {
              pk: `USER#${userId}`,
              sk: 'leaderboard',
            },
            ExpressionAttributeValues: {
              ':p': price,
              ':c': -price,
            },
            ConditionExpression: 'coinTotal >= :p',
            UpdateExpression: `ADD coinTotal :c`,
          },
        },
      ],
    })
    .promise();

  return 200;
};

export type Arguments = {
  userId: ID;
  price: number;
  avatar: Avatar;
  powerup: Powerup;
};
