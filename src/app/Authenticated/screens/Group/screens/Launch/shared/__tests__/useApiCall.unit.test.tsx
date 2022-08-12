import { renderHook, act } from '@testing-library/react-hooks';
import useApiCall from '../useApiCall';
import { FetchStates } from '../constants';
import Fetch from '../../../../../../../../utils/fetch';

jest.mock('../../../../../../../../utils/fetch');

describe('useApiCall tests', () => {
  test('Hook has state Not Yet Called before makeApiCall is excuted', () => {
    const { result } = renderHook(() => useApiCall({ url: 'test' }));

    expect(result.current.currentState).toEqual(FetchStates.NOT_YET_CALLED);
    expect(Fetch).not.toBeCalled();
  });

  test('When makeApiCall is excuted multiple times, only one call is made', async () => {
    const { result } = renderHook(() => useApiCall({ url: 'test' }));

    await act(async () => {
      result.current.makeApiCall();
    });

    await act(async () => {
      result.current.makeApiCall();
    });

    expect(Fetch).toBeCalledTimes(1);
  });

  test('Hook has state Finished after successful makeApiCall is excuted and response is the result of the call', async () => {
    const mockResult = { test: false };
    (Fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockResult)
    );

    const { result } = renderHook(() => useApiCall({ url: 'test' }));
    await act(async () => {
      result.current.makeApiCall();
    });

    expect(result.current.currentState).toEqual(FetchStates.FINISHED);
    expect(result.current.response).toEqual(mockResult);
    expect(Fetch).toBeCalledTimes(1);
  });

  test('Hook has state Error after failed makeApiCall is excuted and response is the error from the call', async () => {
    const mockError = new Error('test error');
    (Fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(mockError)
    );

    const { result } = renderHook(() => useApiCall({ url: 'test' }));
    await act(async () => {
      result.current.makeApiCall();
    });

    expect(result.current.currentState).toEqual(FetchStates.ERROR);
    expect(result.current.error).toEqual(mockError);
    expect(Fetch).toBeCalledTimes(1);
  });
});
