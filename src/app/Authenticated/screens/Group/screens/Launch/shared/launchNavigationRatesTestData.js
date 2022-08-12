// Scenario where rates from GSU and GDF are NOT_EQUAL
export const scenarioNotEqual = {
  apiResponse: {
    ratesTab: true,
    contactsTab: true,
    rates: 'NOT_EQUAL',
    sites: 'NOT_EQUAL',
    demographics: 'NOT_EQUAL',
    contacts: 'NOT_EQUAL',
    gsp: 'NOT_EQUAL',
    plans: 'NOT_EQUAL',
  },

  querySelector: '#icon-warning-Rates',
};

// Scenario where rates are only in GDF not in GSU
export const scenarioOnlyInGdf = {
  apiResponse: {
    ratesTab: true,
    contactsTab: true,
    rates: 'ONLY_IN_GDF',
    sites: 'NOT_EQUAL',
    demographics: 'NOT_EQUAL',
    contacts: 'NOT_EQUAL',
    gsp: 'NOT_EQUAL',
    plans: 'NOT_EQUAL',
  },

  querySelector: '#icon-amber-warning-Rates',
};

// Scenario where rates are only in GSU not in GDF
export const scenarioOnlyInGsu = {
  apiResponse: {
    ratesTab: true,
    contactsTab: true,
    rates: 'ONLY_IN_GSU',
    sites: 'NOT_EQUAL',
    demographics: 'NOT_EQUAL',
    contacts: 'NOT_EQUAL',
    gsp: 'NOT_EQUAL',
    plans: 'NOT_EQUAL',
  },

  querySelector: '#icon-warning-Rates',
};

// Scenario where rates are from GSU and GDF are not comparable. There is rate comment
export const scenarioNotComparable = {
  apiResponse: {
    ratesTab: true,
    contactsTab: true,
    rates: 'NOT_COMPARABLE',
    sites: 'NOT_EQUAL',
    demographics: 'NOT_EQUAL',
    contacts: 'NOT_EQUAL',
    gsp: 'NOT_EQUAL',
    plans: 'NOT_EQUAL',
  },

  querySelector: '#icon-stop-Rates',
};

// Scenario where rates from GSU and GDF are EQUAL
export const scenarioEqual = {
  apiResponse: {
    ratesTab: true,
    contactsTab: true,
    rates: 'EQUAL',
    sites: 'NOT_EQUAL',
    demographics: 'NOT_EQUAL',
    contacts: 'NOT_EQUAL',
    gsp: 'NOT_EQUAL',
    plans: 'NOT_EQUAL',
  },

  querySelector: '#icon-warning-Rates',
};
