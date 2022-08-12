import React, { ReactNode } from 'react';
import { MemoryRouter, Routes } from 'react-router-dom';
import { MemoryRouterProps } from 'react-router';
import {
  render as testingLibraryRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';

import { AuthenticatedAppProvider } from 'app/Authenticated/components/AuthenticatedAppProvider';
import { AppLayoutProvider } from 'app/components/AppLayoutProvider';

interface IRenderOptions extends RenderOptions {
  routerProps?: MemoryRouterProps;
}

function render(ui: ReactNode, options?: IRenderOptions): RenderResult {
  const { routerProps, ...otherOptions } = options ?? {};

  return testingLibraryRender(
    <AppLayoutProvider>
      <AuthenticatedAppProvider>
        <MemoryRouter {...routerProps}>
          <Routes>{ui}</Routes>
        </MemoryRouter>
      </AuthenticatedAppProvider>
    </AppLayoutProvider>,
    otherOptions
  );
}

export default render;
