import React, { useState } from 'react';
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
// eslint-disable-next-line import/no-extraneous-dependencies
import Constants from 'expo-constants';
import {
  Box,
  Button,
  FormControl,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from 'native-base';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog from '../components/Dialog';

// function uploadToS3() {}

export default function SignUp() {
  const [image, setImage] = useState(null);
  const [operationCancelledDialog, setOperationCancelledDialog] =
    useState(false);
  const [missingPermissionsDialog, setMissingPermissionsDialog] =
    useState(false);

  async function takeSelfie() {
    if (Constants.platform.ios) {
      const cameraStatus = await requestCameraPermissionsAsync();
      const cameraRollStatus = await requestMediaLibraryPermissionsAsync();

      if (!cameraStatus.granted || !cameraRollStatus.granted) {
        setMissingPermissionsDialog(true);
      }
    }

    const { cancelled, uri } = await launchCameraAsync({
      allowsEditing: true,
      exif: false,
    });

    if (cancelled) {
      setOperationCancelledDialog(true);
    }

    setImage(uri);
  }

  return (
    <Box flex={1} p={2} w="90%" mx="auto" justifyContent="center">
      <Heading size="lg" color="primary.500">
        Welcome
      </Heading>
      <Heading color="muted.400" size="xs">
        Sign up to continue!
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
        <FormControl>
          <FormControl.Label
            _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
          >
            Username
          </FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
          >
            Password
          </FormControl.Label>
          <Input type="password" />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
          >
            Confirm Password
          </FormControl.Label>
          <Input type="password" />
        </FormControl>
        {image ? (
          <>
            <Text mb={2} color="muted.700" fontSize="sm" fontWeight="600">
              Photo to submit
            </Text>
            <Image
              mb={3}
              source={{
                uri: image,
              }}
              alt="Picture to submit"
              size="xl"
            />
          </>
        ) : (
          <Button
            w="50%"
            mb={3}
            startIcon={
              <Icon
                as={
                  <MaterialCommunityIcons
                    name="face-recognition"
                    color="white"
                  />
                }
                size={5}
              />
            }
            onPress={takeSelfie}
            colorScheme="cyan"
            _text={{ color: 'white' }}
          >
            Take Selfie
          </Button>
        )}
        <Button colorScheme="cyan" _text={{ color: 'white' }}>
          Sign Up
        </Button>
      </VStack>
      <Dialog
        header="Operation Cancelled"
        body="Please take a selfie to continue with the sign up process."
        isOpen={operationCancelledDialog}
        onClose={() => setOperationCancelledDialog(false)}
      />
      <Dialog
        header="Missing Permissions"
        body="Please allow the app to have access to camera permissions."
        isOpen={missingPermissionsDialog}
        onClose={() => setMissingPermissionsDialog(false)}
      />
    </Box>
  );
}
