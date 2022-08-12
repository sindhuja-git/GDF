import React, { FC } from 'react';
import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';

import { SIDE_SHEET_WIDTH_MULTIPLIER } from 'app/Authenticated/screens/Group/screens/Launch/shared/constants';
import useLaunchNavigationDrawer from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchNavigationDrawer';
import useLaunchSideSheet from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchSideSheet';
import { padToFour } from 'utils/padZero';

const useGroupNavBarStyles = makeStyles((theme: Theme) => {
  const sideSheetWidth = theme.spacing(SIDE_SHEET_WIDTH_MULTIPLIER);

  return createStyles({
    appBar: {
      position: 'relative',
      zIndex: theme.zIndex.drawer + 1,
      borderBottom: `1px solid ${theme.palette.divider}`,
      toolbar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    },
    appBarShift: {
      width: `calc(100% - ${sideSheetWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: sideSheetWidth,
    },
    menuIcon: {
      fontSize: '1.5rem',
    },
    headerWrapper: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    header: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  });
});

type LaunchedGroup = {
  number: number;
  name: string;
};

interface GroupNavBarProps {
  loading: boolean;
  error?: any;
  launchedGroup?: LaunchedGroup;
}

const GroupNavBar: FC<GroupNavBarProps> = ({
  loading,
  error,
  launchedGroup,
}) => {
  const classes = useGroupNavBarStyles();

  const { toggleOpen } = useLaunchNavigationDrawer();
  const { open: openSideSheet } = useLaunchSideSheet();

  return (
    <AppBar
      elevation={0}
      color="secondary"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: openSideSheet,
      })}
    >
      <Toolbar>
        <Grid container alignItems="center" wrap="nowrap">
          <Grid item>
            <IconButton
              aria-label="Open Group Launch Menu"
              color="inherit"
              edge="start"
              onClick={toggleOpen}
            >
              <MenuIcon className={classes.menuIcon}>
                <title>Open Group Launch Menu</title>
              </MenuIcon>
            </IconButton>
          </Grid>
          <Grid className={classes.headerWrapper}>
            {loading && <CircularProgress color="inherit" />}
            {!loading && !error && (
              <Typography variant="h1" className={classes.header}>{`${padToFour(
                launchedGroup?.number
              )} ${launchedGroup?.name}`}</Typography>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default GroupNavBar;
