import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Tabs, Badge } from '@material-ui/core';
import MaterialTab, { TabProps } from '@material-ui/core/Tab';

import CommentIcon from '@material-ui/icons/Comment';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { selectGroupNumber } from 'app/Ducks/GroupInfo/selectors';
import { selectedAttachments } from 'app/Ducks/Attachments/selectors';
import { getGroupAttachments } from 'app/Ducks/Attachments/actions';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';

import useLaunchSideSheet, {
  SideSheetTab,
  unset,
  set,
} from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchSideSheet';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useTabStyles = makeStyles((theme: Theme) => {
  const tabWidth = theme.spacing(8);

  return createStyles({
    root: {
      width: tabWidth,
      height: theme.spacing(7),
      minWidth: tabWidth,
    },
    wrapper: {
      width: tabWidth,
    },
  });
});
const Tab: FC<TabProps> = (props) => {
  const classes = useTabStyles();
  const { sideSheet, dispatch } = useLaunchSideSheet();

  const handleClick = () => {
    if (sideSheet === props.value) {
      unset(dispatch);
    } else {
      set(dispatch, props.value);
    }
  };

  return (
    <MaterialTab
      onClick={handleClick}
      classes={{ root: classes.root, wrapper: classes.wrapper }}
      {...props}
    />
  );
};

const a11yProps = (index: any) => {
  return {
    id: `group-tab-${index}`,
    'aria-controls': `group-tabpanel-${index}`,
  };
};

const useLaunchSideTabStyles = makeStyles(() =>
  createStyles({
    icon: {
      fontSize: '1.5rem',
    },
  })
);

interface LaunchSideTabsProps {
  className?: string;
}

const LaunchSideTabs: FC<LaunchSideTabsProps> = ({ className }) => {
  const dispatch = useDispatch();
  const { launchId } = useLaunchFormattedParams();
  const groupNumber = useSelector(selectGroupNumber);
  useEffect(() => {
    if (groupNumber) {
      dispatch(getGroupAttachments(groupNumber, launchId));
    }
  }, [groupNumber, launchId, dispatch]);

  const classes = useLaunchSideTabStyles();

  const { sideSheet } = useLaunchSideSheet();
  const groupAttachments = useSelector(selectedAttachments);
  const groupAttachmentCount = groupAttachments?.length || 0;
  return (
    <div>
      <Paper square className={className}>
        <Tabs
          orientation="vertical"
          value={sideSheet ?? false}
          aria-label="Vertical tabs example"
        >
          <Tab
            value={SideSheetTab.Attachments}
            icon={
              <Badge badgeContent={groupAttachmentCount} color="error">
                <AttachFileIcon className={classes.icon} />
              </Badge>
            }
            aria-label="Attachments"
            {...a11yProps(SideSheetTab.Attachments)}
          />
          <Tab
            value={SideSheetTab.Comments}
            icon={<CommentIcon className={classes.icon} />}
            aria-label="Comments"
            {...a11yProps(SideSheetTab.Comments)}
          />
        </Tabs>
      </Paper>
    </div>
  );
};

export default LaunchSideTabs;
