/* eslint-disable no-param-reassign */
import React from 'react';
import { act, screen } from '@testing-library/react';
import render from 'utils/testing/render';
import LaunchComponentLink, {
  validOrEmpty,
  getLinkUrl,
} from '../screens/shared/LaunchComponentLink';

let windowSpy: jest.SpyInstance;

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'location', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('LaunchComponentLink component render tests', () => {
  test('renders LaunchComponentLink - plans', async () => {
    windowSpy.mockImplementation(() => ({
      pathname: 'zero/one/two/three/four',
    }));
    act(() => {
      render(<LaunchComponentLink isPlansLink />);
    });
    expect(await screen.findByText(/^Plans$/i)).toBeInTheDocument();
  });

  test('renders LaunchComponentLink - rates', async () => {
    windowSpy.mockImplementation(() => ({
      pathname: 'zero/one/two/three/four',
    }));
    act(() => {
      render(<LaunchComponentLink />);
    });
    expect(await screen.findByText(/^Rates$/i)).toBeInTheDocument();
  });
});

describe('LaunchComponentLink utility function tests', () => {
  test('validOrEmpty - valid', () => {
    expect(validOrEmpty('thisIsATest', /^[a-zA-Z]+$/)).toBe('thisIsATest');
  });

  test('validOrEmpty - invalid', () => {
    expect(validOrEmpty('thisIsATest', /^[a-z]+$/)).toBe('');
  });

  test('getLinkUrl - plans', () => {
    expect(
      getLinkUrl(
        [
          'zero',
          'one',
          '5ec88b39-1a28-4655-9464-2aadd333c2a3',
          'three',
          '123456789',
        ],
        true
      )
    ).toBe(
      '/groups/5ec88b39-1a28-4655-9464-2aadd333c2a3/launches/123456789/plans'
    );
  });

  test('getLinkUrl - rates', () => {
    expect(
      getLinkUrl(
        [
          'zero',
          'one',
          '5ec88b39-1a28-4655-9464-2aadd333c2a3',
          'three',
          '123456789',
        ],
        false
      )
    ).toBe(
      '/groups/5ec88b39-1a28-4655-9464-2aadd333c2a3/launches/123456789/rates'
    );
  });

  test('getLinkUrl - invalid', () => {
    expect(
      getLinkUrl(
        ['zero', 'one', 'invalid uuid', 'three', 'invalid launchId'],
        true
      )
    ).toBe('/groups//launches//plans');
  });
});
