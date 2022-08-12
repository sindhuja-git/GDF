// import dependencies

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Fetch from '../../fetch';

describe('createHeaders tests', () => {
  const server = setupServer(
    rest.get('/test500', (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ message: 'Internal Server Error' })
      );
    }),
    rest.get('/test400', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ message: 'Bad Request' }));
    }),
    rest.get('/testurl', (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(ctx.json({ id: 'hello', name: 'test name' }));
    }),
    rest.get('/testurlwithtext', (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(ctx.text('hello'));
    })
  );

  // establish API mocking before all tests
  beforeAll(() => server.listen());

  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  afterEach(() => server.resetHandlers());

  // clean up once the tests are done
  afterAll(() => server.close());

  test('fetch should throw error on 500 server error', async () => {
    let errorThrown;

    try {
      const options = {
        url: '/test500',
        useBaseUrl: false, // Do not use the actual base url(dev) in local test case
        headers: {
          Authorization: 'Basic',
          'Content-Type': 'application/json',
          Accept: 'application/json,text/plain',
          'X-HP-Request-ID': 'test-uuid',
          'X-XSRF-TOKEN': 'tokenValue',
          'X-Requested-With': 'XMLHttpsRequest',
        },
        mode: 'cors',
      };

      await Fetch(options);
    } catch (error) {
      errorThrown = error;
    }

    expect(errorThrown).toBeTruthy();
    expect(errorThrown.message).toEqual(
      'HTTP Status Error: 500 - {"message":"Internal Server Error"}'
    );
  });

  test('fetch should throw error on 400 bad request', async () => {
    let errorThrown;

    try {
      const options = {
        url: '/test400',
        useBaseUrl: false, // Do not use the actual base url(dev) in local test case
        headers: {
          Authorization: 'Basic',
          'Content-Type': 'application/json',
          Accept: 'application/json,text/plain',
          'X-HP-Request-ID': 'test-uuid',
          'X-XSRF-TOKEN': 'tokenValue',
          'X-Requested-With': 'XMLHttpsRequest',
        },
        mode: 'cors',
      };

      await Fetch(options);
    } catch (error) {
      errorThrown = error;
    }

    expect(errorThrown).toBeTruthy();
    expect(errorThrown.message).toEqual(
      'HTTP Status Error: 400 - {"message":"Bad Request"}'
    );
  });

  test('fetch url should get data', async () => {
    const options = {
      url: '/testurl',
      useBaseUrl: false, // Do not use the actual base url(dev) in local test case
      headers: {
        Authorization: 'Basic',
        'Content-Type': 'application/json',
        Accept: 'application/json,text/plain',
        'X-HP-Request-ID': 'test-uuid',
        'X-XSRF-TOKEN': 'tokenValue',
        'X-Requested-With': 'XMLHttpsRequest',
      },
      mode: 'cors',
    };

    const result = await Fetch(options);

    expect(result.id).toEqual('hello');
    expect(result.name).toEqual('test name');
  });

  test('fetch url with no body', async () => {
    const options = {
      url: '/testurl',
      useBaseUrl: false,
      headers: {
        Authorization: 'Basic',
        'Content-Type': 'application/json',
        Accept: 'application/json,text/plain',
        'X-HP-Request-ID': 'test-uuid',
        'X-XSRF-TOKEN': 'tokenValue',
        'X-Requested-With': 'XMLHttpsRequest',
      },
      mode: 'cors',
      body: null,
    };

    const result = await Fetch(options);

    expect(result.id).toEqual('hello');
    expect(result.name).toEqual('test name');
  });

  test('fetch url with text instead of json', async () => {
    const options = {
      url: '/testurlwithtext',
      type: 'text',
      useBaseUrl: false,
      headers: {
        Authorization: 'Basic',
        'Content-Type': 'application/json',
        Accept: 'application/json,text/plain',
        'X-HP-Request-ID': 'test-uuid',
        'X-XSRF-TOKEN': 'tokenValue',
        'X-Requested-With': 'XMLHttpsRequest',
      },
      mode: 'cors',
      body: null,
    };

    const result = await Fetch(options);

    expect(result).toEqual('hello');
  });
});
