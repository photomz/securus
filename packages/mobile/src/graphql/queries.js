/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBubble = /* GraphQL */ `
  query GetBubble($bubbleId: ID!) {
    getBubble(bubbleId: $bubbleId) {
      userId
      name
    }
  }
`;
export const listFriends = /* GraphQL */ `
  query ListFriends($userId: ID!) {
    listFriends(userId: $userId) {
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
export const getLeaderboardClosest = /* GraphQL */ `
  query GetLeaderboardClosest($userId: ID!, $nClosest: Int) {
    getLeaderboardClosest(userId: $userId, nClosest: $nClosest) {
      userId
      division
      rank
      coinTotal
      currentStreak
      name
    }
  }
`;
export const getLeaderboardTop = /* GraphQL */ `
  query GetLeaderboardTop($nTop: Int) {
    getLeaderboardTop(nTop: $nTop) {
      userId
      division
      rank
      coinTotal
      currentStreak
      name
    }
  }
`;
export const loadAppeals = /* GraphQL */ `
  query LoadAppeals($imageCount: Int) {
    loadAppeals(imageCount: $imageCount) {
      defendant {
        userId
        name
        imageUrl
        appealId
        appealTime
      }
      isTest
    }
  }
`;
export const ping = /* GraphQL */ `
  query Ping($ping: String!) {
    ping(ping: $ping) {
      pong
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($userId: ID!, $isMe: Boolean!) {
    getProfile(userId: $userId, isMe: $isMe) {
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
export const getCameras = /* GraphQL */ `
  query GetCameras {
    getCameras {
      cameraId
      name
      latitude
      longitude
      address
    }
  }
`;
export const getIncriminatingImage = /* GraphQL */ `
  query GetIncriminatingImage($userId: ID!) {
    getIncriminatingImage(userId: $userId) {
      captureTime
      imageUrl
      camera {
        cameraId
        name
        latitude
        longitude
        address
      }
    }
  }
`;
export const listArsenal = /* GraphQL */ `
  query ListArsenal($userId: ID!) {
    listArsenal(userId: $userId) {
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
  }
`;
