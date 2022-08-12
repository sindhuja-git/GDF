import Auth from './auth/legacy/Auth';
import appProperties from '../properties/application';

export const HTTP_OK_SYMBOL = Symbol('http_ok');
export const HTTP_STATUS_SYMBOL = Symbol('http_status');

export type Options = {
  headers?: object;
  body?: object | null;
  useBaseUrl?: boolean;
  url: string;
  type?: string;
};

const Fetch = async (options: Options): Promise<any> => {
  const {
    headers: supplementalHeaders,
    body,
    useBaseUrl = true,
    ...otherOptions
  } = options;
  let data = {};
  await fetch(
    useBaseUrl ? appProperties().services.api.url + options.url : options.url,
    {
      headers: {
        authorization: Auth.authorizationHeader(),
      },
      ...otherOptions,
    }
  )
    .then(async (res) => {
      const responseBody =
        options.type === 'text' ? await res.text() : await res.json();
      if (!res.ok) {
        throw new Error(
          `HTTP Status Error: ${res.status} - ${JSON.stringify(responseBody)}`
        );
      }
      return responseBody;
    })
    .then((d) => {
      data = d;
    });
  return data;
};

export default Fetch;
