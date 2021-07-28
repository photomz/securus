import React from 'react';
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  function navigateToSignUp() {
    navigation.navigate('Sign Up');
  }

  return (
    <Box flex={1} p={2} w="90%" mx="auto" justifyContent="center">
      <Heading size="lg" color="primary.500">
        Welcome Back
      </Heading>
      <Heading color="muted.400" size="xs">
        Sign in to continue!
      </Heading>

      <VStack space={2} mt={5}>
        <FormControl>
          <FormControl.Label
            _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
          >
            Email
          </FormControl.Label>
          <Input />
        </FormControl>
        <FormControl mb={5}>
          <FormControl.Label
            _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
          >
            Password
          </FormControl.Label>
          <Input type="password" />
        </FormControl>
        <Button colorScheme="cyan" _text={{ color: 'white' }}>
          Login
        </Button>
        <HStack justifyContent="center">
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            I&apos;m a new user.{' '}
          </Text>
          <Link
            _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }}
            onPress={navigateToSignUp}
          >
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
