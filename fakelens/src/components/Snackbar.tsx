import React, { useRef } from 'react';
import styled from 'styled-components';
import { SnackbarProvider as NotiSnackbarProvider } from 'notistack';

import { Close } from '@material-ui/icons';
import { MacCloseIcon } from '../icons';

const SnackStyles = styled.div`
  .snackbarContainer {
    margin-bottom: 96px !important;
  }
  .snackbar {
    min-width: 100px;
    max-width: 400px;
  }
  .snackbar > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
  }
  .snackbar > div > div#notistack-snackbar {
    flex-shrink: 1;
  }
  .snackbar > div > div:nth-last-child(1) {
    margin-left: 0;
    padding-left: 0;
  }
  .success {
    /*  Must use !important to override other !important styles. */
    background-color: ${({ theme }) => theme.palette.success.main} !important;
  }
  .error {
    background-color: ${({ theme }) => theme.palette.error.main} !important;
  }
  .warning {
    background-color: ${({ theme }) => theme.palette.warning.main} !important;
  }
  .info {
    background-color: ${({ theme }) => theme.palette.primary.main} !important;
  }
`;

type Props = {
  children?: React.ReactChild;
};
const defaultProps: Props = {
  children: <></>,
};
const SnackbarProvider = ({ children }: Props) => {
  const notistackRef = useRef<NotiSnackbarProvider | null>(null);
  const dismiss = (key) => {
    notistackRef.current?.closeSnackbar(key);
  };

  return (
    <SnackStyles>
      <NotiSnackbarProvider
        ref={notistackRef}
        maxSnack={5}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        disableWindowBlurListener
        autoHideDuration={8000}
        classes={{
          containerRoot: 'snackbarContainer',
          root: 'snackbar',
          variantError: 'error',
          variantSuccess: 'success',
          variantWarning: 'warning',
          variantInfo: 'info',
        }}
        action={(key) => <MacCloseIcon onClick={() => dismiss(key)} />}
      >
        {children}
      </NotiSnackbarProvider>
    </SnackStyles>
  );
};
SnackbarProvider.defaultProps = defaultProps;

export default SnackbarProvider;
