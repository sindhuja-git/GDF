/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';
import { mockFetchData } from 'utils/testing/mockFetch';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';

import { launchReferentialEligilityDataBuilder } from 'utils/testing/dataBuilders';
import LaunchReferentialEligibilityData from 'app/Authenticated/screens/Group/screens/Launch/screens/PlansInfo/components/LaunchReferentialEligibilityData';

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('Launch referential eligilibility info page tests', () => {
  it('renders Launch referential eligilibility page - true cases ', async () => {
    const mockData = launchReferentialEligilityDataBuilder();
    mockData.id = 1;
    mockData.doubleCoverageInSameGroupAllowed = true;
    mockData.retireeEligibility = true;
    const testCommentText = 'test comment text';
    mockData.comments[0].text = testCommentText;
    mockFetchData([mockData]);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<LaunchReferentialEligibilityData ruleId="1" />);
    });

    expect(
      await screen.findByText(/Retroactive Member Termination Period/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Describe Non-standard Termination Period?/i)
    ).toBeInTheDocument();

    expect(await screen.findByText(/Comments/i)).toBeInTheDocument();
    expect(await screen.findByText(testCommentText)).toBeInTheDocument();
    expect(
      await screen.findByText(/Effective Date of Eligibility Rule/i)
    ).toBeInTheDocument();

    expect(await screen.findByText(/Funding Type/i)).toBeInTheDocument();
    expect(await screen.findByText(/Issuing State/i)).toBeInTheDocument();

    expect(
      await screen.findByText('Active Eligibile Employee Definition Code')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Active Eligibile Employee Definition')
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Employee Excluded from Coverage Code/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Employee Excluded from Coverage Definition/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        /Does HealthPartners Verify Student Eligibility?/i
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Does HealthPartners Verify Disabled Dependents?/i
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Is Double Coverage in the Same Group Allowed?/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Late Enrollment Applies (For Medical Only)')
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Are Retirees Eligible?/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/If Yes, Definition of Retiree/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Rehire Notes/i)).toBeInTheDocument();

    expect(await screen.queryAllByText('Yes').length).toBe(2);
    expect(await screen.queryAllByText('No').length).toBe(1);
  });

  it('renders Launch referential eligilibility page - false cases ', async () => {
    const mockData = launchReferentialEligilityDataBuilder();
    mockData.id = 1;
    mockData.effectiveFromDate = undefined;
    mockData.doubleCoverageInSameGroupAllowed = false;
    mockData.retireeEligibility = false;
    mockData.earlyRetireeEligibility = false;

    mockFetchData([mockData]);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<LaunchReferentialEligibilityData ruleId="1" />);
    });

    expect(await screen.queryAllByText('Yes').length).toBe(0);
    expect(await screen.queryAllByText('No').length).toBe(3);
  });
});
