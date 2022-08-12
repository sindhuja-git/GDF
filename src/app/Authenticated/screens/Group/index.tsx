import React, { FC, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import NotFound from 'lib/NotFound';
import useLocalStorage from 'app/Authenticated/shared/useLocalStorageState';

import { GroupLaunchRedirect } from './screens/GroupLaunchRedirect';
import Launch from './screens/Launch';

/**
 * This component will be a placeholder as first release won't support more than Launch level info.
 * Eventually we may have filtering on lists of Launchs or search features.
 */
const Group: FC<{}> = () => {
  const { groupId } = useParams();
  const [, setLatestGroupId] = useLocalStorage('latestGroupId');

  useEffect(() => {
    setLatestGroupId(groupId);
  }, [groupId, setLatestGroupId]);

  return (
    <Routes>
      <Route path="/" element={<GroupLaunchRedirect />} />
      <Route path="launches/:launchId/*" element={<Launch />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Group;
