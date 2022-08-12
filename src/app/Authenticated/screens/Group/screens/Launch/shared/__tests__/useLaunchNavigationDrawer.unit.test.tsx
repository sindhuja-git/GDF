import React, { FC, ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import {
  LaunchNavigationDrawerValueContext,
  LaunchNavigationDrawerSetContext,
} from '../../components/LaunchLayoutProvider/context/LaunchNavigationDrawerContextProvider';
import useLaunchNavigationDrawer from '../useLaunchNavigationDrawer';

// Since this is a component for resue it is worthwhile testing. Plus, I need to test negative conditions
describe('useLaunchNavigationDrawer tests', () => {
  type WrapperProps = {
    children: ReactNode;
  };
  const mockSetState = jest.fn();

  beforeEach(() => {
    mockSetState.mockReset();
  });

  const validWrapper: FC<WrapperProps> = ({ children }) => {
    return (
      <LaunchNavigationDrawerValueContext.Provider value>
        <LaunchNavigationDrawerSetContext.Provider value={mockSetState}>
          {children}
        </LaunchNavigationDrawerSetContext.Provider>
      </LaunchNavigationDrawerValueContext.Provider>
    );
  };

  test('When hook is not wrapped around LaunchNavigationDrawerValueContext, throw meaningful error', () => {
    const setContextWrapper: FC<WrapperProps> = ({ children }) => {
      return (
        <LaunchNavigationDrawerSetContext.Provider value={mockSetState}>
          {children}
        </LaunchNavigationDrawerSetContext.Provider>
      );
    };
    const { result } = renderHook(() => useLaunchNavigationDrawer(), {
      wrapper: setContextWrapper,
    });

    expect(result.error).toEqual(
      new Error(
        'useLaunchNavigationDrawer must be wrapped inside LaunchNavigationDrawerValueContext'
      )
    );
  });

  test('When hook is not wrapped around LaunchNavigationDrawerSetContext, throw meaningful error', () => {
    const setContextWrapper: FC<WrapperProps> = ({ children }) => {
      return (
        <LaunchNavigationDrawerValueContext.Provider value>
          {children}
        </LaunchNavigationDrawerValueContext.Provider>
      );
    };
    const { result } = renderHook(() => useLaunchNavigationDrawer(), {
      wrapper: setContextWrapper,
    });

    expect(result.error).toEqual(
      new Error(
        'useLaunchNavigationDrawer must be wrapped inside LaunchNavigationDrawerSetContext'
      )
    );
  });

  test('When on valid wrapper returns expected payload', () => {
    const { result } = renderHook(() => useLaunchNavigationDrawer(), {
      wrapper: validWrapper,
    });

    expect(result.current).toEqual({
      open: true,
      setOpen: mockSetState,
      toggleOpen: expect.any(Function),
    });
  });

  test('toggleOpen gets called correctly', () => {
    const { result } = renderHook(() => useLaunchNavigationDrawer(), {
      wrapper: validWrapper,
    });

    result.current.toggleOpen();

    // Using setState callback
    expect(mockSetState).toHaveBeenCalled();
    expect(mockSetState).toHaveBeenCalledWith(expect.any(Function));
  });
});
