import { AppSyncResolverEvent } from 'aws-lambda';
import { ID, InputUser } from 'src/handlers/root.type';
import { docClient } from '@libs/setup';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<ID> => {
  const { bubbleId, newcomer } = event.arguments;

  await docClient
    .transactWrite({
      TransactItems: [
        {
          Update: {
            TableName: process.env.DDB_TABLE_NAME!,
            Key: {
              pk: `USER#${newcomer.userId}`,
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
          Update: {
            TableName: process.env.DDB_TABLE_NAME!,
            ConditionExpression: 'attribute_exists(sk)',
            Key: {
              pk: `BUBBLE#${bubbleId}`,
              sk: 'null',
            },
            ExpressionAttributeNames: {
              '#group': 'group',
            },
            ExpressionAttributeValues: {
              ':newcomer': [newcomer],
            },
            UpdateExpression: 'SET #group = list_append(#group, :newcomer)',
          },
        },
      ],
    })
    .promise();

  return 200;
};

export type Arguments = { bubbleId: ID; newcomer: InputUser };
