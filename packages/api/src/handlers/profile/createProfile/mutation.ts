import { AppSyncResolverEvent } from 'aws-lambda';
import { AWSURL, ID } from 'src/handlers/root.type';
import { docClient, rekognition } from '@libs/setup';
import { LeaderboardDivision } from 'src/handlers/leaderboard/leaderboard.type';
import { Avatar, avatars, powerups } from 'src/handlers/shop/shop.type';
import { Profile } from '../profile.type';

const addFace = async (username: string, s3Key?: string): string => {
  const analysis = await rekognition
    .indexFaces({
      CollectionId: process.env.REKOGNITION_COLLECTION_ID!,
      ExternalImageId: `${username}.jpg`,
      Image: {
        S3Object: {
          Bucket: process.env.S3_LAKE_BUCKET_NAME!,
          Name: s3Key ?? `public/faceIds/${username}.jpg`,
        },
      },
      MaxFaces: 1,
    })
    .promise();

  const faceId = analysis.FaceRecords[0].Face.FaceId;

  return faceId;
};

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<Profile> => {
  const { userId, name, faceIdUrl } = event.arguments;

  const faceId = await addFace(userId, faceIdUrl);

  const newProfile = {
    name,
    userId,
    leaderboard: {
      coinTotal: 0,
      division: 'BRONZE' as LeaderboardDivision,
      currentStreak: 0,
      userId,
      name,
    },
    bubbleId: '',
    friends: [],
    arsenal: {
      powerups: powerups.reduce(
        (map, { name: powerupName, price }) => ({
          ...map,
          [powerupName]: { price, quantity: 0 },
        }),
        {}
      ),
      avatars: avatars.reduce(
        (map, { name: avatarName, price }) => ({
          ...map,
          [avatarName]: {
            price,
            quantity: +(avatarName === 'AZURE_ENGINEER'),
          },
        }),
        {}
      ),
      currentAvatar: 'AZURE_ENGINEER' as Avatar,
      currentPowerup: {},
      coinTotal: 0,
    },
    faceId,
  } as Profile;

  await docClient
    .transactWrite({
      TransactItems: [
        {
          Put: {
            TableName: process.env.DDB_TABLE_NAME!,
            ConditionExpression: 'attribute_not_exists(sk)',
            Item: {
              pk: `USER#${userId}`,
              sk: 'profile',
              name,
              bubbleId: '',
              pairIds: [],
              appealIds: [],
              faceId,
            },
          },
        },
        {
          Put: {
            TableName: process.env.DDB_TABLE_NAME!,
            ConditionExpression: 'attribute_not_exists(sk)',
            Item: {
              pk: `USER#${userId}`,
              sk: 'leaderboard',
              ...newProfile.leaderboard,
            },
          },
        },
        {
          Put: {
            TableName: process.env.DDB_TABLE_NAME!,
            ConditionExpression: 'attribute_not_exists(sk)',
            Item: {
              pk: `USER#${userId}`,
              sk: 'stockroom',
              ...newProfile.arsenal,
            },
          },
        },
      ],
    })
    .promise();

  return newProfile;
};

export type Arguments = { userId: ID; name: string; faceIdUrl?: AWSURL };
