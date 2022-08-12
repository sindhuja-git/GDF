import React, { FC, ReactNode } from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { appTheme } from './AppTheme';
import 'typeface-roboto';

import AppLayoutElevationProvider from './context/AppLayoutElevationProvider';

/**
 * TODO replace with HP MUI Theme
 */

interface AppLayoutProviderProps {
  children: ReactNode;
}

/**
 * App Layout will be tested with Group Layout as the group layout manipulates the AppLayout. This is the only functionality covered.
 */
const AppLayoutProvider: FC<AppLayoutProviderProps> = ({ children }) => (
  <ThemeProvider theme={appTheme}>
    <CssBaseline />
    <AppLayoutElevationProvider>{children}</AppLayoutElevationProvider>
  </ThemeProvider>
);

export default AppLayoutProvider;
