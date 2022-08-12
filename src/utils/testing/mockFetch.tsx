export const mockFetchData = (data: any) => {
  const mockFetch = Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  });
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch as any);
};

export const mockFetchFail = () => {
  const mockFetch = new Promise((reject: (arg0: Error) => void) => {
    reject(new Error('something bad happened'));
  });
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch as any);
};

export const mockFetchHttpStatus400Error = (status: number = 400) => {
  const mockFetch = Promise.resolve({
    ok: false,
    status,
    json: () => Promise.resolve('Bad Request'),
  });
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetch as any);
};
