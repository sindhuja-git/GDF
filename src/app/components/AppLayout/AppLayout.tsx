import React, { FC, ReactNode } from 'react';

import AppBar from '@material-ui/core/AppBar';

import useAppLayoutElevationContext from 'app/shared/useAppLayoutElevationContext';
import Env from 'utils/env';
import PortalHeader from '../PortalHeader/index';

type AppLayoutProps = {
  children: ReactNode;
};
/**
 * App Layout will be tested with Group Layout as the group layout manipulates the AppLayout. This is the only functionality covered.
 */
const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { elevation } = useAppLayoutElevationContext();
  const envName = Env.getEnvName();
  return (
    <>
      <AppBar component="div" elevation={elevation} position="static">
        <PortalHeader
          appName="GDF Viewer"
          environment={envName}
          version="1.0.0"
        />
      </AppBar>
      {children}
    </>
  );
};

export default AppLayout;
