import { gql } from '@apollo/client';

export const CLUSTER = gql`
  mutation CLUSTER($id: ID!, $token: String!) {
    cluster(token: $token, id: $id) {
      message
    }
  }
`;
