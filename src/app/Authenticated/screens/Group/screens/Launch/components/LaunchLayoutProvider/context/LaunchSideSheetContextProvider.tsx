import React, {
  FC,
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';

export enum SideSheetTab {
  Unset = 'unset',
  Files = 'files',
  Attachments = 'attachments',
  Comments = 'comments',
}

export type SideSheetActions =
  | {
      type: SideSheetTab.Files;
    }
  | {
      type: SideSheetTab.Comments;
    }
  | {
      type: SideSheetTab.Attachments;
    }
  | {
      type: SideSheetTab.Unset;
    };

export type SideSheetDispatch = Dispatch<SideSheetActions>;

export const LaunchSideSheetValueContext = createContext<
  SideSheetTab | undefined | null
>(undefined);
export const LaunchSideSheetDispatchContext = createContext<
  SideSheetDispatch | undefined
>(undefined);

/**
 * This reducer starts with a flat state, which is all we need. However, we are using a reducer in order to do event driven programming as opposed to set state.
 */
export const reducer = (state: string | null, action: SideSheetActions) => {
  switch (action.type) {
    case SideSheetTab.Unset:
      return null;
    case SideSheetTab.Files:
      return SideSheetTab.Files;
    case SideSheetTab.Comments:
      return SideSheetTab.Comments;
    case SideSheetTab.Attachments:
      return SideSheetTab.Attachments;
    default:
      throw new Error('Invalid Action Type');
  }
};

interface LaunchSideSheetContextProviderProps {
  children: ReactNode;
}

const LaunchSideSheetContextProvider: FC<LaunchSideSheetContextProviderProps> = ({
  children,
}) => {
  const [sideSheet, dispatch] = useReducer(reducer, SideSheetTab.Comments);

  return (
    <LaunchSideSheetValueContext.Provider value={sideSheet}>
      <LaunchSideSheetDispatchContext.Provider value={dispatch}>
        {children}
      </LaunchSideSheetDispatchContext.Provider>
    </LaunchSideSheetValueContext.Provider>
  );
};

export default LaunchSideSheetContextProvider;
