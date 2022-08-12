import React, { FC, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import useLaunchFormattedParams from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';

import ListItemGrid from 'app/components/shared/ListItemGrid';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import { getGroupPrintTechData } from 'app/api-urls';
import useApiCall from '../../../shared/useApiCall';
import { FetchStates } from '../../../shared/constants';

export type Info = {
  compareStatus: string;
  gdfValue: string | boolean;
  gsuValue: string;
};

export type InfoItem = {
  code: Info;
  name: Info;
  compareStatus: string;
};

export type LaunchPrintTechItem = {
  sbcDistribution: InfoItem;
  contractSpdFulfillment: InfoItem;
  isPublicEntity: Info;
  erisa: Info;
};

const infoItem: Info = {
  compareStatus: '',
  gdfValue: '',
  gsuValue: '',
};

const initialInfoItem: InfoItem = {
  code: infoItem,
  name: infoItem,
  compareStatus: '',
};

const initialState: LaunchPrintTechItem = {
  sbcDistribution: initialInfoItem,
  contractSpdFulfillment: initialInfoItem,
  isPublicEntity: infoItem,
  erisa: infoItem,
};

export type BasicProps = {
  load?: boolean;
  err?: boolean;
};

const LaunchPrintTechInfo: FC<BasicProps> = () => {
  const { groupId, launchId } = useLaunchFormattedParams();

  const {
    currentState: groupPrintTechInfoCallState,
    response: groupPrintTechInfo = initialState,
    makeApiCall: makeGroupPrintTechInfoCall,
  } = useApiCall({
    url: getGroupPrintTechData(groupId, launchId),
    type: 'json',
  });

  useEffect(() => {
    if (groupPrintTechInfoCallState === FetchStates.NOT_YET_CALLED) {
      makeGroupPrintTechInfoCall();
    }
  }, [groupPrintTechInfoCallState, makeGroupPrintTechInfoCall]);

  return (
    <>
      {groupPrintTechInfoCallState === FetchStates.PENDING && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
      {groupPrintTechInfoCallState !== FetchStates.NOT_YET_CALLED &&
        groupPrintTechInfoCallState !== FetchStates.ERROR && (
          <Grid container item>
            <SectionHeaderContainer header="Print Tech Fulfillment" />
            <ListItemGrid>
              <Grid item xs={2}>
                <ListItemContainer
                  valueId="contract-spd-value"
                  id="contract-spd-info"
                  header="Contract/SPD FulFillment"
                  value={`${groupPrintTechInfo?.contractSpdFulfillment?.name?.gdfValue}`}
                  backgroundHighlight={
                    groupPrintTechInfo?.contractSpdFulfillment
                      ?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemContainer
                  valueId="sbc-by-hp-value"
                  id="sbc-by-hp-info"
                  header="SBC Distributed by HP?"
                  value={`${groupPrintTechInfo?.sbcDistribution?.name?.gdfValue}`}
                  backgroundHighlight={
                    groupPrintTechInfo?.sbcDistribution?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <ListItemContainer
                  valueId="public-entity-value"
                  id="public-entity-info"
                  header="Public Entity?"
                  referentialData
                  value={
                    groupPrintTechInfo?.isPublicEntity?.gdfValue === true
                      ? 'Yes'
                      : 'No'
                  }
                  backgroundHighlight={
                    groupPrintTechInfo?.isPublicEntity?.compareStatus ===
                    'NOT_EQUAL'
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <ListItemContainer
                  valueId="erisa-value"
                  id="erisa-info"
                  header="ERISA?"
                  value={
                    groupPrintTechInfo?.erisa?.gdfValue === true ? 'Yes' : 'No'
                  }
                  backgroundHighlight={
                    groupPrintTechInfo?.erisa?.compareStatus === 'NOT_EQUAL'
                  }
                />
              </Grid>
            </ListItemGrid>
          </Grid>
        )}
    </>
  );
};

export default LaunchPrintTechInfo;
