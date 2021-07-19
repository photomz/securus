import { AppSyncResolverEvent } from 'aws-lambda';
import { docClient } from '@libs/setup';
import { ID } from 'src/handlers/root.type';
import { Avatar } from '../shop.type';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<Avatar> => {
  const { userId } = event.arguments;
  const nClosest = event.arguments.nClosest ?? 10;

  const data = (
    await docClient
      .query({
        TableName: process.env.DDB_TABLE_NAME!,
        IndexName: 'LeaderboardIndex',
        ExpressionAttributeNames: {
          '#name': 'name',
        },
        ExpressionAttributeValues: {
          ':l': 'leaderboard',
        },
        KeyConditionExpression: 'sk = :l',
        ScanIndexForward: false,
        ProjectionExpression:
          'currentStreak, userId, #name, coinTotal, division',
      })
      .promise()
  ).Items.map((item, i) => ({ ...item, rank: i + 1 }));

  const userIndex = data.findIndex((item) => item.userId === userId);

  return data.slice(
    Math.max(userIndex - nClosest, 0),
    Math.min(userIndex + nClosest, data.length - 1) + 1
  );
};

export type Arguments = {
  nClosest?: number;
  userId: ID;
};
