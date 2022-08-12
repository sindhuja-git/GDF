import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import LinearLoading from 'lib/LinearLoading';

const GET_LATEST_LAUNCH = gql`
  query GetLatestLaunch($groupId: String!) {
    group(id: $groupId) {
      id
      launches(latest: true) {
        id
      }
    }
  }
`;

type LatestLaunchQuery = {
  group: {
    id: string;
    launches: [
      {
        id: number;
      }?
    ];
  };
};

/**
 * As this screen is basically just a redirect component. We are treating it as a screen because of our path definition.
 * This screen will be tested directly in the Group Screen.
 */
const GroupLaunchRedirect: FC<{}> = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const { loading, error, data } = useQuery<LatestLaunchQuery>(
    GET_LATEST_LAUNCH,
    {
      variables: { groupId },
    }
  );

  const launches = data?.group?.launches;

  useEffect(() => {
    if (!loading && !error && launches && launches.length > 0) {
      // @ts-ignore
      const [{ id: latestLaunch }] = launches;

      navigate(`launches/${latestLaunch}`, { replace: true });
    }
  }, [navigate, loading, error, launches]);

  /**
   * ! Return no launch found if length === 0
   */
  if (!loading && !error && data) {
    if (launches?.length === 0) {
      return <div>This Group has no launches</div>;
    }
  }

  if (error) {
    return <div>{`Unable to find latest launch: ${error}`}</div>;
  }
  return <LinearLoading />;
};

export default GroupLaunchRedirect;
