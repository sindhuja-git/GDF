import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

type LaunchFormattedParams<T> = {
  [key in keyof T]: string | number;
};

const useLaunchFormattedParams = () => {
  const params = useParams();
  const { planId, launchId, ...others } = params;
  const launchIdNum = parseInt(launchId, 10);
  const planIdNum = parseInt(planId, 10);

  const data: LaunchFormattedParams<typeof params> = useMemo(
    () => ({
      ...others,
      launchId: launchIdNum,
      planId: planIdNum,
    }),
    [planIdNum, launchIdNum, others]
  );

  return data;
};

export default useLaunchFormattedParams;
