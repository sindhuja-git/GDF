import React, { forwardRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { HpLogomark } from '../icons/src/index';
import EnvironmentChip from './EnvironmentChip';

const useLogoStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    hpLogo: {
      color: '#222021',
    },
  })
);

const Logo = () => {
  const classes = useLogoStyles();

  return (
    <HpLogomark
      viewBox="0 0 23.98 16.02"
      fontSize="large"
      className={classes.hpLogo}
    />
  );
};

const usePortalHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.common.white,
    },
    logoArea: {
      display: 'flex',
      alignItems: 'center',
    },
    margin: {
      marginRight: theme.spacing(1),
    },
    marginDouble: {
      marginRight: theme.spacing(2),
    },
  })
);

export interface PortalHeaderProps extends PaperProps {
  /**
   * Logo to render.
   *
   * If logo is not present. Will render the HP Logo.
   * @default HpLogomark
   */
  logo?: ReactNode;
  /**
   * Application's name
   */
  appName: ReactNode;
  /**
   * Props passed to wrapping Application component.
   *
   * Pass href or link properties as object.
   */
  appNameProps?: { [key: string]: any };
  /**
   * Current environment. Environment is used to define portal URL.
   */
  environment: string;
  /**
   * Current Version. *Note, the component will prepend the passed in version with "v "". Will not render if undefined.*
   */
  version?: string;
  /**
   * Control Area. Variable area to the right of the Environment Chip. Right Justified.
   */
  controls?: ReactNode;
}

/**
 * PortalHeader is meant to be used with `@material-ui/core`'s **AppBar** component.
 *
 * By default, this component is a Toolbar wrapped in a Paper for usage in any layout. Thus, evelation is disabled by default.
 */
const PortalHeader = forwardRef<HTMLDivElement, PortalHeaderProps>(
  (
    {
      logo,
      appName,
      appNameProps,
      environment,
      version,
      controls,
      ...paperProps
    },
    ref
  ) => {
    const classes = usePortalHeaderStyles();

    return (
      <Paper
        ref={ref}
        color="default"
        className={classes.root}
        component="div"
        elevation={0}
        square
        {...paperProps}
      >
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs>
              <Grid container alignItems="center">
                <Grid
                  item
                  className={clsx(classes.logoArea, classes.marginDouble)}
                >
                  <Logo />
                </Grid>
                <Grid item className={classes.marginDouble}>
                  <Typography>|</Typography>
                </Grid>
                <Grid item className={classes.margin}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Typography variant="h5" component="h5">
                    {appName}
                  </Typography>
                </Grid>
                <Grid item>
                  {version && <Typography>{`v ${version}`}</Typography>}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <EnvironmentChip id="app-environment" environment={environment} />
            </Grid>
            <Grid item xs>
              <Grid container justify="flex-end">
                <Grid item>{controls}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </Paper>
    );
  }
);
PortalHeader.propTypes = {
  logo: PropTypes.node,
  appName: PropTypes.node.isRequired,
  environment: PropTypes.string.isRequired,
  version: PropTypes.string,
  controls: PropTypes.node,
};
PortalHeader.defaultProps = {
  logo: undefined,
  version: undefined,
  controls: undefined,
};

export default PortalHeader;
