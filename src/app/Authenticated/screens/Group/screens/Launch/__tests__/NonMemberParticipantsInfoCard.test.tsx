/* eslint-disable no-param-reassign */
import React from 'react';
import { act, screen } from '@testing-library/react';
import render from 'utils/testing/render';
import createMSWRestServer from 'utils/testing/createMSWRestServer';
import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';
import { mockFetchData, mockFetchFail } from 'utils/testing/mockFetch';
import NonMemberParticipantsInfoCard from '../screens/Gsp/components/NonMemberParticipantsInfoCard';

const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => {
  client.resetStore();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

describe('GSP page tests - info cards', () => {
  test('renders NonMemberParticipantsInfoCard with no planId, no results to display', async () => {
    act(() => {
      // no need to await this call to act, not a promise
      render(<NonMemberParticipantsInfoCard title="Test title" />);
    });
    expect(await screen.findByText(/^Test title$/i)).toBeInTheDocument();
    expect(await screen.queryByText(/^Yes$/i)).not.toBeInTheDocument();
    expect(await screen.queryByText(/^No$/i)).not.toBeInTheDocument();
    expect(
      await screen.findByText(/^No results to display$/i)
    ).toBeInTheDocument();
  });

  test('renders NonMemberParticipantsInfoCard with planId and loads questions, yes to non-member question', async () => {
    mockFetchData({
      planId: 123456,
      questions: [
        {
          question: 'are there any non-member participants?',
          answer: 'Yes',
        },
      ],
    });

    await act(async () => {
      render(
        <NonMemberParticipantsInfoCard title="Test title" planId={123456} />
      );
    });
    expect(await screen.findByText(/^Test title$/i)).toBeInTheDocument();
    expect(await screen.findByText(/^Yes$/i)).toBeInTheDocument();
    expect(await screen.queryByText(/^No$/i)).not.toBeInTheDocument();
    expect(
      await screen.queryByText(/^No results to display$/i)
    ).not.toBeInTheDocument();
  });

  test('renders NonMemberParticipantsInfoCard with planId and loads questions, no to non-member question', async () => {
    mockFetchData({
      planId: 123457,
      questions: [
        {
          question: 'are there any non-member participants?',
          answer: 'No',
        },
      ],
    });

    await act(async () => {
      render(
        <NonMemberParticipantsInfoCard title="Test title" planId={123457} />
      );
    });
    expect(await screen.findByText(/^Test title$/i)).toBeInTheDocument();
    expect(await screen.findByText(/^No$/i)).toBeInTheDocument();
    expect(await screen.queryByText(/^Yes$/i)).not.toBeInTheDocument();
    expect(
      await screen.queryByText(/^No results to display$/i)
    ).not.toBeInTheDocument();
  });

  test('renders NonMemberParticipantsInfoCard with planId and loads questions, http request fails', async () => {
    mockFetchFail();

    await act(async () => {
      render(
        <NonMemberParticipantsInfoCard title="Test title" planId={123457} />
      );
    });
    expect(await screen.queryByText(/^Test title$/i)).not.toBeInTheDocument();
    expect(await screen.queryByText(/^No$/i)).not.toBeInTheDocument();
    expect(await screen.queryByText(/^Yes$/i)).not.toBeInTheDocument();
    expect(
      await screen.queryByText(/^No results to display$/i)
    ).not.toBeInTheDocument();
  });
});
