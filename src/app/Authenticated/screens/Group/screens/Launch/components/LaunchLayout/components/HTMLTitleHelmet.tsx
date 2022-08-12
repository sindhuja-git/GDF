import React, { FC, memo } from 'react';
import { Helmet } from 'react-helmet-async';

import useLaunchTitle from 'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchTitle';

interface HTMLTitleHelmetProps {
  groupNumber?: number;
}

const HTMLTitleHelmet: FC<HTMLTitleHelmetProps> = memo(({ groupNumber }) => {
  const { title } = useLaunchTitle();

  const groupNumberString = groupNumber ?? '';

  return (
    <Helmet>
      <title>{`${title} - ${groupNumberString}`}</title>
    </Helmet>
  );
});

export default HTMLTitleHelmet;
