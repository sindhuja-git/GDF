import React, {
  FC,
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
} from 'react';

export enum ElevationStates {
  ResetElevation = 'resetElevation',
  Flatten = 'flatten',
}

export type AppLayoutElevationAction =
  | {
      type: ElevationStates.ResetElevation;
    }
  | {
      type: ElevationStates.Flatten;
    };

export type AppLayoutDispatch = Dispatch<AppLayoutElevationAction>;

export const AppLayoutElevationValueContext = createContext<number | undefined>(
  undefined
);
export const AppLayoutElevationDispatchContext = createContext<
  AppLayoutDispatch | undefined
>(undefined);

const initialState = 4;

export const reducer = (state: number, action: AppLayoutElevationAction) => {
  switch (action.type) {
    case ElevationStates.ResetElevation:
      return initialState;
    case ElevationStates.Flatten:
      return 0;
    default:
      throw new Error('Invalid Action Type');
  }
};

interface AppLayoutElevationProviderProps {
  children: ReactNode;
}

/**
 * App Layout will be tested with Group Layout as the group layout manipulates the AppLayout. This is the only functionality covered.
 */
const AppLayoutElevationProvider: FC<AppLayoutElevationProviderProps> = ({
  children,
}) => {
  const [elevation, elevationDispatch] = useReducer(reducer, initialState);

  return (
    <AppLayoutElevationValueContext.Provider value={elevation}>
      <AppLayoutElevationDispatchContext.Provider value={elevationDispatch}>
        {children}
      </AppLayoutElevationDispatchContext.Provider>
    </AppLayoutElevationValueContext.Provider>
  );
};

export default AppLayoutElevationProvider;
