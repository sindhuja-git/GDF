import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import NotFound from 'lib/NotFound';
import { AuthenticatedAppProvider } from './components/AuthenticatedAppProvider';

import { Home } from './screens/Home';
import Group from './screens/Group';

const AuthenticatedApp = () => {
  return (
    <AuthenticatedAppProvider>
      <BrowserRouter>
        <Helmet titleTemplate="%s | GDF Viewer | HealthPartners" />
        <Routes>
          {/**
           * We are not creating the groups level indirection since at phase 1 we are only supporting Group level data.
           * If we ever require groups, plural, screens such as filtering by Launch type. We should declare a new screen Groups with routing
           * and add a level of indirection before we get to the Group component.
           * You should NOT keep adding group level routes here as you want to take advantage Route embedding and declarations.
           *
           * Adding the placeholder now creates unnecessary indirection which may never be used.
           */}
          <Route path="" element={<Home />} />
          <Route path="groups/:groupId/*" element={<Group />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthenticatedAppProvider>
  );
};

export default AuthenticatedApp;
