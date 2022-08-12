import { useState, useRef, useEffect } from 'react';

/**
 * Special thanks to Kent C. Dodd's for creating this hook.
 * Source code can be found here:
 * https://github.com/kentcdodds/react-hooks/blob/master/src/final/02.extra-4.js
 *
 * Part of Epic React If you'd like to learn more about React do Epic React.
 */

type DefaultValueType = (() => void) | string;

type LocalStorageSerializationType = {
  serialize: ((param: any) => any) | undefined;
  deserialize: ((param: string) => any) | undefined;
};

const useLocalStorageState = (
  key: string,
  defaultValue: DefaultValueType = '',
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: LocalStorageSerializationType = {
    serialize: undefined,
    deserialize: undefined,
  }
) => {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);

    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;

    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
};

export default useLocalStorageState;
