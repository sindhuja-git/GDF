import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import useSetLaunchTitle from 'app/Authenticated/screens/Group/screens/Launch/shared/useSetLaunchTitle';
import { selectRatesSummary } from '../../../../../../../Ducks/PlanSummary/selectors';
import LaunchPlansAndRatesGrid from '../PlansAndRates/components/LaunchPlansAndRatesGrid';

const Rates: FC<{}> = () => {
  useSetLaunchTitle('Rates (MAC Plan Summary)');
  const ratesSummaryInfo = useSelector(selectRatesSummary);
  return (
    <LaunchPlansAndRatesGrid
      planRateSummaryInfo={ratesSummaryInfo}
      type="Rates"
    />
  );
};

export default Rates;
