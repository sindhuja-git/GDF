import { isEmpty } from '../../isEmpty';

describe('isEmpty', () => {
  it('returns true when empty', () => {
    const test = {};

    expect(isEmpty(test)).toBeTruthy();
  });
  it('returns false when not empty', () => {
    const test = { stuff: true };

    expect(isEmpty(test)).toBeFalsy();
  });
});
