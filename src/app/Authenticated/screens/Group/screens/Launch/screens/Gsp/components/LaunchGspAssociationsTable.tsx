import React, { FC, useEffect, useState } from 'react';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import UseMuiDataTableTheme from 'app/components/shared/UseMuiDataTableTheme';
import { getGspAssociationsData } from 'app/api-urls';
import Alert from '@material-ui/lab/Alert';
import WarningIcon from '@mui/icons-material/Warning';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';

const useStyles = makeStyles((theme) => ({
  warningBorder: {
    border: '2px solid',
    borderColor: theme.palette.warning.main,
  },
  hover: {
    backgroundColor: theme.palette.warning.main,
    '&$hover:hover': {
      backgroundColor: theme.palette.warning.main,
    },
  },
}));

const tableOptions = (classes: any) => {
  return {
    selectableRowsHideCheckboxes: true,
    fixedHeader: true,
    rowsPerPage: 25,
    print: false,
    download: false,
    viewColumns: false,
    filter: false,
    rowHover: false,
    setRowProps: (row: any) => {
      const onlyInGdf = row[3];
      if (onlyInGdf) {
        return {
          className: classes.hover,
        };
      }
      return {};
    },
  };
};

const columns = [
  {
    name: 'siteId',
    label: 'Site ID',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'packageCode',
    label: 'Package',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'planType',
    label: 'Plan Type',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'onlyInGdf',
    options: {
      display: false,
    },
  },
];

export type LaunchGspAssociationItem = {
  siteId: string | boolean;
  packageCode: string | boolean;
  planType: string | boolean;
  compareStatus: string | boolean;
};

const initialState: Array<LaunchGspAssociationItem> = [
  {
    siteId: '',
    packageCode: '',
    planType: '',
    compareStatus: '',
  },
];

export const nonGsuGsps = (gspAssociationInfo: any) => {
  const gspsNotInGsu = gspAssociationInfo.filter(
    (s: any) => s.compareStatus !== 'ONLY_IN_GSU'
  );
  const genSortOrder = (s: any) => {
    let sortOrder;
    if (s.compareStatus === 'ONLY_IN_GDF') sortOrder = '1';
    else if (s.compareStatus === 'NOT_EQUAL') sortOrder = '2';
    else sortOrder = '3';

    sortOrder += s.siteId;

    return sortOrder;
  };
  return gspsNotInGsu
    .map((g: any) => {
      return {
        siteId: g.siteNumber?.gdfValue,
        packageCode: g.packageCode?.gdfValue,
        planType: g.planType?.name?.gdfValue,
        compareStatus: g.compareStatus,
        onlyInGdf: g.compareStatus === 'ONLY_IN_GDF',
      };
    })
    .sort((s1: any, s2: any) => (genSortOrder(s1) > genSortOrder(s2) ? 1 : -1));
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchGspAssociationsTable: FC<BasicProps> = () => {
  const { groupId, launchId } = useLaunchFormattedParams();

  const [open] = useState(true);
  const classes = useStyles();

  const {
    currentState: gspAssociationInfoCallState,
    response: gspAssociationInfo = initialState,
    makeApiCall: makeGspAssociationInfoCall,
  } = useApiCall({
    url: getGspAssociationsData(groupId, launchId),
    type: 'json',
  });

  useEffect(() => {
    if (gspAssociationInfoCallState === FetchStates.NOT_YET_CALLED) {
      makeGspAssociationInfoCall();
    }
  }, [gspAssociationInfoCallState, makeGspAssociationInfoCall]);

  const gspSitesOnlyInGsu = gspAssociationInfo?.filter(
    (s: any) => s.compareStatus === 'ONLY_IN_GSU'
  );
  return (
    <>
      {gspAssociationInfoCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {gspAssociationInfoCallState !== FetchStates.PENDING &&
        gspAssociationInfoCallState !== FetchStates.ERROR && (
          <div>
            {open &&
              gspSitesOnlyInGsu.length > 0 &&
              nonGsuGsps(gspAssociationInfo).length !== 0 &&
              open && (
                <Alert
                  severity="warning"
                  variant="standard"
                  className={classes.warningBorder}
                  icon={<WarningIcon />}
                >
                  Open GSP Record(s) found in GSU and not found in GDF Viewer:
                  {gspSitesOnlyInGsu.map((gs: any) => {
                    return (
                      <li key={gs.siteNumber.gsuValue}>
                        Site ID: {gs.siteNumber.gsuValue} | Package:{' '}
                        {gs.packageCode.gsuValue}
                      </li>
                    );
                  })}
                </Alert>
              )}
            <Typography gutterBottom variant="h3" component="h3">
              Group-Site-Plan Associations
            </Typography>
            <MuiThemeProvider theme={UseMuiDataTableTheme()}>
              <MUIDataTable
                title=""
                data={nonGsuGsps(gspAssociationInfo)}
                columns={columns}
                options={tableOptions(classes)}
              />
            </MuiThemeProvider>
          </div>
        )}
    </>
  );
};

export default LaunchGspAssociationsTable;
