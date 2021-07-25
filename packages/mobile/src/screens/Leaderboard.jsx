import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Text } from 'native-base';
import { getLeaderboardTop as GET_LEADERBOARD_TOP } from '../graphql/queries';

export default function Leaderboard() {
  const { data, loading, error } = useQuery(gql(GET_LEADERBOARD_TOP));

  if (error) return <Text>Error: {error.message}</Text>;
  if (loading) return <Text>Loading....</Text>;
  console.log(data);
  return <Text>Leaderboard</Text>;
}
