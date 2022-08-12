export const scenario01 = {
  apiResponse: [],
  /* alertBoxContactNames: [],
  allContacts: [],
  highlightedContactNames: [], */
  highlightedCells: [],
};

// Scenario where address from GSU and GDF do not match
export const scenario12 = {
  apiResponse: [
    {
      address: {
        fullAddress: {
          gdfValue: '8369 Del igh MN 55076',
          gsuValue: '8369 Del igh MN 55075',
          compareStatus: 'NOT_EQUAL',
        },
        compareStatus: 'NOT_EQUAL',
      },
    },
  ],
  alertBoxContactNames: [],
  allContacts: [],
  highlightedContactNames: [],
  highlightedCells: [{ Address: '8369 Del igh MN 55076' }],
};

// Scenario where address from GSU and GDF match
export const scenario13 = {
  apiResponse: [
    {
      address: {
        fullAddress: {
          gdfValue: '8369 Del igh MN 55076',
          gsuValue: '8369 Del igh MN 55076',
          compareStatus: 'EQUAL',
        },
        compareStatus: 'EQUAL',
      },
    },
  ],
  alertBoxContactNames: [],
  allContacts: [],
  highlightedContactNames: [],
  highlightedCells: [],
};

// Scenario where fullPhoneNumber from GSU and GDF match
export const scenario14 = {
  apiResponse: [
    {
      fullPhoneNumber: {
        gdfValue: '555-555-1212 ext. 1234',
        gsuValue: '555-555-1212 ext. 1234',
        compareStatus: 'EQUAL',
      },
      compareStatus: 'EQUAL',
    },
  ],
  alertBoxContactNames: [],
  allContacts: [],
  highlightedContactNames: [],
  highlightedCells: [],
};

// Scenario where fullPhoneNumber from GSU and GDF do not match
export const scenario15 = {
  apiResponse: [
    {
      fullPhoneNumber: {
        gdfValue: '555-555-1212 ext. 1234',
        gsuValue: '555-555-1212',
        compareStatus: 'NOT_EQUAL',
      },
      compareStatus: 'NOT_EQUAL',
    },
  ],
  alertBoxContactNames: [],
  allContacts: [],
  highlightedContactNames: [],
  highlightedCells: [{ 'Primary Phone': '555-555-1212 ext. 1234' }],
};

// Scenario: Contact and extention in GSU and GDF are same.
export const scenario21 = {
  apiResponse: [
    {
      phoneExtension: {
        gdfValue: '123',
        gsuValue: '123',
        compareStatus: 'EQUAL',
      },
      phoneNumber: {
        gdfValue: '612-454-4850',
        gsuValue: '612-454-4850',
        compareStatus: 'EQUAL',
      },
      fullPhoneNumber: {
        gdfValue: '612-454-4850 ext. 123',
        gsuValue: '612-454-4850 ext. 123',
        compareStatus: 'EQUAL',
      },
    },
  ],
  alertBoxContactNames: [],
  allContacts: [],
  highlightedContactNames: [],
  highlightedCells: [],
};

// Scenario: Contact extention is different in GSU and GDF
export const scenario22 = {
  apiResponse: [
    {
      phoneExtension: {
        gdfValue: '555',
        gsuValue: '123',
        compareStatus: 'NOT_EQUAL',
      },
      phoneNumber: {
        gdfValue: '612-454-4850',
        gsuValue: '612-454-4850',
        compareStatus: 'EQUAL',
      },
      fullPhoneNumber: {
        gdfValue: '612-454-4850 ext. 555',
        gsuValue: '612-454-4850 ext. 123',
        compareStatus: 'NOT_EQUAL',
      },
    },
  ],
  alertBoxContactNames: [],
  allContacts: [],
  highlightedContactNames: [],
  highlightedCells: [{ 'Primary Phone': '612-454-4850 ext. 555' }],
};

// Scenario: Contact extention is only in GDF not in GSU
export const scenario23 = {
  apiResponse: [
    {
      phoneExtension: {
        gdfValue: '123',
        gsuValue: null,
        compareStatus: 'NOT_EQUAL',
      },
      phoneNumber: {
        gdfValue: '612-454-4850',
        gsuValue: '612-454-4850',
        compareStatus: 'EQUAL',
      },
      fullPhoneNumber: {
        gdfValue: '612-454-4850 ext. 123',
        gsuValue: '612-454-4850',
        compareStatus: 'NOT_EQUAL',
      },
    },
  ],
  alertBoxContactNames: [],
  allContacts: [],
  highlightedContactNames: [],
  highlightedCells: [{ 'Primary Phone': '612-454-4850 ext. 123' }],
};

// Scenario: Contact extention is only in GSU not in GDF
export const scenario24 = {
  apiResponse: [
    {
      phoneExtension: {
        gdfValue: null,
        gsuValue: '123',
        compareStatus: 'NOT_EQUAL',
      },
      phoneNumber: {
        gdfValue: '612-454-4850',
        gsuValue: '612-454-4850',
        compareStatus: 'EQUAL',
      },
      fullPhoneNumber: {
        gdfValue: '612-454-4850',
        gsuValue: '612-454-4850  ext. 123',
        compareStatus: 'NOT_EQUAL',
      },
    },
  ],
  alertBoxContactNames: [],
  allContacts: [],
  highlightedContactNames: [],
  highlightedCells: [{ 'Primary Phone': '612-454-4850' }],
};

// Scenario: Contact extention same phone number is not equal in GSU and GDF
export const scenario25 = {
  apiResponse: [
    {
      phoneExtension: {
        gdfValue: '123',
        gsuValue: '123',
        compareStatus: 'EQUAL',
      },
      phoneNumber: {
        gdfValue: '612-454-4850',
        gsuValue: '612-454-4851',
        compareStatus: 'NOT_EQUAL',
      },
      fullPhoneNumber: {
        gdfValue: '612-454-4850 ext. 123',
        gsuValue: '612-454-4851 ext. 123',
        compareStatus: 'NOT_EQUAL',
      },
    },
  ],
  alertBoxContactNames: [],
  allContacts: [],
  highlightedContactNames: [],
  highlightedCells: [{ 'Primary Phone': '612-454-4850 ext. 123' }],
};
