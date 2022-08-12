import React from 'react';
import { screen, render } from '@testing-library/react';

import App from 'app';
import Auth from 'utils/auth/legacy/Auth';
import 'app/Authenticated/screens/Group';

/**
 * Don't want to render all of demographic as it would made it very expensive. We are intercepting.
 */
jest.mock('app/Authenticated/screens/Group', () => () => <div>Group Mock</div>);

/**
 * Auth is already a mocked class. It is mocked in setupTests.js
 */
const mockAuthInitialize = Auth.initialize as jest.Mock;

describe('App tests', () => {
  beforeEach(() => {
    mockAuthInitialize.mockReset();
  });

  test('when first rendered and Auth call is not redirected. Render pending', async () => {
    mockAuthInitialize.mockImplementationOnce(() => {});

    const { container } = render(<App />);

    expect(container.querySelector('.loading')).toBeInTheDocument();
  });

  test('when initalized calls onAuthSuccess if no localStorage cookie then redirect to home page missing', async () => {
    mockAuthInitialize.mockImplementationOnce(({ onAuthSuccess }) => {
      onAuthSuccess();
    });

    expect(localStorage.getItem('latestGroupId')).toBe(null);

    render(<App />);

    expect(
      await screen.findByText(/home page not implemented/i)
    ).toBeInTheDocument();
  });

  test('when initalized calls onAuthSuccess if redirected to home page and latestGroupId redirect to Group', async () => {
    mockAuthInitialize.mockImplementationOnce(({ onAuthSuccess }) => {
      onAuthSuccess();
    });

    // Set localStorage
    localStorage.setItem('latestGroupId', JSON.stringify('groupId'));

    render(<App />);

    expect(await screen.findByText(/Group Mock/i)).toBeInTheDocument();
  });

  test('when initalized calls onAuthError expect authStatus = Authenticated', async () => {
    mockAuthInitialize.mockImplementationOnce(({ onAuthError }) => {
      onAuthError();
    });

    render(<App />);

    expect(await screen.findByText(/Unauthenticated/i)).toBeInTheDocument();
  });
});
