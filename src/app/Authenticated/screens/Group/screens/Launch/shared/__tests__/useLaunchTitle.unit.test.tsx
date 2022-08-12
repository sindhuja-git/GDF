import React, { FC, ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import {
  LaunchTitleValueContext,
  LaunchTitleSetContext,
} from '../../components/LaunchLayoutProvider/context/LaunchTitleContextProvider';
import useLaunchTitle from '../useLaunchTitle';

// Since this is a component for resue it is worthwhile testing. Plus, I need to test negative conditions
describe('useLaunchTitle tests', () => {
  type WrapperProps = {
    children: ReactNode;
  };
  const mockSetState = jest.fn();

  beforeEach(() => {
    mockSetState.mockReset();
  });

  const validWrapper: FC<WrapperProps> = ({ children }) => {
    return (
      <LaunchTitleValueContext.Provider value="test title">
        <LaunchTitleSetContext.Provider value={mockSetState}>
          {children}
        </LaunchTitleSetContext.Provider>
      </LaunchTitleValueContext.Provider>
    );
  };

  test('When hook is not wrapped around LaunchTitleValueContext, throw meaningful error', () => {
    const setContextWrapper: FC<WrapperProps> = ({ children }) => {
      return (
        <LaunchTitleSetContext.Provider value={mockSetState}>
          {children}
        </LaunchTitleSetContext.Provider>
      );
    };
    const { result } = renderHook(() => useLaunchTitle(), {
      wrapper: setContextWrapper,
    });

    expect(result.error).toEqual(
      new Error('useLaunchTitle must be wrapped inside LaunchTitleValueContext')
    );
  });

  test('When hook is not wrapped around LaunchTitleSetContext, throw meaningful error', () => {
    const setContextWrapper: FC<WrapperProps> = ({ children }) => {
      return (
        <LaunchTitleValueContext.Provider value="">
          {children}
        </LaunchTitleValueContext.Provider>
      );
    };
    const { result } = renderHook(() => useLaunchTitle(), {
      wrapper: setContextWrapper,
    });

    expect(result.error).toEqual(
      new Error('useLaunchTitle must be wrapped inside LaunchTitleSetContext')
    );
  });

  test('When on valid wrapper returns expected payload', () => {
    const { result } = renderHook(() => useLaunchTitle(), {
      wrapper: validWrapper,
    });

    expect(result.current).toEqual({
      title: 'test title',
      setTitle: mockSetState,
    });
  });
});
