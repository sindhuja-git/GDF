import React, { FC, useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import UseMuiDataTableTheme from 'app/components/shared/UseMuiDataTableTheme';
import { getGroupSiteData } from 'app/api-urls';
import Alert from '@material-ui/lab/Alert';
import WarningIcon from '@mui/icons-material/Warning';
import { FetchStates } from '../../../shared/constants';
import useApiCall from '../../../shared/useApiCall';

const useStyles = makeStyles((theme) => ({
  warningBorder: {
    border: '2px solid',
    borderColor: theme.palette.warning.main,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    '&$hover:hover': {
      backgroundColor: theme.palette.warning.main,
    },
  },
}));

export enum Direction {
  ASC = 'asc',
  DSC = 'desc',
}
const buildColumns = (classes: any) => {
  return [
    {
      name: 'siteId',
      label: 'Site ID',
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: 'siteName',
      label: 'Site Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const isEqual = tableMeta.rowData[6];
          if (isEqual) {
            return (
              <div className={`highlighted-cell ${classes.warning}`}>
                {value}
              </div>
            );
          }
          return <span>{value}</span>;
        },
      },
    },
    {
      name: 'siteType',
      label: 'Site Type',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const isEqual = tableMeta.rowData[7];
          if (isEqual) {
            return (
              <div className={`highlighted-cell ${classes.warning}`}>
                {value}
              </div>
            );
          }
          return <span>{value}</span>;
        },
      },
    },
    {
      name: 'siteStatus',
      label: 'Site Status',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const isEqual = tableMeta.rowData[8];
          if (isEqual) {
            return (
              <div className={`highlighted-cell ${classes.warning}`}>
                {value}
              </div>
            );
          }
          return <span>{value}</span>;
        },
      },
    },
    {
      name: 'updatedBy',
      label: 'Updated By',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'highlighted',
      options: {
        display: false,
      },
    },
    {
      name: 'siteNameNotEqual',
      options: {
        display: false,
      },
    },
    {
      name: 'siteTypeNotEqual',
      options: {
        display: false,
      },
    },
    {
      name: 'siteStatusNotEqual',
      options: {
        display: false,
      },
    },
  ];
};

const tableOptions = (classes: any) => {
  return {
    selectableRowsHideCheckboxes: true,
    fixedHeader: true,
    print: false,
    rowsPerPage: 25,
    download: false,
    viewColumns: false,
    filter: false,
    search: true,
    rowHover: false,
    setRowProps: (row: any) => {
      const highlighted = row[5];
      if (highlighted) {
        return {
          className: `site-row highlighted-row ${classes.warning}`,
        };
      }
      return { className: 'site-row' };
    },
  };
};

export type LaunchGroupSitesInfoItem = {
  compareStatus: string;
  inactive: {
    compareStatus: string;
    gdfValue: boolean;
    gsuValue: boolean;
  };
  name: {
    compareStatus: string;
    gdfValue: string;
    gsuValue: string;
  };
  siteId: {
    compareStatus: string;
    gdfValue: string;
    gsuValue: string;
  };
  type: {
    code: {
      compareStatus: string;
      gdfValue: string;
      gsuValue: string;
    };
    name: {
      compareStatus: string;
      gdfValue: string;
      gsuValue: string;
    };
    compareStatus: 'N/A';
  };
  updatedBy: {
    compareStatus: string;
    gdfValue: string;
    gsuValue: string;
  };
};

const initialState: Array<LaunchGroupSitesInfoItem> = [
  {
    compareStatus: '',
    inactive: {
      compareStatus: '',
      gdfValue: true,
      gsuValue: true,
    },
    name: {
      compareStatus: '',
      gdfValue: '',
      gsuValue: '',
    },
    siteId: {
      compareStatus: '',
      gdfValue: '',
      gsuValue: '',
    },
    type: {
      code: {
        compareStatus: '',
        gdfValue: '',
        gsuValue: '',
      },
      name: {
        compareStatus: '',
        gdfValue: '',
        gsuValue: '',
      },
      compareStatus: 'N/A',
    },
    updatedBy: {
      gdfValue: '',
      gsuValue: '',
      compareStatus: '',
    },
  },
];

// row is highlighted when site is effectively only in GDF
const rowIsHighlighted = (siteDiff: any) =>
  siteDiff.inactive?.gdfValue === false &&
  (siteDiff.compareStatus === 'ONLY_IN_GDF' ||
    siteDiff.inactive?.gsuValue === true);

const bothInactive = (siteDiff: any) =>
  siteDiff?.inactive?.gdfValue === true &&
  siteDiff?.inactive?.gsuValue === true;

const cellCanBeHighlighted = (siteDiff: any) =>
  siteDiff.inactive.gdfValue === false && rowIsHighlighted(siteDiff) === false;

const highlightedCellPresent = (tableRow: any) =>
  tableRow.siteNameNotEqual ||
  tableRow.siteTypeNotEqual ||
  tableRow.siteStatusNotEqual;

const genTableRowSortOrder = (tableRow: any) => {
  let sortOrder;
  if (tableRow.highlighted) {
    sortOrder = '1';
  } else if (tableRow.bothInactive) {
    sortOrder = '5';
  } else if (highlightedCellPresent(tableRow)) {
    sortOrder = '2';
  } else if (tableRow.siteStatus === 'ACTIVE') {
    sortOrder = '3';
  } else {
    sortOrder = '4';
  }
  sortOrder += tableRow.siteId;

  return sortOrder;
};

export const mapSiteDiffResponseToTableRows = (sitesGroupInfo: any) => {
  const mappedSiteDiffs = sitesGroupInfo.map((siteDiff: any) => ({
    siteId: siteDiff.siteId?.gdfValue,
    siteName: siteDiff.name?.gdfValue,
    siteType: siteDiff.type?.name?.gdfValue,
    siteStatus: siteDiff.inactive?.gdfValue === true ? 'INACTIVE' : 'ACTIVE',
    updatedBy: siteDiff.updatedBy?.gdfValue,
    highlighted: rowIsHighlighted(siteDiff),
    siteNameNotEqual:
      siteDiff.name?.compareStatus === 'NOT_EQUAL' &&
      cellCanBeHighlighted(siteDiff),
    siteTypeNotEqual:
      siteDiff.type?.compareStatus === 'NOT_EQUAL' &&
      cellCanBeHighlighted(siteDiff),
    siteStatusNotEqual:
      siteDiff.inactive?.compareStatus === 'NOT_EQUAL' &&
      cellCanBeHighlighted(siteDiff),
    bothInactive: bothInactive(siteDiff),
    compareStatus: siteDiff.compareStatus,
  }));

  return mappedSiteDiffs.sort((s1: any, s2: any) =>
    genTableRowSortOrder(s1) > genTableRowSortOrder(s2) ? 1 : -1
  );
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const siteEffectivelyOnlyInGsu = (siteDiff: any) =>
  siteDiff.inactive?.gsuValue === false &&
  (siteDiff.compareStatus === 'ONLY_IN_GSU' ||
    siteDiff.inactive?.gdfValue === true);

const siteShouldDisplayInTable = (siteDiff: any) =>
  siteDiff.compareStatus !== 'ONLY_IN_GSU';

const LaunchSitesGrid: FC<BasicProps> = () => {
  const classes = useStyles();
  const { groupId, launchId } = useLaunchFormattedParams();
  const [open] = useState(true);

  const {
    currentState: gsuSitesCallState,
    response: groupSiteInfo = initialState,
    makeApiCall: makeGsuSitesCall,
  } = useApiCall({
    url: getGroupSiteData(groupId, launchId),
    type: 'json',
  });

  useEffect(() => {
    if (gsuSitesCallState === FetchStates.NOT_YET_CALLED) {
      makeGsuSitesCall();
    }
  }, [gsuSitesCallState, makeGsuSitesCall]);
  const gsuSites = groupSiteInfo
    .filter(siteEffectivelyOnlyInGsu)
    .sort((a, b) => (a.siteId?.gsuValue > b?.siteId?.gsuValue ? 1 : -1));

  const tableRows = mapSiteDiffResponseToTableRows(
    groupSiteInfo.filter(siteShouldDisplayInTable)
  );

  return (
    <>
      {gsuSitesCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {gsuSitesCallState !== FetchStates.PENDING &&
        gsuSitesCallState !== FetchStates.ERROR && (
          <div>
            {gsuSites.length > 0 && open && tableRows.length !== 0 && (
              <Alert
                severity="warning"
                variant="standard"
                className={classes.warningBorder}
                icon={<WarningIcon />}
                id="sites-diff-alert"
              >
                Site Record(s) found in GSU and not found in GDF Viewer:
                {gsuSites.map((gs: any) => {
                  return <li>Site ID: {gs.siteId.gsuValue}</li>;
                })}
              </Alert>
            )}
            <MuiThemeProvider theme={UseMuiDataTableTheme()}>
              <div id="sites-table">
                <MUIDataTable
                  title=""
                  data={tableRows}
                  columns={buildColumns(classes)}
                  options={tableOptions(classes)}
                />
              </div>
            </MuiThemeProvider>
          </div>
        )}
    </>
  );
};

export default LaunchSitesGrid;
