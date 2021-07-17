import { format } from '@libs/jest';
// import { docClient } from '@libs/setup';
import { handler, Arguments, Pong } from './query';

describe('ping handler', () => {
  it('returns ping pong', async () => {
    const params = format<Arguments>({
      ping: 'ping',
    });
    const data: Pong = await handler(params);
    expect(data).toStrictEqual({
      pong: 'ping pong',
    });
  });
});
