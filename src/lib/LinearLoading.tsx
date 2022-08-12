import React, { FC } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';

const LinearLoading: FC<{}> = () => (
  <LinearProgress color="secondary" className="loading" />
);

export default LinearLoading;
