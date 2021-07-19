import { AppSyncResolverEvent } from 'aws-lambda';
import { docClient } from '@libs/setup';
import { Avatar } from '../shop.type';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<Avatar> => {
  const nTop = event.arguments.nTop ?? 10;

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
        Limit: nTop,
        ProjectionExpression:
          'currentStreak, userId, #name, coinTotal, division',
      })
      .promise()
  ).Items.map((item, i) => ({ ...item, rank: i + 1 }));

  return data;
};

export type Arguments = {
  nTop?: number;
};
