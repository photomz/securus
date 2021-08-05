import { gql } from '@apollo/client';

export const PING = gql`
  query PING($message: String!) {
    ping(message: $message) {
      message
    }
  }
`;
