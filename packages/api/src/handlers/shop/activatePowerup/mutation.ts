import { AppSyncResolverEvent } from 'aws-lambda';
import { docClient } from '@libs/setup';
import { ID } from 'src/handlers/root.type';
import { ActivatedPowerup, Powerup } from '../shop.type';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<ActivatedPowerup> => {
  const { userId, powerup } = event.arguments;

  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  const activatedPowerup = {
    name: powerup,
    expiresAt: tomorrow,
  };

  await docClient
    .update({
      TableName: process.env.DDB_TABLE_NAME,
      Key: {
        pk: `USER#${userId}`,
        sk: 'stockroom',
      },
      ExpressionAttributeValues: {
        ':decrement': -1,
        ':0': 0,
        ':activatedPowerup': activatedPowerup,
      },
      ConditionExpression: `powerups.${powerup}.quantity > :0`,
      UpdateExpression: `ADD powerups.${powerup}.quantity :decrement  SET currentPowerup = :activatedPowerup`,
    })
    .promise();

  return activatedPowerup;
};

export type Arguments = {
  userId: ID;
  powerup: Powerup;
};
