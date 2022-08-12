import React, { FC, ReactNode, forwardRef } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import useLaunchSideSheet, {
  unset,
} from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchSideSheet';

const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(6) + 1,
      width: '100%',
      padding: `0 ${theme.spacing(1)}px`,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  })
);

interface HeaderProps {
  title: string;
  onClose: () => void;
}

const Header: FC<HeaderProps> = ({ title, onClose }) => {
  const classes = useHeaderStyles();

  return (
    <Grid
      container
      className={classes.root}
      justify="space-between"
      alignItems="center"
    >
      <Grid item xs>
        {/**
         * TODO add correct typography variant
         */}
        <Typography
          variant="h2"
          component="h2"
          style={{ fontWeight: 700, overflow: 'hidden' }}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item>
        {/**
         * The popper throws a strict mode error. Hopefullly it will be fixed soon by MUI.
         */}
        <Tooltip title="Close" aria-label="close">
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

const useSideSheetTabPanelStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(1),
    },
  })
);

interface SideSheetTabPanelProps {
  title: string;
  value: string;
  children: ReactNode;
}

const SideSheetTabPanel: FC<SideSheetTabPanelProps> = forwardRef<
  HTMLDivElement,
  SideSheetTabPanelProps
>(({ title, value, children }, ref) => {
  const classes = useSideSheetTabPanelStyles();
  const { sideSheet, dispatch } = useLaunchSideSheet();

  const handleClose = () => {
    unset(dispatch);
  };

  return (
    <div
      ref={ref}
      role="tabpanel"
      hidden={value !== sideSheet}
      id={`group-tabpanel-${value}`}
      aria-labelledby={`group-tab-${value}`}
      aria-label={title}
      style={{ height: '100%', position: 'fixed' }}
    >
      {value === sideSheet && (
        <>
          <Header title={title} onClose={handleClose} />
          <div
            style={{ overflowY: 'auto', height: '100%' }}
            className={classes.content}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
});

export default SideSheetTabPanel;
