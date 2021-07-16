import { AppSyncResolverEvent } from 'aws-lambda';

export const handler = async (
  event: AppSyncResolverEvent<Arguments>
): Promise<Pong> => {
  const { ping } = event.arguments;

  return {
    pong: `${ping} pong`,
  };
};

export type Pong = {
  pong: string;
};

export type Arguments = { ping: string };
