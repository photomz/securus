import { AppSyncResolverEvent } from 'aws-lambda';
import { AnyUser, ID } from 'src/handlers/root.type';
import { docClient } from '@libs/setup';

// NOTE: You can add yourself twice into a group. This is a bug but is not fixed.
export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<AnyUser[]> => {
  const { bubbleId } = event.arguments;

  const data = (
    await docClient
      .get({
        TableName: process.env.DDB_TABLE_NAME!,
        Key: {
          pk: `BUBBLE#${bubbleId}`,
          sk: 'null',
        },
        ExpressionAttributeNames: {
          '#group': 'group',
        },
        ProjectionExpression: '#group',
      })
      .promise()
  ).Item;

  return data.group;
};

export type Arguments = { bubbleId: ID };
