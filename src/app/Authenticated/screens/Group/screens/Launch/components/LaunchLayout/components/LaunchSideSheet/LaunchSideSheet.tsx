import React, { FC } from 'react';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { SIDE_SHEET_WIDTH_MULTIPLIER } from 'app/Authenticated/screens/Group/screens/Launch/shared/constants';
import useLaunchSideSheet from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchSideSheet';
import {
  CommentsTabPanel,
  AttachmentsTabPanel,
  FilesTabPanel,
} from './components';

const useLaunchSideSheetStyles = makeStyles((theme: Theme) => {
  const sideSheetWidth = theme.spacing(SIDE_SHEET_WIDTH_MULTIPLIER);

  return createStyles({
    drawer: {
      width: sideSheetWidth,
    },
    drawerPaper: {
      width: sideSheetWidth,
      marginTop: theme.spacing(6),
    },
  });
});

const LaunchSideSheet: FC<{}> = () => {
  const classes = useLaunchSideSheetStyles();
  const { open } = useLaunchSideSheet();

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <FilesTabPanel />
      <AttachmentsTabPanel />
      <CommentsTabPanel />
    </Drawer>
  );
};

export default LaunchSideSheet;
