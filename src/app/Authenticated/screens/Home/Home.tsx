import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import useLocalStorage from 'app/Authenticated/shared/useLocalStorageState';
import LinearLoading from 'lib/LinearLoading';

const Home: FC<{}> = () => {
  const navigate = useNavigate();

  const [latestGroupId] = useLocalStorage('latestGroupId');

  useEffect(() => {
    if (latestGroupId) {
      navigate(`groups/${latestGroupId}`);
    }
  });

  if (latestGroupId) {
    return <LinearLoading />;
  }

  return (
    <div>
      <Typography>
        Home Page Not Implemented - Please Navigate to a valid group
      </Typography>
    </div>
  );
};

export default Home;
