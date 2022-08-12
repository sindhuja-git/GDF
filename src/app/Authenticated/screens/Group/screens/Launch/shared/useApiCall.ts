import { useState } from 'react';
import Fetch, { Options } from 'utils/fetch';
import { FetchStates } from './constants';

export default (fetchOptions: Options) => {
  const [currentState, setCurrentState] = useState(FetchStates.NOT_YET_CALLED);
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const makeApiCall = async () => {
    if (currentState === FetchStates.NOT_YET_CALLED) {
      setCurrentState(FetchStates.PENDING);
      try {
        const apiResponse = await Fetch(fetchOptions);
        setCurrentState(FetchStates.FINISHED);
        setResponse(apiResponse);
      } catch (fetchError) {
        setCurrentState(FetchStates.ERROR);
        setError(fetchError);
      }
    }
  };

  return { currentState, response, error, makeApiCall };
};
