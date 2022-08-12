import React, {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

export type SetStateStringType = Dispatch<SetStateAction<string>>;

export const LaunchTitleValueContext = createContext<string | null | undefined>(
  undefined
);
export const LaunchTitleSetContext = createContext<
  SetStateStringType | null | undefined
>(undefined);

interface LaunchTitleContextProviderProps {
  children: ReactNode;
}

const LaunchTitleContextProvider: FC<LaunchTitleContextProviderProps> = ({
  children,
}) => {
  const [title, setTitle] = useState('');

  return (
    <LaunchTitleValueContext.Provider value={title}>
      <LaunchTitleSetContext.Provider value={setTitle}>
        {children}
      </LaunchTitleSetContext.Provider>
    </LaunchTitleValueContext.Provider>
  );
};

export default LaunchTitleContextProvider;
