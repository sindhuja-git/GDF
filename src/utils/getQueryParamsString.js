export const getQueryParametersString = (requestParams) => {
  let queryParamString = '';
  if (requestParams) {
    const paramsString = Object.entries(requestParams)
      /* eslint-disable  @typescript-eslint/no-unused-vars */
      .filter(([key, value]) => value)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');
    queryParamString = paramsString ? `?${paramsString}` : '';
  }
  return queryParamString;
};
