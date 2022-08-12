import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemContainer from 'app/components/shared/ListItemContainer';
import ListItemGrid from 'app/components/shared/ListItemGrid';
import SectionHeaderContainer from 'app/components/shared/SectionHeaderContainer';

export type ItemProps = {
  planInfo: any;
};
const LaunchPcdInfo: FC<ItemProps> = (props) => {
  const { planInfo } = props;
  const { packageInfos } = planInfo;
  return (
    <>
      <Grid container direction="column">
        <SectionHeaderContainer header="PCD Info" />
        <ListItemGrid>
          <Grid item xs={3}>
            <ListItemContainer
              header="Package Code"
              value={packageInfos[0]?.pcd?.pkg?.code?.gdfValue || ''}
              backgroundHighlight={
                packageInfos[0]?.pcd?.pkg?.code?.compareStatus === 'NOT_EQUAL'
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemContainer
              header="Delivery Network"
              value={
                packageInfos[0]?.pcd?.deliveryNetwork?.code?.gdfValue
                  ? `${packageInfos[0]?.pcd?.deliveryNetwork?.code?.gdfValue} - ${packageInfos[0]?.pcd?.deliveryNetwork?.name?.gdfValue}`
                  : '' || ''
              }
              backgroundHighlight={
                packageInfos[0]?.pcd?.deliveryNetwork?.compareStatus ===
                'NOT_EQUAL'
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemContainer
              header="Funding Type"
              value={
                packageInfos[0]?.pcd?.product?.fundingType?.name?.gdfValue || ''
              }
              backgroundHighlight={
                packageInfos[0]?.pcd?.product?.fundingType?.compareStatus ===
                'NOT_EQUAL'
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemContainer
              header="Corporation"
              value={
                packageInfos[0]?.pcd?.product?.corporation?.name?.gdfValue || ''
              }
              backgroundHighlight={
                packageInfos[0]?.pcd?.product?.corporation?.compareStatus ===
                'NOT_EQUAL'
              }
            />
          </Grid>
        </ListItemGrid>
      </Grid>
    </>
  );
};

export default LaunchPcdInfo;
