/* eslint-disable no-console */
import { AppSyncResolverEvent } from 'aws-lambda';
import { ID } from 'src/handlers/root.type';
import { docClient } from '@libs/setup';

const earnCoins = async (userId, sum = 50) => {
  const response = await docClient
    .update({
      TableName: 'securus-dynamodb-dev-0.1.0',
      Key: {
        pk: `USER#${userId}`,
        sk: 'leaderboard',
      },
      ExpressionAttributeValues: {
        ':sum': sum,
      },
      UpdateExpression: 'SET coinTotal = coinTotal + :sum',
      ReturnValues: 'ALL_NEW',
    })
    .promise();

  const maskOnReward = {
    coinsEarned: sum,
    coinTotal: response.Attributes.coinTotal,
    currentStreak: response.Attributes.currentStreak,
  };

  return maskOnReward;
};

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<number> => {
  const { userId } = event.arguments;

  const maskOnReward = await earnCoins(userId);

  return maskOnReward;
};

export type Arguments = { userId: ID; nearCameraId: ID };
