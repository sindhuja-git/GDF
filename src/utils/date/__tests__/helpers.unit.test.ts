import { format, formatISO } from 'date-fns';
import { build, fake } from '@jackfranklin/test-data-bot';

import * as dateHelpers from 'utils/date/helpers';

type DateTester = {
  date: Date;
};

export const dateBuilder = build<DateTester>('GdfDictrionary', {
  fields: {
    date: fake((faker) => faker.date.recent()),
  },
});

describe('formatIsoStringToVernacularDateTime tests', () => {
  test('formats date in MM/dd/yyyy hh:mmA format', () => {
    const { date } = dateBuilder();
    const dateString = formatISO(date);

    expect(dateHelpers.formatIsoStringToVernacularDateTime(dateString)).toEqual(
      format(date, 'MM/dd/yyyy hh:mma')
    );
  });
});

describe('formatIsoStringToVernacularDate tests', () => {
  test('formats date in MM/dd/yyyy format', () => {
    const { date } = dateBuilder();
    const dateString = formatISO(date);

    expect(dateHelpers.formatIsoStringToVernacularDate(dateString)).toEqual(
      format(date, 'MM/dd/yyyy')
    );
  });
});
