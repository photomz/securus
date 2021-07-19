import { AppSyncResolverEvent } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { ID, InputUser } from 'src/handlers/root.type';
import { docClient } from '@libs/setup';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<ID> => {
  const { user } = event.arguments;

  const bubbleId = uuid();

  await docClient
    .transactWrite({
      TransactItems: [
        {
          Update: {
            TableName: process.env.DDB_TABLE_NAME!,
            Key: {
              pk: `USER#${user.userId}`,
              sk: 'profile',
            },
            ExpressionAttributeValues: {
              ':newBubbleId': bubbleId,
            },
            ConditionExpression: 'attribute_exists(sk)',
            UpdateExpression: 'SET bubbleId = :newBubbleId',
          },
        },
        {
          Put: {
            TableName: process.env.DDB_TABLE_NAME!,
            ConditionExpression: 'attribute_not_exists(sk)',
            Item: {
              pk: `BUBBLE#${bubbleId}`,
              sk: 'null',
              group: [user],
              entanglementDate: new Date().toISOString(),
            },
          },
        },
      ],
    })
    .promise();

  return bubbleId;
};

export type Arguments = { user: InputUser };
