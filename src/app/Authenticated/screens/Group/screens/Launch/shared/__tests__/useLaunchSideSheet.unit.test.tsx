import React, { FC, ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import {
  LaunchSideSheetValueContext,
  LaunchSideSheetDispatchContext,
  SideSheetTab,
} from '../../components/LaunchLayoutProvider/context/LaunchSideSheetContextProvider';
import useLaunchSideSheet from '../useLaunchSideSheet';

// Since this is a component for resue it is worthwhile testing. Plus, I need to test negative conditions
describe('useLaunchSideSheet tests', () => {
  type WrapperProps = {
    children: ReactNode;
  };
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockDispatch.mockReset();
  });

  const generateWrapper = (initialValue: SideSheetTab | null) => ({
    children,
  }: WrapperProps) => {
    return (
      <LaunchSideSheetValueContext.Provider value={initialValue}>
        <LaunchSideSheetDispatchContext.Provider value={mockDispatch}>
          {children}
        </LaunchSideSheetDispatchContext.Provider>
      </LaunchSideSheetValueContext.Provider>
    );
  };

  test('When hook is not wrapped around LaunchSideSheetValueContext, throw meaningful error', () => {
    const setContextWrapper: FC<WrapperProps> = ({ children }) => {
      return (
        <LaunchSideSheetDispatchContext.Provider value={mockDispatch}>
          {children}
        </LaunchSideSheetDispatchContext.Provider>
      );
    };
    const { result } = renderHook(() => useLaunchSideSheet(), {
      wrapper: setContextWrapper,
    });

    expect(result.error).toEqual(
      new Error(
        'useLaunchSideSheet must be wrapped inside LaunchSideSheetValueContext'
      )
    );
  });

  test('When hook is not wrapped around LaunchSideSheetDispatchContext, throw meaningful error', () => {
    const setContextWrapper: FC<WrapperProps> = ({ children }) => {
      return (
        <LaunchSideSheetValueContext.Provider value={null}>
          {children}
        </LaunchSideSheetValueContext.Provider>
      );
    };
    const { result } = renderHook(() => useLaunchSideSheet(), {
      wrapper: setContextWrapper,
    });

    expect(result.error).toEqual(
      new Error(
        'useLaunchSideSheet must be wrapped inside LaunchSideSheetDispatchContext'
      )
    );
  });

  test('When value is null, return open as false', () => {
    const wrapper = generateWrapper(null);

    const { result } = renderHook(() => useLaunchSideSheet(), {
      wrapper,
    });

    expect(result.current).toEqual({
      open: false,
      dispatch: mockDispatch,
      sideSheet: null,
    });
  });

  test('When value is valid sideSheet, return open as true', () => {
    const wrapper = generateWrapper(SideSheetTab.Files);

    const { result } = renderHook(() => useLaunchSideSheet(), {
      wrapper,
    });

    expect(result.current).toEqual({
      open: true,
      dispatch: mockDispatch,
      sideSheet: SideSheetTab.Files,
    });
  });
});
