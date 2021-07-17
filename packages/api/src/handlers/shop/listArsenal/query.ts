import { AppSyncResolverEvent } from 'aws-lambda';
import { docClient } from '@libs/setup';
import { ID } from 'src/handlers/root.type';
import { StockRoom } from '../shop.type';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<StockRoom> => {
  const { userId } = event.arguments;

  const rawData = (
    await docClient
      .transactGet({
        TransactItems: [
          {
            Get: {
              TableName: process.env.DDB_TABLE_NAME!,
              Key: {
                pk: `USER#${userId}`,
                sk: 'stockroom',
              },
              ProjectionExpression:
                'powerups, avatars, currentAvatar, currentPowerup',
            },
          },
          {
            Get: {
              TableName: process.env.DDB_TABLE_NAME!,
              Key: {
                pk: `USER#${userId}`,
                sk: 'leaderboard',
              },
              ProjectionExpression: 'coinTotal',
            },
          },
        ],
      })
      .promise()
  ).Responses;

  const flattenedData = {
    ...rawData![0]!.Item,
    ...rawData![1]!.Item,
  };

  // Reshape powerups and avatars from enum-indexed to array with name
  const reshape = (data) =>
    Object.entries(data).map(([name, obj]) => ({ ...obj, name }));

  return {
    ...flattenedData,
    powerups: reshape(flattenedData.powerups),
    avatars: reshape(flattenedData.avatars),
  };
};

export type Arguments = {
  userId: ID;
};
