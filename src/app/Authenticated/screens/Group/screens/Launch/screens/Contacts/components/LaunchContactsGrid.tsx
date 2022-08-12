import React, { FC, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import UseMuiDataTableTheme from 'app/components/shared/UseMuiDataTableTheme';
import { getGroupContactsData } from 'app/api-urls';
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
    minHeight: '20px',
    '&$hover:hover': {
      backgroundColor: theme.palette.warning.main,
    },
  },
}));

const buildColumns = (classes: any) => {
  return [
    {
      name: 'contactName',
      label: 'Contact Name',
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: 'contactType',
      label: 'Contact Type',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const isNotEqual = tableMeta.rowData[8];
          if (isNotEqual) {
            return (
              <div className={`highlighted-cell ${classes.hover}`}>{value}</div>
            );
          }
          return <span>{value}</span>;
        },
      },
    },
    {
      name: 'siteId',
      label: 'Site Id',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const isNotEqual = tableMeta.rowData[9];
          if (isNotEqual) {
            return (
              <div className={`highlighted-cell ${classes.hover}`}>{value}</div>
            );
          }
          return <span>{value}</span>;
        },
      },
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const isNotEqual = tableMeta.rowData[10];
          if (isNotEqual) {
            return (
              <div className={`highlighted-cell ${classes.hover}`}>{value}</div>
            );
          }
          return <span>{value}</span>;
        },
      },
    },
    {
      name: 'primaryPhone',
      label: 'Primary Phone',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const isNotEqual = tableMeta.rowData[11];
          if (isNotEqual) {
            return (
              <div className={`highlighted-cell ${classes.hover}`}>{value}</div>
            );
          }
          return <span>{value}</span>;
        },
      },
    },
    {
      name: 'fax',
      label: 'Fax',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const isNotEqual = tableMeta.rowData[12];
          if (isNotEqual) {
            return (
              <div className={`highlighted-cell ${classes.hover}`}>{value}</div>
            );
          }
          return <span>{value}</span>;
        },
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, tableMeta: any) => {
          const isNotEqual = tableMeta.rowData[13];
          if (isNotEqual) {
            return (
              <div className={`highlighted-cell ${classes.hover}`}>{value}</div>
            );
          }
          return <span>{value}</span>;
        },
      },
    },
    {
      name: 'onlyInGdf',
      options: {
        display: false,
      },
    },
    {
      name: 'contactTypeNotEqual',
      options: {
        display: false,
      },
    },
    {
      name: 'siteIdNotEqual',
      options: {
        display: false,
      },
    },
    {
      name: 'addressNotEqual',
      options: {
        display: false,
      },
    },
    {
      name: 'primaryPhoneNumberNotEqual',
      options: {
        display: false,
      },
    },
    {
      name: 'faxNotEqual',
      options: {
        display: false,
      },
    },
    {
      name: 'emailNotEqual',
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
      const onlyInGdf = row[7];
      if (onlyInGdf) {
        return {
          className: `contact-row highlighted-row ${classes.hover}`,
        };
      }
      return { className: `contact-row` };
    },
  };
};

export type LaunchInfo = {
  gdfValue: string;
  gsuValue: string;
  compareStatus: string;
};

export type LaunchGroupContactsInfoItem = {
  address: {
    city: LaunchInfo;
    county?: LaunchInfo;
    state: LaunchInfo;
    street1: LaunchInfo;
    street2?: LaunchInfo;
    zip: LaunchInfo;
    compareStatus: string;
  };
  compareStatus: string;
  emailAddress: LaunchInfo;
  faxNumber: LaunchInfo;
  firstName: LaunchInfo;
  jobTitle: LaunchInfo;
  lastName: LaunchInfo;
  middleInitial: LaunchInfo;
  phoneExtension: LaunchInfo;
  phoneNumber: LaunchInfo;
  roleListstring: LaunchInfo;
  siteListString: LaunchInfo;
};

export type ContactInfoDetailInfo = {
  number: string;
};

export type ContactsInfoTypes = {
  gdfValue: ContactInfoDetailInfo;
  gsuValue: string;
  compareStatus: string;
};

export const nonGsuContacts = (contactsGroupInfo: any) => {
  const contactsNotInGsu = contactsGroupInfo.filter(
    (c: any) => c.compareStatus !== 'ONLY_IN_GSU'
  );
  return contactsNotInGsu.map((c: any) => {
    return {
      contactName: `${c.firstName?.gdfValue || ''} 
      ${c.middleInitial?.gdfValue || ''} ${c.lastName?.gdfValue || ''}`,
      contactType: c.roleListString?.gdfValue,
      siteId: c.siteListString?.gdfValue,
      address: c.address?.fullAddress?.gdfValue,
      primaryPhone: `${c.fullPhoneNumber?.gdfValue || ''}`,
      fax: `${c.faxNumber?.gdfValue || ''}`,
      email: `${c.emailAddress?.gdfValue || ''}`,
      onlyInGdf: c.compareStatus === 'ONLY_IN_GDF',
      contactTypeNotEqual: c.roleListString?.compareStatus === 'NOT_EQUAL',
      siteIdNotEqual: c.siteListString?.compareStatus === 'NOT_EQUAL',
      addressNotEqual: c.address?.fullAddress?.compareStatus === 'NOT_EQUAL',
      primaryPhoneNumberNotEqual:
        c.fullPhoneNumber?.compareStatus === 'NOT_EQUAL',
      faxNotEqual: c.faxNumber?.compareStatus === 'NOT_EQUAL',
      emailNotEqual: c.emailAddress?.compareStatus === 'NOT_EQUAL',
    };
  });
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchContactsGrid: FC<BasicProps> = () => {
  const classes = useStyles();
  const { groupId, launchId } = useLaunchFormattedParams();
  const [open] = useState(true);

  const {
    currentState: groupContactsCallState,
    response: groupContactsInfo = [],
    makeApiCall: makeGroupContactsCall,
  } = useApiCall({
    url: getGroupContactsData(groupId, launchId),
    type: 'json',
  });

  useEffect(() => {
    if (groupContactsCallState === FetchStates.NOT_YET_CALLED) {
      makeGroupContactsCall();
    }
  }, [groupContactsCallState, makeGroupContactsCall]);
  const gsuContacts = groupContactsInfo?.filter(
    (c: any) => c.compareStatus === 'ONLY_IN_GSU'
  );
  return (
    <>
      {groupContactsCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {groupContactsCallState !== FetchStates.ERROR &&
        groupContactsCallState !== FetchStates.PENDING && (
          <div>
            {gsuContacts.length > 0 &&
              open &&
              nonGsuContacts(groupContactsInfo).length !== 0 && (
                <Alert
                  severity="warning"
                  variant="standard"
                  className={classes.warningBorder}
                  icon={<WarningIcon />}
                >
                  Contact Record(s) found in GSU and not found in GDF Viewer:
                  {gsuContacts.map((c: any) => {
                    return (
                      <li>
                        Contact Name: `{c.firstName?.gsuValue || ''}{' '}
                        {c.middleInitial?.gsuValue || ''}{' '}
                        {c.lastName?.gsuValue || ''}`
                      </li>
                    );
                  })}
                </Alert>
              )}
            <MuiThemeProvider theme={UseMuiDataTableTheme()}>
              <MUIDataTable
                title=""
                data={nonGsuContacts(groupContactsInfo)}
                columns={buildColumns(classes)}
                options={tableOptions(classes)}
              />
            </MuiThemeProvider>
          </div>
        )}
    </>
  );
};

export default LaunchContactsGrid;
