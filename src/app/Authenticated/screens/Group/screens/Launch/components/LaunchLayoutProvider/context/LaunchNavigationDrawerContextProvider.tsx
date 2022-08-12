import React, {
  FC,
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

export type SetStateBooleanType = Dispatch<SetStateAction<boolean>>;

export const LaunchNavigationDrawerValueContext = createContext<
  boolean | undefined
>(undefined);
export const LaunchNavigationDrawerSetContext = createContext<
  SetStateBooleanType | undefined
>(undefined);

interface LaunchNavigationDrawerContextProviderProps {
  children: ReactNode;
}

const LaunchNavigationDrawerContextProvider: FC<LaunchNavigationDrawerContextProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <LaunchNavigationDrawerValueContext.Provider value={open}>
      <LaunchNavigationDrawerSetContext.Provider value={setOpen}>
        {children}
      </LaunchNavigationDrawerSetContext.Provider>
    </LaunchNavigationDrawerValueContext.Provider>
  );
};

export default LaunchNavigationDrawerContextProvider;
