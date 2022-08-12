import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from 'lib/NotFound';
import { LaunchLayoutProvider } from './components/LaunchLayoutProvider';
import { LaunchLayout } from './components/LaunchLayout';

import { Demographics } from './screens/Demographics';
import { Contacts } from './screens/Contacts';
import { Sites } from './screens/Sites';
import { Plans } from './screens/Plans';
import { PlansInfo } from './screens/PlansInfo';
import { PlansInfoNew } from './screens/PlansInfoNew';
import { RateInfo } from './screens/RateInfo';
import { Gsp } from './screens/Gsp';
import { Rates } from './screens/Rates';

/**
 * This component will be a placeholder as first release won't support more than Launch level info.
 * Eventually we may have filtering on lists of Launchs or search features.
 */
const Launch: FC<{}> = () => {
  return (
    <LaunchLayoutProvider>
      <LaunchLayout>
        <Routes>
          <Route path="" element={<Demographics />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/gsp" element={<Gsp />} />
          <Route path="/rates" element={<Rates />} />
          <Route
            path="/plans/plansInfo/:planId/packageCode/:packageCode"
            element={<PlansInfo />}
          />
          <Route
            path="/plans/plansInfo/:planId/packageCode"
            element={<PlansInfo />}
          />
          <Route
            path="/plans/newPlansInfo/:planId/packageCode/:packageCode"
            element={<PlansInfoNew />}
          />
          <Route
            path="/plans/newPlansInfo/:planId/packageCode"
            element={<PlansInfoNew />}
          />
          <Route
            path="/rates/rateInfo/:planId/packageCode/:packageCode"
            element={<RateInfo />}
          />
          <Route
            path="/rates/rateInfo/:planId/packageCode"
            element={<RateInfo />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LaunchLayout>
    </LaunchLayoutProvider>
  );
};

export default Launch;
