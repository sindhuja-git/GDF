import { getQueryParametersString } from '../../getQueryParamsString';

describe('test getRequestParams', () => {
  test('params object with several defined fields are url encoded', () => {
    expect(
      getQueryParametersString({ city: 'Saint Paul', state: 'Minnesota/MN' })
    ).toBe('?city=Saint%20Paul&state=Minnesota%2FMN');
  });
  test('params object with a truthy field, a null field, and an undefined field', () => {
    expect(getQueryParametersString({ a: '123', b: undefined, c: null })).toBe(
      '?a=123'
    );
  });
  test('params object with all falsy fields', () => {
    expect(getQueryParametersString({ a: '', b: undefined, c: null })).toBe('');
  });
  test('empty params object', () => {
    expect(getQueryParametersString({})).toBe('');
  });
  test('undefined params object', () => {
    expect(getQueryParametersString()).toBe('');
  });
});
