import { useContext } from 'react';

import {
  LaunchSideSheetValueContext,
  LaunchSideSheetDispatchContext,
  SideSheetTab as ProviderSideSheetTab,
  SideSheetDispatch,
} from '../components/LaunchLayoutProvider/context/LaunchSideSheetContextProvider';

/**
 * We are reexporting so values are accessible by other consumers.
 */
export const SideSheetTab = ProviderSideSheetTab;

const useLaunchSideSheet = () => {
  const sideSheet = useContext(LaunchSideSheetValueContext);
  const dispatch = useContext(LaunchSideSheetDispatchContext);

  if (sideSheet === undefined) {
    throw new Error(
      'useLaunchSideSheet must be wrapped inside LaunchSideSheetValueContext'
    );
  }

  if (dispatch === undefined) {
    throw new Error(
      'useLaunchSideSheet must be wrapped inside LaunchSideSheetDispatchContext'
    );
  }

  return { open: !!sideSheet, sideSheet, dispatch };
};
export const unset = (dispatch: SideSheetDispatch) =>
  dispatch({ type: SideSheetTab.Unset });

export const set = (dispatch: SideSheetDispatch, type: ProviderSideSheetTab) =>
  dispatch({ type });

export default useLaunchSideSheet;
