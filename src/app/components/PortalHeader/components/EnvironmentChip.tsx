import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useEnviornmentChipTextStyles = makeStyles(() =>
  createStyles({
    environmentName: {
      textTransform: 'uppercase',
    },
  })
);

interface EnvironmentChipTextProps {
  id?: string;
  environment: string;
}

const EnvironmentChipText: React.FC<EnvironmentChipTextProps> = ({
  id,
  environment,
}) => {
  const classes = useEnviornmentChipTextStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const environmentText = matches ? 'Environment' : 'ENV';

  return (
    <Typography component="span" className={classes.environmentName}>
      {environmentText}: <span id={id}>{environment}</span>
    </Typography>
  );
};
EnvironmentChipText.propTypes = {
  id: PropTypes.string,
  environment: PropTypes.string.isRequired,
};
EnvironmentChipText.defaultProps = {
  id: undefined,
};

interface EnvironmentChipProps {
  id?: string;
  environment: string;
}

const EnvironmentChip = forwardRef<any, EnvironmentChipProps>(
  ({ id, environment }, ref) => (
    <Chip
      ref={ref}
      label={<EnvironmentChipText id={id} environment={environment} />}
      variant="outlined"
    />
  )
);
EnvironmentChip.propTypes = {
  id: PropTypes.string,
  environment: PropTypes.string.isRequired,
};
EnvironmentChip.defaultProps = {
  id: undefined,
};

export default EnvironmentChip;
