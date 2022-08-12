/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Link, ListItemIcon, Tooltip } from '@material-ui/core';
import WarningIcon from '@mui/icons-material/Warning';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import { formatIsoStringToVernacularDate } from 'utils/date/helpers';
import MUIDataTable from 'mui-datatables';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import UseMuiDataTableTheme from 'app/components/shared/UseMuiDataTableTheme';
import { getPlanSummary, getRatesSummary } from 'app/Ducks/PlanSummary/actions';
import {
  FetchStates,
  GOVERNMENT_MARKET_SEGMENT_CODES,
} from 'app/Authenticated/screens/Group/screens/Launch/shared/constants';
import { useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router';
import ReportIcon from '@mui/icons-material/Report';
import { getFeatureFlag } from 'app/api-urls';
import useApiCall from '../../../shared/useApiCall';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.warning.main,
  },
  alert: {
    color: '#d91535',
  },
  warningBorder: {
    border: '2px solid',
    borderColor: theme.palette.warning.main,
  },
  warningText: {
    marginTop: '2px',
  },
  linkStyles: {
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
}));

const buildColumns: Function = (
  navFunction: NavigateFunction,
  viewNewPlanUrl: string,
  viewPlanUrl: string,
  viewRateUrl: string,
  type: string,
  classes: any,
  newPlanPageFlag: boolean
) => {
  return [
    {
      name: 'hrefUriVariables',
      label: 'Actions',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          if (
            value === 'Medical' ||
            value === 'Dental' ||
            value === 'Other' ||
            value === 'CDHP' ||
            value === 'Government Programs' ||
            value === 'Admin'
          ) {
            return (
              <span
                style={{
                  fontWeight: 'bold',
                  color: '#3E4451',
                  height: 'max-height',
                  textTransform: 'uppercase',
                }}
              >
                {value}
              </span>
            );
          }
          const endDate = tableMeta.rowData[18];
          const hasRate = tableMeta.rowData[1];
          const compareStatus = tableMeta.rowData[2];
          // if there is no end date
          if (endDate === '') {
            return (
              <>
                {hasRate && type === 'Rates' ? (
                  <div>
                    <Link
                      className={classes.linkStyles}
                      onClick={() =>
                        navFunction(
                          `${viewRateUrl}/${value?.planId}/packageCode/${
                            value?.packageCode || ''
                          }`,
                          {
                            replace: true,
                          }
                        )
                      }
                    >
                      View Rates
                      {(compareStatus === 'NOT_EQUAL' ||
                        compareStatus === 'ONLY_IN_GSU') && (
                        <Tooltip title="Needs Review">
                          <ListItemIcon className={classes.icon}>
                            <WarningIcon />
                          </ListItemIcon>
                        </Tooltip>
                      )}
                      {value?.packageCode !== '' &&
                        compareStatus === 'ONLY_IN_GDF' && (
                          <ListItemIcon className={classes.alert}>
                            <WarningAmberIcon />
                          </ListItemIcon>
                        )}
                      {value?.packageCode !== '' &&
                        compareStatus === 'NOT_COMPARABLE' && (
                          <ListItemIcon className={classes.alert}>
                            <ReportIcon />
                          </ListItemIcon>
                        )}
                    </Link>
                  </div>
                ) : (
                  type === 'Plans' && (
                    <>
                      <Link
                        className={classes.linkStyles}
                        onClick={() =>
                          navFunction(
                            `${viewPlanUrl}/${value?.planId}/packageCode/${value?.packageCode}`,
                            {
                              replace: true,
                            }
                          )
                        }
                      >
                        View Plan
                        {compareStatus === 'NOT_EQUAL' && (
                          <Tooltip title="Needs Review">
                            <ListItemIcon className={classes.icon}>
                              <WarningIcon />
                            </ListItemIcon>
                          </Tooltip>
                        )}
                        {value?.packageCode !== '' &&
                          (compareStatus === 'ONLY_IN_GDF' ||
                            compareStatus === 'NOT_COMPARABLE') && (
                            <ListItemIcon className={classes.alert}>
                              <WarningAmberIcon />
                            </ListItemIcon>
                          )}
                      </Link>
                      {newPlanPageFlag && (
                        <Link
                          className={classes.linkStyles}
                          onClick={() =>
                            navFunction(
                              `${viewNewPlanUrl}/${value?.planId}/packageCode/${value?.packageCode}`,
                              {
                                replace: true,
                              }
                            )
                          }
                        >
                          View New Plan
                          {compareStatus === 'NOT_EQUAL' && (
                            <Tooltip title="Needs Review">
                              <ListItemIcon className={classes.icon}>
                                <WarningIcon />
                              </ListItemIcon>
                            </Tooltip>
                          )}
                          {value?.packageCode !== '' &&
                            (compareStatus === 'ONLY_IN_GDF' ||
                              compareStatus === 'NOT_COMPARABLE') && (
                              <ListItemIcon className={classes.alert}>
                                <WarningAmberIcon />
                              </ListItemIcon>
                            )}
                        </Link>
                      )}
                    </>
                  )
                )}
              </>
            );
          }
          // if there is end date, show empty value
          return <span />;
        },
      },
    },
    {
      name: 'hasRate',
      label: 'Has Rate',
      options: {
        display: false,
      },
    },
    {
      name: 'compareStatus',
      label: '',
      options: {
        display: false,
      },
    },
    {
      name: 'gdfName',
      label: 'GDF Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'planType',
      label: 'Plan Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'priorPkg',
      label: 'Prior Pkg',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'pkg',
      label: 'Pkg',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'prdCode',
      label: 'Prd Code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'dnId',
      label: 'DN ID',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'mktSeg',
      label: 'Mkt Seg',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'fundType',
      label: 'Fund Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'benYearAdmin',
      label: 'Ben Year Admin',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'credCov',
      label: 'Cred Cov',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'cigna',
      label: 'Cigna',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'prevAutoDental',
      label: 'Prior Auto Pkg',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'autoPkg',
      label: 'Auto Pkg',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'beginDate',
      label: 'Begin Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'nextRenewDate',
      label: 'Next Renew Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'endDate',
      label: 'End Date',
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
};

const tableOptions = {
  selectableRowsHideCheckboxes: true,
  fixedHeader: true,
  pagination: false,
  print: false,
  download: false,
  viewColumns: false,
  filter: false,
  search: false,
  rowHover: false,
  setRowProps: (row: any) => {
    if (
      row[0].props.children === 'Medical' ||
      row[0].props.children === 'Dental' ||
      row[0].props.children === 'Other' ||
      row[0].props.children === 'CDHP' ||
      row[0].props.children === 'Government Programs' ||
      row[0].props.children === 'Admin'
    ) {
      return {
        style: { backgroundColor: '#DDDFE5' },
      };
    }
    if (row[row.length - 1] !== '') {
      return {
        style: {
          backgroundColor: '#F0F2F4',
          color: '#696E79',
          fontStyle: 'italic',
        },
      };
    }
    return {};
  },
};

export const deriveDisplayedPackageCode = (
  packageCode: string,
  planName: string,
  otherCurrentPackageCodes: string[]
) => {
  if (planName === 'Health & Well-Being Solutions') {
    return (
      otherCurrentPackageCodes.find((otherCurrentPackageCode: string) =>
        otherCurrentPackageCode.startsWith('J')
      ) || ''
    );
  }
  return packageCode;
};

const buildRow = (plan: any) => {
  const {
    planId,
    gdfName,
    packageCode,
    productCode,
    creditableRxCoverage,
    autoAssignPackage,
    hasRate,
    compareStatus,
    otherCurrentPackageCodes,
    previousAutoDentalDisplay,
  } = plan;
  const derivedPackageCodeToDisplay = deriveDisplayedPackageCode(
    packageCode,
    plan.planType?.name,
    otherCurrentPackageCodes
  );
  return {
    hrefUriVariables: { planId, packageCode: derivedPackageCodeToDisplay },
    gdfName,
    planType: plan.planType?.name,
    isPlanTypeDiff: true,
    priorPkg: plan.previousPackageCode && `(${plan.previousPackageCode})`,
    pkg: derivedPackageCodeToDisplay,
    prdCode: productCode,
    dnId: plan?.deliveryNetwork?.code,
    mktSeg: plan.marketSegment && plan.marketSegment.code,
    fundType: plan.fundingType && plan.fundingType.name,
    benYearAdmin: plan.pdmaYearType && plan.pdmaYearType.name,
    credCov: creditableRxCoverage,
    cigna: plan.cignaAffiliation && plan.cignaAffiliation.code,
    autoPkg: autoAssignPackage,
    prevAutoDental: previousAutoDentalDisplay,
    beginDate: plan.beginDate
      ? formatIsoStringToVernacularDate(plan.beginDate)
      : '',
    nextRenewDate: plan.nextRenewalDate
      ? formatIsoStringToVernacularDate(plan.nextRenewalDate)
      : '',
    endDate: plan.endDate ? formatIsoStringToVernacularDate(plan.endDate) : '',
    hasRate,
    compareStatus,
  };
};

export const sortByGdfName = (plan1: any, plan2: any) =>
  plan1.gdfName.localeCompare(plan2.gdfName);

export const getRowData: Function = (planSummaries: any) => {
  const medicalPlansWithEndDate: any = [
    { hrefUriVariables: 'Medical', value: 'test' },
  ];
  const medicalPlansWithoutEndDate: any = [];
  const govtPlansWithEndDate: any = [
    { hrefUriVariables: 'Government Programs' },
  ];
  const govtPlansWithoutEndDate: any = [];
  const dentalPlansWithEndDate: any = [{ hrefUriVariables: 'Dental' }];
  const dentalPlansWithoutEndDate: any = [];
  const cdhpPlansWithEndDate: any = [{ hrefUriVariables: 'CDHP' }];
  const cdhpPlansWithoutEndDate: any = [];
  const otherPlansWithEndDate: any = [{ hrefUriVariables: 'Other' }];
  const otherPlansWithoutEndDate: any = [];
  const adminPlansWithEndDate: any = [{ hrefUriVariables: 'Admin' }];
  const adminPlansWithoutEndDate: any = [];

  planSummaries?.forEach((plan: any) => {
    const planTypeName = plan.planType && plan.planType.name;
    const { endDate } = plan;
    const marketSegmentCode = plan.marketSegment && plan.marketSegment.code;
    const otherPlans = planTypeName === 'Health & Well-Being Solutions';
    const isAdminPlan =
      planTypeName === 'Health & Wellness' ||
      planTypeName === 'Admin' ||
      planTypeName === 'Worksite Health/EAP';
    const row = buildRow(plan);
    const isGovernmentPlan = GOVERNMENT_MARKET_SEGMENT_CODES.some(
      (govtMarketSegmentCode) => govtMarketSegmentCode === marketSegmentCode
    );
    if (planTypeName === 'Medical' && endDate !== null) {
      if (isGovernmentPlan) {
        govtPlansWithEndDate.push(row);
      } else {
        medicalPlansWithEndDate.push(row);
      }
    }
    if (planTypeName === 'Medical' && endDate === null) {
      if (isGovernmentPlan) {
        govtPlansWithoutEndDate.push(row);
      } else {
        medicalPlansWithoutEndDate.push(row);
      }
    }
    if (planTypeName === 'Dental' && endDate !== null) {
      dentalPlansWithEndDate.push(row);
    }
    if (planTypeName === 'Dental' && endDate === null) {
      dentalPlansWithoutEndDate.push(row);
    }
    if (planTypeName === 'CDHP' && endDate !== null) {
      cdhpPlansWithEndDate.push(row);
    }
    if (planTypeName === 'CDHP' && endDate === null) {
      cdhpPlansWithoutEndDate.push(row);
    }
    if (otherPlans && endDate !== null) {
      otherPlansWithEndDate.push(row);
    }
    if (otherPlans && endDate === null) {
      otherPlansWithoutEndDate.push(row);
    }
    if (isAdminPlan && endDate !== null) {
      adminPlansWithEndDate.push(row);
    }
    if (isAdminPlan && endDate === null) {
      adminPlansWithoutEndDate.push(row);
    }
  });

  // sort untermed plans by GDF name
  cdhpPlansWithoutEndDate.sort(sortByGdfName);
  otherPlansWithoutEndDate.sort(sortByGdfName);
  govtPlansWithoutEndDate.sort(sortByGdfName);
  adminPlansWithoutEndDate.sort(sortByGdfName);

  const rowData = [
    ...(medicalPlansWithEndDate.length > 1 ||
    medicalPlansWithoutEndDate.length > 0
      ? medicalPlansWithEndDate
      : []),
    ...medicalPlansWithoutEndDate,
    ...(dentalPlansWithEndDate.length > 1 ||
    dentalPlansWithoutEndDate.length > 0
      ? dentalPlansWithEndDate
      : []),
    ...dentalPlansWithoutEndDate,
    ...(govtPlansWithEndDate.length > 1 || govtPlansWithoutEndDate.length > 0
      ? govtPlansWithEndDate
      : []),
    ...govtPlansWithoutEndDate,
    ...(cdhpPlansWithEndDate.length > 1 || cdhpPlansWithoutEndDate.length > 0
      ? cdhpPlansWithEndDate
      : []),
    ...cdhpPlansWithoutEndDate,
    ...(otherPlansWithEndDate.length > 1 || otherPlansWithoutEndDate.length > 0
      ? otherPlansWithEndDate
      : []),
    ...otherPlansWithoutEndDate,
    ...(adminPlansWithEndDate.length > 1 || adminPlansWithoutEndDate.length > 0
      ? adminPlansWithEndDate
      : []),
    ...adminPlansWithoutEndDate,
  ];
  return rowData;
};

export type LaunchGroupPlansInfoItem = {
  hrefUriVariables: {
    planId: string;
    packageCode: string;
  };
  gdfName: string;
  planType: {
    code: string;
    name: string;
  };
  previousPackageCode: string;
  packageCode: string;
  productCode: string;
  deliveryNetwork: {
    code: string;
    name: string;
  };
  marketSegment: {
    code: string;
    name: string;
  };
  fundingType: {
    code: string;
    name: string;
  };
  pdmaYearType: {
    code: string;
    name: string;
  };
  creditableRxCoverage: string;
  cignaAffiliation: {
    code: string;
    name: string;
  };
  autoAssignPackage: string;
  previousAutoDentalDisplay: string;
  beginDate: string | null;
  endDate: string | null;
  nextRenewalDate: string | null;
  benYearAdmin: {
    code: string;
    name: string;
  };
  hasRate: boolean;
  compareStatus: boolean;
};

export type BasicProps = {
  type: string;
  planRateSummaryInfo: [];
};

export type InitialProps = boolean;

const load: InitialProps = true;
const err: InitialProps = false;

const LaunchPlansAndRatesGrid: FC<BasicProps> = (props) => {
  const dispatch = useDispatch();
  const { type, planRateSummaryInfo } = props;
  const { groupId, launchId } = useLaunchFormattedParams();
  const [loading, setLoading] = useState(load);
  const [error, setError] = useState(err);
  const {
    currentState: newPlanPageFlagCallState,
    response: newPlanPageFlag,
    makeApiCall: makeNewPlanPageFlagCall,
  } = useApiCall({
    url: getFeatureFlag('GDFViewer.NewPlanPage'),
    type: 'json',
  });

  const onlyInGsuPackageCodes: string[] = Array.isArray(planRateSummaryInfo)
    ? planRateSummaryInfo
        .filter(
          (planSummary: any) => planSummary?.compareStatus === 'ONLY_IN_GSU'
        )
        .filter(
          // filter out ONLY_IN_GSU packageCodes that match an autoAssignPackage code on a plan
          (planSummary: any) =>
            !planRateSummaryInfo.find(
              (otherPlanSummary: any) =>
                otherPlanSummary?.autoAssignPackageCode ===
                planSummary?.packageCode
            )
        )
        .map((planSummary: any) => {
          const {
            packageCode,
            planName,
            otherCurrentPackageCodes,
          } = planSummary;
          return deriveDisplayedPackageCode(
            packageCode,
            planName,
            otherCurrentPackageCodes
          );
        })
    : [];

  const classes = useStyles();

  const planUrl = `/groups/${groupId}/launches/${launchId}/plans/plansInfo`;
  const newPlanUrl = `/groups/${groupId}/launches/${launchId}/plans/newPlansInfo`;
  const rateUrl = `/groups/${groupId}/launches/${launchId}/rates/rateInfo`;

  useEffect(() => {
    if (type === 'Plans') {
      dispatch(getPlanSummary(groupId, launchId));
    }
    if (type === 'Rates') {
      dispatch(getRatesSummary(groupId, launchId));
    }
    const calls = [
      {
        currentState: newPlanPageFlagCallState,
        makeApiCall: makeNewPlanPageFlagCall,
      },
    ];

    calls.forEach(({ currentState, makeApiCall }) => {
      if (currentState === FetchStates.NOT_YET_CALLED) {
        makeApiCall();
      }
    });

    setLoading(false);
    setError(false);
  }, [
    groupId,
    launchId,
    type,
    dispatch,
    newPlanPageFlagCallState,
    makeNewPlanPageFlagCall,
  ]);

  const navigate = useNavigate();
  return (
    <>
      {loading && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {!error && !loading && planRateSummaryInfo && (
        <MuiThemeProvider theme={UseMuiDataTableTheme()}>
          {type === 'Plans' && onlyInGsuPackageCodes.length !== 0 && (
            <Alert
              severity="warning"
              variant="standard"
              className={classes.warningBorder}
              icon={<WarningIcon />}
            >
              <Grid className={classes.warningText}>
                Plan Record(s) found in GSU and not found in GDF Viewer:
                {onlyInGsuPackageCodes.map((packageCode: string) => (
                  <li key={packageCode}>Pkg: {packageCode}</li>
                ))}
              </Grid>
            </Alert>
          )}
          <MUIDataTable
            title=""
            data={getRowData(planRateSummaryInfo)}
            columns={buildColumns(
              navigate,
              newPlanUrl,
              planUrl,
              rateUrl,
              type,
              classes,
              newPlanPageFlag
            )}
            options={tableOptions}
          />
        </MuiThemeProvider>
      )}
    </>
  );
};

export default LaunchPlansAndRatesGrid;
