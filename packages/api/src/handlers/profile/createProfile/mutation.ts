import { AppSyncResolverEvent } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { AWSURL } from 'src/handlers/root.type';
import { docClient } from '@libs/setup';
import { LeaderboardDivision } from 'src/handlers/leaderboard/leaderboard.type';
import { Avatar, avatars, powerups } from 'src/handlers/shop/shop.type';
import { Profile } from '../profile.type';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<Profile> => {
  const { name, faceIdUrl } = event.arguments;

  const userId = uuid();
  const newProfile = {
    name,
    userId,
    leaderboard: {
      coinTotal: 0,
      division: 'BRONZE' as LeaderboardDivision,
      currentStreak: 0,
      userId,
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
    faceIdUrl,
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
              faceIdUrl,
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
              name,
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

export type Arguments = { name: string; faceIdUrl: AWSURL };