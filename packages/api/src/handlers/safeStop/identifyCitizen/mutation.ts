/* eslint-disable no-console */
import { AppSyncResolverEvent } from 'aws-lambda';
import { ID } from 'src/handlers/root.type';
import { docClient, rekognition, ses } from '@libs/setup';

const OVERRIDE_EDGE_PREDICTION = true; // Last resort of DeepLens edge model doesn't work - use Rekognition PPE instead

const sendEmail = async (recipient, name) => {
  const message = `
    Dear ${name},

    Whoops! It seems you forgot to wear a mask recently.

    Don't worry, you won't face any fines - it's all completely understandable. You lost a few in-game, virtual points is all.

    If Securus made a mistake, please open the app and appeal to our helpful and dedicated community. We're always trying to make Securus better!

    Best wishes,
    The Securus Team
  `;
  const response = await ses
    .sendEmail({
      Destination: {
        /* required */
        // CcAddresses: [
        //   'EMAIL_ADDRESS',
        //   /* more items */
        // ],
        ToAddresses: [
          recipient,
          /* more items */
        ],
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Charset: 'UTF-8',
            Data: `<div><p>${message.replace(
              /(?:\r\n|\r|\n)/g,
              '<br>'
            )}</p></div>`,
          },
          Text: {
            Charset: 'UTF-8',
            Data: message,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'A Gentle Reminder 😊',
        },
      },
      Source: 'markuszhang8@gmail.com' /* required */,
      ReplyToAddresses: [
        'markuszhang8@gmail.com',
        /* more items */
      ],
    })
    .promise();

  return response.MessageId;
};

const getAddressor = async (userIds) => {
  const response = await docClient
    .transactGet({
      TransactItems: userIds.map((userId) => ({
        Get: {
          TableName: 'securus-dynamodb-dev-0.1.0',
          Key: {
            pk: `USER#${userId}`,
            sk: 'profile',
          },
          ExpressionAttributeNames: {
            '#name': 'name',
          },
          ProjectionExpression: '#name, email',
        },
      })),
    })
    .promise();

  return response.Responses.map((item) => ({
    name: item.Item.name,
    email: item.Item.email,
  }));
};

const deductGamePoints = async (userIds) => {
  const response = await docClient
    .transactWrite({
      TransactItems: userIds.map((userId) => ({
        Update: {
          TableName: process.env.DDB_TABLE_NAME!,
          Key: {
            pk: `USER#${userId}`,
            sk: 'leaderboard',
          },
          ExpressionAttributeValues: {
            ':0': 0,
          },
          UpdateExpression: 'SET currentStreak = :0',
        },
      })),
    })
    .promise();
  return response;
};

const identifyFaces = async (s3Key) => {
  const analysis = await rekognition
    .searchFacesByImage({
      CollectionId: process.env.REKOGNITION_COLLECTION_ID!,
      FaceMatchThreshold: 95,
      Image: {
        S3Object: { Bucket: process.env.S3_LAKE_BUCKET_NAME!, Name: s3Key },
      },
      MaxFaces: 10, // Transact write limit
    })
    .promise();

  const userIds = analysis.FaceMatches.map((match) =>
    match.Face.ExternalImageId.replace('.jpg', '')
  );

  return userIds;
};

const detectMask = async (s3Key) => {
  const analysis = await rekognition
    .detectProtectiveEquipment({
      Image: {
        S3Object: { Bucket: process.env.S3_LAKE_BUCKET_NAME!, Name: s3Key },
      },
      SummarizationAttributes: {
        MinConfidence: 80,
        RequiredEquipmentTypes: ['FACE_COVER'],
      },
    })
    .promise();

  const isMaskOff = analysis.Summary.PersonsWithoutRequiredEquipment.length > 0;
  const lowConfidences = analysis.Summary.PersonsIndeterminate.map(
    (personIdx) =>
      analysis.Persons[personIdx].BodyParts?.find(
        (bodyPart) => bodyPart.Name === 'FACE'
      )?.EquipmentDetections?.[0]?.CoversBodyPart?.Confidence ?? undefined
  ).filter((conf) => conf !== undefined);

  return { isMaskOff, lowConfidences };
};

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<number> => {
  const { imageKey } = event.arguments;

  if (OVERRIDE_EDGE_PREDICTION) {
    const { isMaskOff } = await detectMask(imageKey);
    console.log(`maskOff --> ${isMaskOff}`);
    if (isMaskOff) {
      const userIds = await identifyFaces(imageKey);
      console.log(`Sus KTV ppl --> ${userIds}`);
      if (userIds.length > 0) {
        // Only penalise users not random citizens
        await deductGamePoints(userIds);
        const addressors = await getAddressor(userIds);
        await Promise.all(
          addressors.map(({ name, email }) => sendEmail(email, name))
        );
      }
    }
  }

  return 200;
};

export type Arguments = { judgement: boolean; cameraId: ID; imageKey: ID };
