import { Alert, AlertColor, Snackbar } from '@mui/material';
import * as React from 'react';
import { createContext, useContext, useState } from 'react';

interface ISnackbarContent {
  severity: AlertColor;
  message: string;
}

interface ISnackbarContext {
  setSnackbarOpen: (open: boolean) => void;
  setSnackbarContent: (data: ISnackbarContent) => void;
}

const snackbarContext = createContext<ISnackbarContext>({
  setSnackbarOpen: () => {
    throw new Error('Too soon');
  },
  setSnackbarContent: () => {
    throw new Error('Too soon');
  },
});

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sbOpen, setSBOpen] = useState(false);
  const [sbContent, setSBContent] = useState<ISnackbarContent>();

  return (
    <snackbarContext.Provider
      value={{
        setSnackbarOpen: (open: boolean) => {
          setSBOpen(open);
        },
        setSnackbarContent: (content) => {
          setSBContent(content);
        },
      }}
    >
      {children}
      <Snackbar
        open={sbOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setSBOpen(false)}
      >
        <Alert severity={sbContent?.severity} sx={{ width: '100%' }}>
          {sbContent?.message}
        </Alert>
      </Snackbar>
    </snackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(snackbarContext);
