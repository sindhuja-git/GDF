import React, { FC, forwardRef, useEffect, useMemo, useState } from 'react';
import {
  Link,
  LinkProps,
  useLocation,
  useResolvedPath,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  DRAWER_WIDTH_MULTIPLIER,
  FetchStates,
} from 'app/Authenticated/screens/Group/screens/Launch/shared/constants';
import useLaunchNavigationDrawer from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchNavigationDrawer';
import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import WarningIcon from '@mui/icons-material/Warning';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ReportIcon from '@mui/icons-material/Report';
import {
  getContactsSummaryData,
  getDemographicsSummaryData,
  getFeatureFlag,
  getGspAssociationsSummaryData,
  getPlansSummaryData,
  getRatesSummaryData,
  getSitesSummaryData,
} from 'app/api-urls';
import {
  selectMacPlanSummary,
  selectRatesSummary,
} from 'app/Ducks/PlanSummary/selectors';
import { getPlanSummary, getRatesSummary } from 'app/Ducks/PlanSummary/actions';
import useApiCall from '../../../shared/useApiCall';

interface ListItemLinkProps {
  id: string;
  primary: string;
  to: string;
  end?: boolean;
  warningIconOverride?: boolean;
  compareStatus?: string;
  load: boolean;
  err: boolean;
}

const useIconStyles = makeStyles((theme: Theme) => {
  return createStyles({
    icon: {
      color: theme.palette.warning.main,
    },
    error: {
      color: '#d91535',
    },
    errorText: {
      marginTop: '2px',
    },
  });
});

const ListItemNavLink: FC<ListItemLinkProps> = ({
  primary,
  id,
  to,
  end = false,
  warningIconOverride = false,
  compareStatus,
  load = true,
  err = false,
}) => {
  const classes = useIconStyles();

  const { pathname: locationPathname } = useLocation();
  const { pathname: toPathname } = useResolvedPath(to);

  const isActive = end
    ? locationPathname === toPathname
    : locationPathname.startsWith(toPathname);

  const renderLink = useMemo(
    () =>
      forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem
        button
        id={id}
        selected={isActive}
        component={renderLink}
        aria-current={isActive}
      >
        <ListItemText primary={primary} />
        {load && (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress color="inherit" />
            </Grid>
          </Grid>
        )}
        {!load &&
          !err &&
          (compareStatus === 'NOT_EQUAL' || warningIconOverride) && (
            <Tooltip title="Needs Review">
              <ListItemIcon
                className={classes.icon}
                id={`icon-warning-${primary}`}
              >
                <WarningIcon />
              </ListItemIcon>
            </Tooltip>
          )}

        {/* If comparestatus is ONLY_IN_GDF or (NOT_COMPARABLE and is not rates), show red amber icon */}
        {!load &&
          !err &&
          (compareStatus === 'ONLY_IN_GDF' ||
            (compareStatus === 'NOT_COMPARABLE' && primary !== 'Rates')) && (
            <ListItemIcon className={classes.icon}>
              <WarningAmberIcon
                className={classes.error}
                id={`icon-amber-warning-${primary}`}
              />
            </ListItemIcon>
          )}

        {/* If it is a rates tab and comparestatus is NOT_COMPARABLE(which means there are comments then show stop sign) */}
        {!load &&
          !err &&
          compareStatus === 'NOT_COMPARABLE' &&
          primary === 'Rates' && (
            <ListItemIcon className={classes.icon}>
              <ReportIcon
                className={classes.error}
                id={`icon-stop-${primary}`}
              />
            </ListItemIcon>
          )}
      </ListItem>
    </li>
  );
};

const useNavigationDrawerStyles = makeStyles((theme: Theme) => {
  const drawerWidth = theme.spacing(DRAWER_WIDTH_MULTIPLIER);

  return createStyles({
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: theme.spacing(6),
      paddingTop: theme.spacing(6),
    },
  });
});

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchNavigationDrawer: FC<BasicProps> = () => {
  const dispatch = useDispatch();
  const classes = useNavigationDrawerStyles();

  const { open } = useLaunchNavigationDrawer();
  const { groupId, launchId } = useLaunchFormattedParams();
  const [macPlanSummaryLoading, setMacPlanSummaryLoading] = useState(false);

  const {
    currentState: ratesTabFlagCallState,
    response: ratesTabFlag,
    makeApiCall: makeRatesTabFlagCall,
  } = useApiCall({
    url: getFeatureFlag('GDFViewer.RatesTab'),
    type: 'json',
  });

  const {
    currentState: contactsTabFlagCallState,
    response: contactsTabFlag,
    makeApiCall: makeContactsTabFlagCall,
  } = useApiCall({
    url: getFeatureFlag('GDFViewer.ContactsTab'),
    type: 'json',
  });
  const {
    currentState: demographicsSummaryCallState,
    response: demographicsSummaryCallResponse,
    makeApiCall: makeDemographicsSummaryCall,
  } = useApiCall({
    url: getDemographicsSummaryData(groupId, launchId),
    type: 'text',
  });

  const {
    currentState: sitesSummaryCallState,
    response: sitesSummaryCallResponse,
    makeApiCall: makeSitesSummaryCall,
  } = useApiCall({
    url: getSitesSummaryData(groupId, launchId),
    type: 'text',
  });

  const {
    currentState: contactsSummaryCallState,
    response: contactsSummaryCallResponse,
    makeApiCall: makeContactsSummaryCall,
  } = useApiCall({
    url: getContactsSummaryData(groupId, launchId),
    type: 'text',
  });

  const {
    currentState: gspSummaryCallState,
    response: gspSummaryCallResponse,
    makeApiCall: makeGspSummaryCall,
  } = useApiCall({
    url: getGspAssociationsSummaryData(groupId, launchId),
    type: 'text',
  });

  const {
    currentState: plansSummaryCallState,
    response: plansSummaryCallResponse,
    makeApiCall: makePlansSummaryCall,
  } = useApiCall({
    url: getPlansSummaryData(groupId, launchId),
    type: 'text',
  });

  const {
    currentState: ratesSummaryCallState,
    response: ratesSummaryCallResponse,
    makeApiCall: makeRatesSummaryCall,
  } = useApiCall({
    url: getRatesSummaryData(groupId, launchId),
    type: 'text',
  });

  const planSummaryInfo = useSelector(selectMacPlanSummary);
  const ratesSummaryInfo = useSelector(selectRatesSummary);
  useEffect(() => {
    if (planSummaryInfo === undefined && macPlanSummaryLoading === false) {
      dispatch(getPlanSummary(groupId, launchId));
      dispatch(getRatesSummary(groupId, launchId));
      setMacPlanSummaryLoading(true);
    }
    const calls = [
      {
        currentState: ratesTabFlagCallState,
        makeApiCall: makeRatesTabFlagCall,
      },
      {
        currentState: contactsTabFlagCallState,
        makeApiCall: makeContactsTabFlagCall,
      },
      {
        currentState: demographicsSummaryCallState,
        makeApiCall: makeDemographicsSummaryCall,
      },
      {
        currentState: sitesSummaryCallState,
        makeApiCall: makeSitesSummaryCall,
      },
      {
        currentState: contactsSummaryCallState,
        makeApiCall: makeContactsSummaryCall,
      },
      { currentState: gspSummaryCallState, makeApiCall: makeGspSummaryCall },
      {
        currentState: plansSummaryCallState,
        makeApiCall: makePlansSummaryCall,
      },
      {
        currentState: ratesSummaryCallState,
        makeApiCall: makeRatesSummaryCall,
      },
    ];

    calls.forEach(({ currentState, makeApiCall }) => {
      if (currentState === FetchStates.NOT_YET_CALLED) {
        makeApiCall();
      }
    });
  }, [
    ratesTabFlagCallState,
    makeRatesTabFlagCall,
    contactsTabFlagCallState,
    makeContactsTabFlagCall,
    demographicsSummaryCallState,
    makeDemographicsSummaryCall,
    sitesSummaryCallState,
    makeSitesSummaryCall,
    contactsSummaryCallState,
    makeContactsSummaryCall,
    gspSummaryCallState,
    makeGspSummaryCall,
    plansSummaryCallState,
    makePlansSummaryCall,
    ratesSummaryCallState,
    makeRatesSummaryCall,
    dispatch,
    groupId,
    launchId,
    planSummaryInfo,
    ratesSummaryInfo,
    macPlanSummaryLoading,
    setMacPlanSummaryLoading,
  ]);
  return (
    <Drawer
      id="grp-nav-drwr"
      variant="persistent"
      anchor="left"
      open={open}
      aria-expanded={open}
      classes={{ paper: classes.drawerPaper }}
    >
      <nav>
        <List id="nav-ul-list">
          <ListItemNavLink
            to=""
            id="demo-nav-diff"
            primary="Demographics"
            end
            compareStatus={demographicsSummaryCallResponse}
            load={demographicsSummaryCallState === FetchStates.PENDING}
            err={demographicsSummaryCallState === FetchStates.ERROR}
          />
          <ListItemNavLink
            to="sites"
            id="sites-nav-diff"
            primary="Sites"
            compareStatus={sitesSummaryCallResponse}
            load={sitesSummaryCallState === FetchStates.PENDING}
            err={sitesSummaryCallState === FetchStates.ERROR}
          />
          {contactsTabFlag && (
            <ListItemNavLink
              to="contacts"
              id="cntcts-nav-diff"
              primary="Contacts"
              compareStatus={contactsSummaryCallResponse}
              load={contactsSummaryCallState === FetchStates.PENDING}
              err={contactsSummaryCallState === FetchStates.ERROR}
            />
          )}
          {Array.isArray(planSummaryInfo) && planSummaryInfo.length > 0 && (
            <ListItemNavLink
              to="plans"
              id="plans-nav-diff"
              primary="Plans"
              compareStatus={plansSummaryCallResponse}
              load={plansSummaryCallState === FetchStates.PENDING}
              err={plansSummaryCallState === FetchStates.ERROR}
            />
          )}
          <ListItemNavLink
            to="gsp"
            id="gsp-nav-diff"
            primary="GSP"
            compareStatus={gspSummaryCallResponse}
            load={gspSummaryCallState === FetchStates.PENDING}
            err={gspSummaryCallState === FetchStates.ERROR}
          />
          {ratesTabFlag &&
            Array.isArray(ratesSummaryInfo) &&
            ratesSummaryInfo.length > 0 && (
              <ListItemNavLink
                to="rates"
                id="rates-nav-diff"
                primary="Rates"
                warningIconOverride={ratesSummaryCallResponse === 'ONLY_IN_GSU'}
                compareStatus={ratesSummaryCallResponse}
                load={ratesSummaryCallState === FetchStates.PENDING}
                err={ratesSummaryCallState === FetchStates.ERROR}
              />
            )}
        </List>
      </nav>
    </Drawer>
  );
};

export default LaunchNavigationDrawer;
