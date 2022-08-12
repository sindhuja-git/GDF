/* eslint-disable no-nested-ternary */
import React, { FC } from 'react';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import useLaunchTitle from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchTitle';
import LaunchComponentLink from '../../../../../screens/shared/LaunchComponentLink';
import LaunchPackageCode from '../../../../../screens/shared/LaunchPackageCode';

import LaunchInfo from './LaunchInfo';

const useLaunchHeaderStyles = makeStyles((theme: Theme) => {
  const areaSeparation = theme.spacing(2);

  return createStyles({
    root: {
      width: '100%',
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: `${theme.spacing(1)}px 0`,
    },
    container: {
      height: '100%',
    },
    gridContainer: {
      height: '100%',
    },
    pageHeader: {
      paddingRight: areaSeparation,
      width: '20%',
    },
    launchHeader: {
      paddingLeft: areaSeparation,
    },
  });
});

interface LaunchHeaderProps {
  className?: string;
}

const LaunchHeader: FC<LaunchHeaderProps> = ({ className }) => {
  const classes = useLaunchHeaderStyles();
  const { title } = useLaunchTitle();
  return (
    <Paper
      elevation={0}
      square
      className={clsx({ [className as string]: className }, classes.root)}
    >
      <Container className={classes.container}>
        <Grid container alignItems="center" className={classes.gridContainer}>
          <Grid item className={classes.pageHeader}>
            {title && title.includes('MAC') ? (
              <Typography variant="h2" style={{ fontSize: '1.2rem' }}>
                {title}
              </Typography>
            ) : title && title.includes('Plans Info') ? (
              <div>
                <Typography variant="h2">
                  <LaunchPackageCode />
                </Typography>
                <LaunchComponentLink isPlansLink />
              </div>
            ) : title && title.includes('Rates Info') ? (
              <div>
                <Typography variant="h2">
                  <LaunchPackageCode />
                </Typography>
                <LaunchComponentLink />
              </div>
            ) : (
              <Typography variant="h2">{title}</Typography>
            )}
          </Grid>

          <Grid item xs className={classes.launchHeader}>
            <LaunchInfo />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default LaunchHeader;
