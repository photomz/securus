/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppSyncResolverEvent } from 'aws-lambda';
import { AWSURL, ID } from 'src/handlers/root.type';
import { docClient, rekognition, ses } from '@libs/setup';
import { Profile } from '../profile.type';

const OVERRIDE_EDGE_PREDICTION = true; // Last resort of DeepLens edge model doesn't work - use Rekognition PPE instead

const sendEmail = async (recipient, message, subject) => {
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
      Source: subject /* required */,
      ReplyToAddresses: [
        'markuszhang8@gmail.com',
        /* more items */
      ],
    })
    .promise();

  return response.MessageId;
};
// const message = `
// Dear Markus,

// Whoops! It seems you forgot to wear a mask recently.

// Don't worry, you won't face any fines - it's all completely understandable. You lost a few in-game, virtual points is all.

// If Securus made a mistake, please open the app and appeal to our helpful and dedicated community. We're always trying to make Securus better!

// Best wishes,
// The Securus Team
// `;

// sendEmail('markuszhang8@gmail.com', message);

const identifyFaces = async (s3Key) => {
  const analysis = await rekognition
    .searchFacesByImage({
      CollectionId: process.env.REKOGNITION_COLLECTION_ID!,
      FaceMatchThreshold: 95,
      Image: {
        S3Object: { Bucket: process.env.S3_LAKE_BUCKET_NAME!, Name: s3Key },
      },
    })
    .promise();

  const userIds = analysis.FaceMatches.map((match) =>
    match.Face.ExternalImageId.replace('.jpg', '')
  );

  return userIds;
};

// identifyFaces('public/deeplens/fakeMall1/201912_NewYears-4856-2.JPG').then(
//   console.log
// );

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
      analysis.Persons[personIdx].BodyParts.find(
        (bodyPart) => bodyPart.Name === 'FACE'
      ).EquipmentDetections[0].CoversBodyPart.Confidence
  );

  return { isMaskOff, lowConfidences };
};

// detectMask('public/deeplens/fakeMall1/WIN_20210725_21_00_21_Pro.jpg').then(
//   console.log
// );

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<Profile> => {
  const { imageKey } = event.arguments;

  if (OVERRIDE_EDGE_PREDICTION) {
    const { isMaskOff } = await detectMask(imageKey);
    console.log(`maskOff --> ${isMaskOff}`);
    if (isMaskOff) {
      const userIds = await identifyFaces(imageKey);
      console.log(`Sus KTV ppl --> ${userIds}`);
    }
  }

  return 200;
};

export type Arguments = { judgement: boolean; cameraId: ID; imageKey: ID };
