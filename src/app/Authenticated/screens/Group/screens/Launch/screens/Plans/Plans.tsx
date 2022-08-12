import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import useSetLaunchTitle from 'app/Authenticated/screens/Group/screens/Launch/shared/useSetLaunchTitle';
import { selectMacPlanSummary } from '../../../../../../../Ducks/PlanSummary/selectors';
import LaunchPlansAndRatesGrid from '../PlansAndRates/components/LaunchPlansAndRatesGrid';

const Plans: FC<{}> = () => {
  useSetLaunchTitle('Plans (MAC Plan Summary)');
  const planSummaryInfo = useSelector(selectMacPlanSummary);
  return (
    <LaunchPlansAndRatesGrid
      planRateSummaryInfo={planSummaryInfo}
      type="Plans"
    />
  );
};

export default Plans;
