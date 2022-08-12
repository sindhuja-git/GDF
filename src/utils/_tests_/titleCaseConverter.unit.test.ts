import { build, fake } from '@jackfranklin/test-data-bot';

import { convertToTitleCase } from 'utils/titileCaseConvertor';

type GroupRepsTitleTester = {
  macRepFirstName: string;
  macRepLastName: string;
};

export const macRepNameBuilder = build<GroupRepsTitleTester>('GdfDictionary', {
  fields: {
    macRepFirstName: fake((faker) => faker.commerce.product()),
    macRepLastName: fake((faker) => faker.commerce.product()),
  },
});

describe('titleCaseConverter tests', () => {
  test('converts the firstName and last name to title case', () => {
    const macRepFirstName = 'GROUP';
    const macRepLastName = 'CORNERSTONE';
    expect(convertToTitleCase(macRepFirstName)).toEqual('Group');
    expect(convertToTitleCase(macRepLastName)).toEqual('Cornerstone');
  });
});
