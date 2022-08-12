import { useContext } from 'react';

import {
  ElevationStates,
  AppLayoutElevationValueContext,
  AppLayoutElevationDispatchContext,
  AppLayoutDispatch,
} from '../components/AppLayoutProvider';

const useAppLayoutElevationContext = () => {
  const elevation = useContext(AppLayoutElevationValueContext);
  const dispatch = useContext(AppLayoutElevationDispatchContext);

  if (elevation === undefined) {
    throw new Error(
      'useAppLayoutElevationContext must be wrapped inside AppLayoutElevationValueContext'
    );
  }

  if (dispatch === undefined) {
    throw new Error(
      'useAppLayoutElevationContext must be wrapped inside AppLayoutElevationDispatchContext'
    );
  }

  return { elevation, dispatch };
};

// Action Creators
export const resetElevation = (dispatch: AppLayoutDispatch | undefined) =>
  dispatch?.({ type: ElevationStates.ResetElevation });

export const flatten = (dispatch: AppLayoutDispatch | undefined) =>
  dispatch?.({ type: ElevationStates.Flatten });

export default useAppLayoutElevationContext;
