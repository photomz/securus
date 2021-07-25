import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { SafeAreaView, View, Text } from 'react-native';
import { getLeaderboardTop as GET_LEADERBOARD_TOP } from '../graphql/queries';
import { tailwind } from '../styles/tailwind';

export default function Leaderboard() {
  // eslint-disable-next-line no-unused-vars
  const { data, loading, error } = useQuery(gql(GET_LEADERBOARD_TOP));

  if (error) return <Text>Error: {error.message}</Text>;
  if (loading) return <Text>Loading....</Text>;

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <View style={tailwind('pt-12 items-center')}>
        <View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
          <Text style={tailwind('text-blue-800 font-semibold')}>
            Hello Tailwind
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
