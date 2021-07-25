import { AWSURL, ID, User } from 'src/handlers/root.type';
import { Friend } from '../friends/friends.type';
import { LeaderboardRow } from '../leaderboard/leaderboard.type';
import { StockRoom } from '../shop/shop.type';

export interface Profile extends User {
  name: string;
  userId: ID;
  leaderboard: LeaderboardRow;
  bubbleId?: ID;
  friends: Friend[];
  arsenal: StockRoom;
  faceId?: ID;
}
