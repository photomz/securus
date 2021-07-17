import { ID } from '../root.type';

export type LeaderboardDivision =
  | 'JEFFBEZOS'
  | 'FORTUNE500'
  | 'TITANIUM'
  | 'PLATINUM'
  | 'GOLD'
  | 'SILVER'
  | 'BRONZE';

export type LeaderboardRow = {
  userId: ID;
  division: LeaderboardDivision;
  rank?: number;
  coinTotal: number;
  currentStreak: number;
};
