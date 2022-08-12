// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'utils/auth/legacy/Auth';

/**
 * We are mocking the Auth object on all tests as this is managed by foundation. We want to be able to make successful API calls.
 */
jest.mock('utils/auth/legacy/Auth', () => ({
  initialize: jest.fn(),
  authorizationHeader: () => 'token',
}));
jest.setTimeout(30000);
