import React from 'react';
import { AlertDialog, Button, Center } from 'native-base';

/* prettier-ignore */
export default function Dialog({
  header, body, isOpen, onClose
}) {
  return (
    <Center>
      <AlertDialog isOpen={isOpen} onClose={onClose} motionPreset="fade">
        <AlertDialog.Content>
          <AlertDialog.Header fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialog.Header>
          <AlertDialog.Body>{body}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button onPress={onClose}>Dismiss</Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}
