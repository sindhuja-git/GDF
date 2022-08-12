import React from 'react';
import { render, screen } from '@testing-library/react';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import PortalHeader from '../components/PortalHeader';

jest.mock('@material-ui/core/useMediaQuery', () => jest.fn());

const mockUseMediaQuery = useMediaQuery as jest.Mock;

describe('PortalHeader tests', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockImplementationOnce(() => false);
  });

  afterEach(() => {
    mockUseMediaQuery.mockReset();
  });

  test('Renders default logo. Validate redirect url. No version', () => {
    render(<PortalHeader appName="Test App" environment="test3" />);

    // Environment renders
    expect(screen.getByText(/test3/i)).toBeInTheDocument();

    // Validate HpLogo Url
    const hpLogo = screen.getByTitle(/healthpartners/i);
    expect(hpLogo).toBeInTheDocument();

    // No version
    expect(screen.queryByText(/v /i)).not.toBeInTheDocument();
  });

  test('When environment is dev. Validate redirect url to dev1.', () => {
    render(<PortalHeader appName="Test App" environment="dev" />);

    // Environment renders
    expect(screen.getByText(/dev$/i)).toBeInTheDocument();

    // Validate HpLogo Url
    const hpLogo = screen.getByTitle(/healthpartners/i);
    expect(hpLogo).toBeInTheDocument();
  });

  test('When environment is local. Validate redirect url to dev1.', () => {
    render(<PortalHeader appName="Test App" environment="local" />);

    // Environment renders
    expect(screen.getByText(/local$/i)).toBeInTheDocument();

    // Validate HpLogo Url
    const hpLogo = screen.getByTitle(/healthpartners/i);
    expect(hpLogo).toBeInTheDocument();
  });

  test('When version is passed. Expect "v " to be prepended', () => {
    render(
      <PortalHeader appName="Test App" environment="test" version="1.0.0" />
    );

    expect(screen.getByText(/v 1.0.0/i)).toBeInTheDocument();
  });

  test('When useMediaQuery matches md+. Render enviroment', () => {
    mockUseMediaQuery.mockReset();
    mockUseMediaQuery.mockImplementationOnce(() => true);

    render(
      <PortalHeader appName="Test App" environment="test" version="1.0.0" />
    );

    expect(screen.getByText(/environment:/i)).toBeInTheDocument();
  });

  test('When useMediaQuery matches md+. Render ENV', () => {
    mockUseMediaQuery.mockReset();
    mockUseMediaQuery.mockImplementationOnce(() => false);

    render(
      <PortalHeader appName="Test App" environment="test" version="1.0.0" />
    );

    expect(screen.getByText(/env:/i)).toBeInTheDocument();
  });

  test('When control is passed. Expect render', () => {
    render(
      <PortalHeader
        appName="Test App"
        environment="test"
        controls="Controls Rendered"
      />
    );

    expect(screen.getByText(/controls rendered/i)).toBeInTheDocument();
  });
});
