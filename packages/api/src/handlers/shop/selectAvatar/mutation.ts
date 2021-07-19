import { AppSyncResolverEvent } from 'aws-lambda';
import { docClient } from '@libs/setup';
import { ID } from 'src/handlers/root.type';
import { Avatar } from '../shop.type';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<Avatar> => {
  const { userId, avatar } = event.arguments;

  await docClient
    .update({
      TableName: process.env.DDB_TABLE_NAME,
      Key: {
        pk: `USER#${userId}`,
        sk: 'stockroom',
      },
      ExpressionAttributeValues: {
        ':0': 0,
        ':avatar': avatar,
      },
      ConditionExpression: `avatars.${avatar}.quantity > :0`,
      UpdateExpression: `SET currentAvatar = :avatar`,
    })
    .promise();

  return avatar;
};

export type Arguments = {
  userId: ID;
  avatar: Avatar;
};
