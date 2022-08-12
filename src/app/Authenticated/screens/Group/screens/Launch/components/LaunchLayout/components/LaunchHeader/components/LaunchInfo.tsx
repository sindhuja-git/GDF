import React, { FC, useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  formatIsoStringToVernacularDateTime,
  formatIsoStringToVernacularDate,
} from 'utils/date/helpers';
import clsx from 'clsx';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';

const GET_LAUNCH_INFO = gql`
  query GetGroupLaunches($groupId: String!, $launchId: Int!) {
    group(id: $groupId) {
      id
      launches(eq: { id: $launchId }) {
        id
        isActive
        formType {
          code
          name
        }
        status {
          code
          name
        }
        launchDate
        effectiveDate
        macReceivedDate
        finalDate
      }
    }
  }
`;
export type Dictionary = {
  code: string;
  name: string;
};

type LaunchQueryData = {
  id: number;
  isActive: boolean;
  formType: {
    code: string;
    name: string;
  };
  status: {
    code: string;
    name: string;
  };
  launchDate: string;
  effectiveDate: string;
  macReceivedDate?: string;
  finalDate?: string;
};

export type GetGroupLaunchesQuery = {
  group: {
    id: string;
    launches: [LaunchQueryData?];
  };
};

type LaunchStatus = 'In Flow' | 'Completed' | 'Rejected' | undefined;
type LaunchStage = 'draft' | 'final' | undefined;

type CalculatedLaunchState = {
  stage: LaunchStage;
  status: LaunchStatus;
  type: string;
  launchDate: string;
  effectiveDate: string;
  macReceivedDate?: string;
  finalDate?: string;
};

const calculateStatus = (
  isActive?: boolean,
  launchStatus?: string
): LaunchStatus => {
  let status: LaunchStatus;

  if (isActive === true) {
    status = 'In Flow';
  } else if (isActive === false) {
    status = launchStatus === 'Rejected' ? 'Rejected' : 'Completed';
  }

  return status;
};

const calculateStage = (
  status?: LaunchStatus,
  finalDate?: string
): LaunchStage => {
  let stage: LaunchStage;

  if (status && status === 'In Flow') {
    stage = finalDate ? 'final' : 'draft';
  }

  return stage;
};

const calculateLaunchState = (
  launch?: LaunchQueryData
): CalculatedLaunchState => {
  const {
    isActive,
    status: launchStatus,
    finalDate,
    formType,
    launchDate,
    effectiveDate,
    macReceivedDate,
  } = launch ?? {};

  const status = calculateStatus(isActive, launchStatus?.name);
  const stage = calculateStage(status, finalDate);

  return {
    stage,
    status,
    type: formType?.name ?? '',
    launchDate: launchDate
      ? formatIsoStringToVernacularDateTime(launchDate)
      : '',
    effectiveDate: effectiveDate
      ? formatIsoStringToVernacularDate(effectiveDate)
      : '',
    macReceivedDate: macReceivedDate
      ? formatIsoStringToVernacularDateTime(macReceivedDate)
      : undefined,
    finalDate: finalDate
      ? formatIsoStringToVernacularDateTime(finalDate)
      : undefined,
  };
};

const useLaunchHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      textTransform: 'uppercase',
    },
    textRight: {
      textAlign: 'right',
    },
    completedStatus: {
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.common.white,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
    rejectedStatus: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
    draftStage: {
      color: theme.palette.error.main,
    },
  })
);

const LaunchInfo: FC<{}> = () => {
  const classes = useLaunchHeaderStyles();

  const { groupId, launchId } = useLaunchFormattedParams();

  const { loading, data } = useQuery<GetGroupLaunchesQuery>(GET_LAUNCH_INFO, {
    variables: { groupId, launchId },
  });
  const launch = data?.group?.launches[0];
  /**
   * We are memoizing since we will do date transformations here.
   */
  const {
    stage,
    status,
    type,
    launchDate,
    effectiveDate,
    macReceivedDate,
    finalDate,
  } = useMemo(() => calculateLaunchState(launch), [launch]);

  if (loading) {
    return <CircularProgress color="primary" />;
  }

  return (
    <Grid container direction="column">
      <Grid item className={classes.textRight}>
        <Typography
          variant="h2"
          component="span"
          className={clsx(
            classes.header,
            {
              [classes.rejectedStatus]: status === 'Rejected',
            },
            {
              [classes.completedStatus]: status === 'Completed',
            }
          )}
        >
          GDF {type} | {status}
          {stage && (
            <>
              {' | '}
              <span
                className={clsx({ [classes.draftStage]: stage === 'draft' })}
              >
                {stage}
              </span>
            </>
          )}{' '}
          &bull; Effective Date {effectiveDate}
        </Typography>
      </Grid>
      <Grid item className={classes.textRight}>
        <Typography variant="caption" id="launch-info">
          Launch ID: {launchId} • Launched Date: {launchDate}
          {finalDate && ` • Final Date: ${finalDate}`}
          {macReceivedDate && ` • MAC Received Date: ${macReceivedDate}`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LaunchInfo;
