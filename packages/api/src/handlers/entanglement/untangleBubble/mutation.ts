import { AppSyncResolverEvent } from 'aws-lambda';
import { AnyUser, ID } from 'src/handlers/root.type';
import { docClient } from '@libs/setup';

// NOTE: Only untangles user's bubbleId, does not delete user from group.
// User will still appear but absence can be verified (if necessary) by getProfile
export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<AnyUser[]> => {
  const { userId } = event.arguments;

  await docClient
    .update({
      TableName: process.env.DDB_TABLE_NAME!,
      Key: {
        pk: `USER#${userId}`,
        sk: 'profile',
      },
      ExpressionAttributeValues: {
        ':empty': '',
      },
      UpdateExpression: 'SET bubbleId = :empty',
    })
    .promise();

  return 200;
};

export type Arguments = { userId: ID };
