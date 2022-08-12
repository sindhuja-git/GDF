import React, { FC, ReactNode } from 'react';

import LaunchNavigationDrawerContextProvider from './context/LaunchNavigationDrawerContextProvider';
import LaunchSideSheetContextProvider from './context/LaunchSideSheetContextProvider';
import LaunchTitleContextProvider from './context/LaunchTitleContextProvider';

interface LaunchLayoutProviderProps {
  children: ReactNode;
}

const LaunchLayoutProvider: FC<LaunchLayoutProviderProps> = ({ children }) => (
  <LaunchNavigationDrawerContextProvider>
    <LaunchSideSheetContextProvider>
      <LaunchTitleContextProvider>{children}</LaunchTitleContextProvider>
    </LaunchSideSheetContextProvider>
  </LaunchNavigationDrawerContextProvider>
);

export default LaunchLayoutProvider;
