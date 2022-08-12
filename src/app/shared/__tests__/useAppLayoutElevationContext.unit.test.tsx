import React, { FC, ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import {
  AppLayoutElevationValueContext,
  AppLayoutElevationDispatchContext,
} from 'app/components/AppLayoutProvider';
import useAppLayoutElevationContext from '../useAppLayoutElevationContext';

// Since this is a component for resue it is worthwhile testing. Plus, I need to test negative conditions
describe('useAppLayoutElevationContext tests', () => {
  type WrapperProps = {
    children: ReactNode;
  };
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockDispatch.mockReset();
  });

  const validWrapper: FC<WrapperProps> = ({ children }) => {
    return (
      <AppLayoutElevationValueContext.Provider value={1}>
        <AppLayoutElevationDispatchContext.Provider value={mockDispatch}>
          {children}
        </AppLayoutElevationDispatchContext.Provider>
      </AppLayoutElevationValueContext.Provider>
    );
  };

  test('When hook is not wrapped around AppLayoutElevationValueContext, throw meaningful error', () => {
    const stateWrapper: FC<WrapperProps> = ({ children }) => {
      return (
        <AppLayoutElevationDispatchContext.Provider value={mockDispatch}>
          {children}
        </AppLayoutElevationDispatchContext.Provider>
      );
    };

    const { result } = renderHook(() => useAppLayoutElevationContext(), {
      wrapper: stateWrapper,
    });
    expect(result.error).toEqual(
      new Error(
        'useAppLayoutElevationContext must be wrapped inside AppLayoutElevationValueContext'
      )
    );
  });

  test('When hook is not wrapped around AppLayoutElevationDispatchContext, throw meaningful error', () => {
    const stateWrapper: FC<WrapperProps> = ({ children }) => {
      return (
        <AppLayoutElevationValueContext.Provider value={1}>
          {children}
        </AppLayoutElevationValueContext.Provider>
      );
    };

    const { result } = renderHook(() => useAppLayoutElevationContext(), {
      wrapper: stateWrapper,
    });
    expect(result.error).toEqual(
      new Error(
        'useAppLayoutElevationContext must be wrapped inside AppLayoutElevationDispatchContext'
      )
    );
  });

  test('When wrapper exists returns dispatch', () => {
    const { result } = renderHook(() => useAppLayoutElevationContext(), {
      wrapper: validWrapper,
    });

    expect(result.current).toEqual({ elevation: 1, dispatch: mockDispatch });
  });
});
