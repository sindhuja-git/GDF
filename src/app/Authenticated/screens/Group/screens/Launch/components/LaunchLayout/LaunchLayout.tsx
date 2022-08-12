import React, { FC, ReactNode, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Paper } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { selectedGdfDocument } from 'app/Ducks/Attachments/selectors';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import useAppLayoutElevationContext, {
  resetElevation,
  flatten,
} from 'app/shared/useAppLayoutElevationContext';
import useLaunchNavigationDrawer from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchNavigationDrawer';
import useLaunchSideSheet from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchSideSheet';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import {
  DRAWER_WIDTH_MULTIPLIER,
  SIDE_SHEET_WIDTH_MULTIPLIER,
} from 'app/Authenticated/screens/Group/screens/Launch/shared/constants';
import { getGroupNumber } from 'app/Ducks/GroupInfo/actions';

import HTMLTitleHelmet from './components/HTMLTitleHelmet';
import GroupNavBar from './components/GroupNavBar';
import LaunchNavigationDrawer from './components/LaunchNavigationDrawer';
import LaunchSideTabs from './components/LaunchSideTabs';
import { LaunchSideSheet } from './components/LaunchSideSheet';
import { LaunchHeader } from './components/LaunchHeader';

const GET_LAUNCH_GROUP_HEADER_INFO = gql`
  query GetHeaderInfo($groupId: String!, $launchId: Int!) {
    launchedGroup(groupId: $groupId, launchId: $launchId) {
      id
      launchId
      name
      number
    }
  }
`;

export type LaunchedGroupHeaderInfoQuery = {
  launchedGroup: {
    id: string;
    launchId: number;
    name: string;
    number: number;
  };
};

interface LaunchLayoutProps {
  children: ReactNode;
}

const useLaunchLayoutStyles = makeStyles((theme: Theme) => {
  const drawerWidth = theme.spacing(DRAWER_WIDTH_MULTIPLIER);
  const sideSheetWidth = theme.spacing(SIDE_SHEET_WIDTH_MULTIPLIER);
  const tabWidth = theme.spacing(8);
  return createStyles({
    // We are using CSS Grid here as opposed to the material grid as this is a complex layout where the power of CSS grid solves scalability.
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: `1fr ${theme.spacing(8)}px`,
      gridTemplateRows: `auto 1fr`,
      gridTemplateAreas: `
        "header sideTabs"
        "content sideTabs"
      `,
      height: `calc(100vh - ${theme.spacing(12)}px)`,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    content: {
      gridArea: 'content',
      overflowY: 'auto',
    },
    contentShiftLeft: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
    contentShiftRight: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: sideSheetWidth,
    },
    sideTabs: {
      gridArea: 'sideTabs',
    },
    header: {
      gridArea: 'header',
    },
    tabStyles: {
      width: '24px',
      height: theme.spacing(7),
      minWidth: tabWidth,
      paddingTop: '22px',
      textAlign: 'center',
    },
    color: {
      color: '#3e4451',
      opacity: '0.7',
    },
    wrapper: {
      width: tabWidth,
    },
  });
});

const LaunchLayout: FC<LaunchLayoutProps> = ({ children }) => {
  const classes = useLaunchLayoutStyles();
  const dispatch = useDispatch();
  const gdfDocument = useSelector(selectedGdfDocument);
  const gdfUrl = gdfDocument ? gdfDocument[0]?.downloadUrl : null;
  const handleChange = () => {
    const mylink = document.getElementById('gdfDocument');
    mylink?.click();
  };
  const { groupId, launchId } = useLaunchFormattedParams();

  const { dispatch: elevationDispatch } = useAppLayoutElevationContext();
  const { open: openNavigationDrawer } = useLaunchNavigationDrawer();
  const { open: openSideSheet } = useLaunchSideSheet();

  const { loading, error, data } = useQuery<LaunchedGroupHeaderInfoQuery>(
    GET_LAUNCH_GROUP_HEADER_INFO,
    {
      variables: { groupId, launchId },
    }
  );
  const groupNumber = data?.launchedGroup?.number;

  // Flatten out top bar elevation as we are going to append a further navbar.
  useEffect(() => {
    dispatch(getGroupNumber(groupNumber));
    flatten(elevationDispatch);

    // We want to reset elevation when we leave the Launch layout
    return () => {
      resetElevation(elevationDispatch);
    };
  }, [elevationDispatch, dispatch, groupNumber]);

  useEffect(() => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.data.message === 'Demographics') {
          window.location.href = `/groups/${groupId}/launches/${launchId}`;
        }
        if (event.data.message === 'Sites') {
          window.location.href = `/groups/${groupId}/launches/${launchId}/sites`;
        }
        if (event.data.message === 'Contacts') {
          window.location.href = `/groups/${groupId}/launches/${launchId}/contacts`;
        }
        if (event.data.message === 'GSP') {
          window.location.href = `/groups/${groupId}/launches/${launchId}/gsp`;
        }
      },
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HTMLTitleHelmet groupNumber={data?.launchedGroup.number} />
      <GroupNavBar
        loading={loading}
        error={error}
        launchedGroup={data?.launchedGroup}
      />
      <LaunchNavigationDrawer />
      <div
        className={clsx(classes.contentGrid, {
          [classes.contentShiftLeft]: openNavigationDrawer,
          [classes.contentShiftRight]: openSideSheet,
        })}
      >
        <LaunchHeader className={classes.header} />
        <main id="content" className={clsx(classes.content)}>
          {children}
        </main>
        <Paper square>
          <Tabs orientation="vertical" onChange={handleChange}>
            <div className={classes.tabStyles}>
              <a id="gdfDocument" href={gdfUrl} className={classes.color}>
                <DescriptionIcon />
              </a>
            </div>
          </Tabs>
        </Paper>
        <LaunchSideTabs className={classes.sideTabs} />
      </div>
      <LaunchSideSheet />
    </>
  );
};

export default LaunchLayout;
