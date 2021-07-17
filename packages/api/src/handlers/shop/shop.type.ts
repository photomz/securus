import { AWSDateTime } from '../root.type';

export const avatars = [
  { name: 'AZURE_ENGINEER', price: 0 },
  { name: 'YOUTUBER', price: 500 },
  { name: 'SAFE_DISTANCING_AMBASSADOR', price: 2000 },
  { name: 'ARTIST', price: 10000 },
  { name: 'AWS_ENGINEER', price: 100000 },
] as const;
export type Avatar = typeof avatars[number]['name'];

export const powerups = [
  { name: 'FREEZE', price: 5000 },
  { name: 'X2COIN', price: 100 },
  { name: 'X3COIN', price: 1000 },
] as const;
export type Powerup = typeof powerups[number]['name'];

export interface StockItem {
  quantity: number;
  price: number;
}

export interface AvatarItem extends StockItem {
  name: Avatar;
  quantity: number;
  price: number;
}

export interface PowerupItem extends StockItem {
  name: Powerup;
  quantity: number;
  price: number;
}

export type ActivatedPowerup = {
  name: Powerup;
  expiresAt: AWSDateTime;
};

export type StockRoom = {
  powerups?: PowerupItem[];
  avatars: AvatarItem[];
  coinTotal: number;
  currentAvatar: Avatar;
  currentPowerup?: ActivatedPowerup;
  purchaseSuccess?: boolean;
};
