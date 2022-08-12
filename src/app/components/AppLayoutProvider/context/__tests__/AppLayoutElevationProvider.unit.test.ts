import {
  reducer,
  ElevationStates,
  AppLayoutElevationAction,
} from '../AppLayoutElevationProvider';

/**
 * ! We are only testing the reducer here as the component functionality is tested as part of other integration tests. Such as Group.js
 */

describe('AppLayoutElevationProvider reducer tests', () => {
  test('when invalid action runs throws invalid action error', () => {
    const action = {
      type: 'Invalid',
    };

    expect(() =>
      reducer(1, (action as unknown) as AppLayoutElevationAction)
    ).toThrow('Invalid Action Type');
  });

  test('when action is ResetElevation, reset elevation to 4', () => {
    const action = {
      type: ElevationStates.ResetElevation,
    };

    expect(reducer(0, action)).toBe(4);
  });

  test('when action is Flatten, set elevation to 0', () => {
    const action = {
      type: ElevationStates.Flatten,
    };

    expect(reducer(1, action)).toBe(0);
  });
});
