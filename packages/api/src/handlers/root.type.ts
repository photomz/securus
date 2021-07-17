export type AWSDate = string;
export type AWSTime = string;
export type AWSDateTime = string;
export type AWSTimestamp = string;
export type AWSEmail = string;
// eslint-disable-next-line @typescript-eslint/ban-types
export type AWSJSON = Object;
export type AWSURL = string;
export type AWSPhone = string;
export type AWSIPAddress = string;
export type ID = string;
export type NullableString = string | null;
export type NullableNumber = number | null;
export type NullableBoolean = boolean | null;

export interface User {
  userId: ID;
  name: string;
}

export interface AnyUser extends User {
  userId: ID;
  name: string;
}

export type InputUser = {
  userId: string;
  name: string;
};
