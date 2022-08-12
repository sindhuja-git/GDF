import React from 'react';
import { Route } from 'react-router-dom';
import { screen } from '@testing-library/react';

import render from '../render';

const ComponentA = () => <div>Component A!</div>;
const ComponentB = () => <div>Component B!</div>;

const RoutingComponent = () => (
  <>
    <Route path="a" element={<ComponentA />} />
    <Route path="b" element={<ComponentB />} />
  </>
);

test('Will render component A. Does not belong inside a route', () => {
  render(<ComponentA />);

  expect(screen.getByText(/component a!/i)).toBeInTheDocument();
});

test('Will render component B when asked by routing', () => {
  render(<Route path="routing/*" element={<RoutingComponent />} />, {
    routerProps: {
      initialEntries: ['/routing/b'],
    },
  });

  expect(screen.getByText(/component b!/i)).toBeInTheDocument();
});
