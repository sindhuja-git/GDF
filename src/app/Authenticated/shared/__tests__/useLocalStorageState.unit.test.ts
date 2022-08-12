import { renderHook, act } from '@testing-library/react-hooks';

import useLocalStorageState from '../useLocalStorageState';

describe('useLocalStorageState tests', () => {
  beforeEach(() => {
    localStorage.removeItem('testKey');
  });

  test('if localStorage entry exists return it. default deserializer', () => {
    const value = JSON.stringify('value');
    localStorage.setItem('testKey', value);

    const { result } = renderHook(() => useLocalStorageState('testKey'));

    expect(result.current).toEqual(['value', expect.any(Function)]);
  });

  test('if localStorage does not exist, return default value, string', () => {
    const { result } = renderHook(() =>
      useLocalStorageState('testKey', 'defaultValue')
    );

    expect(result.current).toEqual(['defaultValue', expect.any(Function)]);
  });

  test('if localStorage does not exist, return default value, callback lazy load implementation', () => {
    const { result } = renderHook(() =>
      useLocalStorageState('testKey', () => 'defaultValue')
    );

    expect(result.current).toEqual(['defaultValue', expect.any(Function)]);
  });

  test('if localStorage exists and custom deserializer passed, calls it correctly', () => {
    const deserialize = jest.fn();
    deserialize.mockImplementationOnce(() => 'deserialized value');

    localStorage.setItem('testKey', JSON.stringify('value'));

    const { result } = renderHook(() =>
      useLocalStorageState('testKey', undefined, {
        deserialize,
        serialize: undefined,
      })
    );

    expect(result.current).toEqual([
      'deserialized value',
      expect.any(Function),
    ]);
  });

  test('set state serializes new value correctly. defaulted JSON.parse serializer', () => {
    const { result } = renderHook(() => useLocalStorageState('testKey'));

    const testPayload = { test: true };
    const setState = result.current[1];

    act(() => {
      setState(testPayload);
    });

    expect(result.current[0]).toEqual(testPayload);
    expect(localStorage.getItem('testKey')).toEqual(
      JSON.stringify(testPayload)
    );
  });

  test('setState with custom serializer returns serialized result.', () => {
    const serialize = jest.fn();
    serialize.mockImplementation(() => 'serialized value');

    const { result } = renderHook(() =>
      useLocalStorageState('testKey', undefined, {
        deserialize: undefined,
        serialize,
      })
    );

    const testPayload = { test: true };
    const setState = result.current[1];

    act(() => {
      setState(testPayload);
    });

    // we expect the internal state to have the object. However local storage should have serialized value
    expect(result.current[0]).toEqual(testPayload);
    expect(localStorage.getItem('testKey')).toEqual('serialized value');
  });

  test('if key changes on same rendered instance it deletes the old key', () => {
    const { result, rerender } = renderHook(
      ({ key }) => useLocalStorageState(key),
      { initialProps: { key: 'testKey' } }
    );

    const testPayload = { test: true };
    const setState = result.current[1];

    act(() => {
      setState(testPayload);
    });

    expect(result.current[0]).toEqual(testPayload);
    expect(localStorage.getItem('testKey')).toEqual(
      JSON.stringify(testPayload)
    );

    rerender({ key: 'newKey' });

    // old key removed from local storage
    expect(localStorage.getItem('testKey')).toEqual(null);
  });
});
