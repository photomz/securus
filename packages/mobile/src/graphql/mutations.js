/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBubble = /* GraphQL */ `
  mutation CreateBubble($user: InputUser!) {
    createBubble(user: $user)
  }
`;
export const entangleBubble = /* GraphQL */ `
  mutation EntangleBubble($bubbleId: ID!, $newcomer: InputUser!) {
    entangleBubble(bubbleId: $bubbleId, newcomer: $newcomer)
  }
`;
export const untangleBubble = /* GraphQL */ `
  mutation UntangleBubble($userId: ID!) {
    untangleBubble(userId: $userId)
  }
`;
export const makeFriend = /* GraphQL */ `
  mutation MakeFriend($initiator: InputUser!, $newFriend: InputUser!) {
    makeFriend(initiator: $initiator, newFriend: $newFriend) {
      userId
      name
      befriendDate
      pairStreak {
        max
        current
        isFrozen
      }
    }
  }
`;
export const crowdsourceLabelImage = /* GraphQL */ `
  mutation CrowdsourceLabelImage(
    $jurorUserId: ID!
    $labels: [LabelledImage!]!
  ) {
    crowdsourceLabelImage(jurorUserId: $jurorUserId, labels: $labels) {
      pass
      coinsEarned
      coinTotal
    }
  }
`;
export const submitAppeal = /* GraphQL */ `
  mutation SubmitAppeal($user: InputUser!, $imageUrl: AWSURL!) {
    submitAppeal(user: $user, imageUrl: $imageUrl)
  }
`;
export const createProfile = /* GraphQL */ `
  mutation CreateProfile($name: String!, $faceIdUrl: AWSURL!) {
    createProfile(name: $name, faceIdUrl: $faceIdUrl) {
      name
      userId
      leaderboard {
        userId
        division
        rank
        coinTotal
        currentStreak
        name
      }
      bubbleId
      friends {
        userId
        name
        befriendDate
        pairStreak {
          max
          current
          isFrozen
        }
      }
      arsenal {
        powerups {
          name
          quantity
          price
        }
        avatars {
          name
          quantity
          price
        }
        coinTotal
        currentAvatar
        currentPowerup {
          name
          expiresAt
        }
        purchaseSuccess
      }
      faceIdUrl
    }
  }
`;
export const earnCoins = /* GraphQL */ `
  mutation EarnCoins($userId: ID!, $nearCameraId: ID!) {
    earnCoins(userId: $userId, nearCameraId: $nearCameraId) {
      coinsEarned
      coinTotal
      currentStreak
    }
  }
`;
export const identifyCitizen = /* GraphQL */ `
  mutation IdentifyCitizen(
    $imageUrl: AWSURL!
    $cameraId: ID!
    $judgement: Boolean!
  ) {
    identifyCitizen(
      imageUrl: $imageUrl
      cameraId: $cameraId
      judgement: $judgement
    )
  }
`;
export const activatePowerup = /* GraphQL */ `
  mutation ActivatePowerup($userId: ID!, $powerup: Powerup!) {
    activatePowerup(userId: $userId, powerup: $powerup) {
      name
      expiresAt
    }
  }
`;
export const buy = /* GraphQL */ `
  mutation Buy($userId: ID!, $price: Int!, $avatar: Avatar, $powerup: Powerup) {
    buy(userId: $userId, price: $price, avatar: $avatar, powerup: $powerup)
  }
`;
export const selectAvatar = /* GraphQL */ `
  mutation SelectAvatar($userId: ID!, $avatar: Avatar!) {
    selectAvatar(userId: $userId, avatar: $avatar)
  }
`;
