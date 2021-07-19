import { AWSDateTime, ID, User } from '../root.type';

export type Streak = {
  max: number;
  current: number;
  isFrozen: boolean;
};

export interface Friend extends User {
  userId: ID;
  name: string;
  befriendDate: AWSDateTime;
  pairStreak: Streak;
}
