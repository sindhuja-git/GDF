/* eslint-disable no-octal */
import { build, sequence } from '@jackfranklin/test-data-bot';

import { padToFour } from 'utils/padZero';

type GroupNumberTester = {
  gNumber: number;
};

export const groupNumberBuilder = build<GroupNumberTester>('GdfDictionary', {
  fields: {
    gNumber: sequence(),
  },
});

describe('padZero tests', () => {
  test('adds zeros in front of the group number', () => {
    const groupNumber = 17;
    const formattedGroupNumber = '0017';
    expect(padToFour(groupNumber)).toEqual(formattedGroupNumber);
  });
  test('returns the group number as a string if the number doesnt need zeros', () => {
    const groupNumber = 15757;
    expect(padToFour(groupNumber)).toEqual(groupNumber.toString());
  });
  test('padToFour tests', () => {
    expect(padToFour(0)).toBe('0000');
    expect(padToFour(1)).toBe('0001');
    expect(padToFour(12)).toBe('0012');
    expect(padToFour(123)).toBe('0123');
    expect(padToFour(1234)).toBe('1234');
    expect(padToFour(12345)).toBe('12345');
  });
});
