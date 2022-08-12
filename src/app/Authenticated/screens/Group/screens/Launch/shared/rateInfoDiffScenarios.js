// with rate comment, no differences

export const scenario01 = {
  apiResponseFromRatesGsu: {
    compareStatus: 'EQUAL',
    effectiveFromDate: {
      gdfValue: '2022-01-01',
      gsuValue: '2022-01-01',
      compareStatus: 'EQUAL',
    },
    properties: {
      rateTierValues: [],
      addonRates: [],
    },
  },
  apiResponseFromReferential: {
    dentalDiscountedForPreventive: false,
    dentalVoluntary: false,
    comments: [
      {
        text: 'test comment',
        createDate: '2021-06-03T09:01:12',
        createUser: 'janagle',
        createUserDisplayName: null,
      },
    ],
  },
  icons: ['ReportIcon'],
  error: 1,
  warning: 0,
  messagetexts: ['Rate comments exists - user review always required'],
  highlightedCells: [],
};

export const scenario02 = {
  apiResponseFromRatesGsu: {
    compareStatus: 'EQUAL',
    effectiveFromDate: {
      gdfValue: '2022-01-01',
      gsuValue: '2022-01-01',
      compareStatus: 'EQUAL',
    },
    properties: {
      area: {
        code: {
          gdfValue: 'code',
          gsuValue: 'code',
          compareStatus: 'EQUAL',
        },
      },
      rateTierValues: [],
      addonRates: [],
    },
  },
  apiResponseFromReferential: {
    dentalDiscountedForPreventive: false,
    dentalVoluntary: false,
    comments: [
      {
        text: 'test comment',
        createDate: '2021-06-03T09:01:12',
        createUser: 'janagle',
        createUserDisplayName: null,
      },
    ],
  },
  icons: ['ReportIcon'],
  error: 1,
  warning: 0,
  messagetexts: ['Rate comments exists - user review always required'],
  highlightedCells: [],
};

// with rate comment, with one rate field difference
export const scenario03 = {
  apiResponseFromRatesGsu: {
    compareStatus: 'NOT_EQUAL',
    planRateType: {
      code: {
        compareStatus: 'NOT_EQUAL',
        gdfValue: 'PRT5',
        gsuValue: 'PRT4',
      },
      name: {
        compareStatus: 'NOT_EQUAL',
        gdfValue: 'ASO/Fees Schedule using Rate-Tier',
        gsuValue: 'ASO/Fees Schedule using Rate-Tiers',
      },
      compareStatus: 'NOT_EQUAL',
    },
    properties: {
      rateTierStructure: {
        id: {
          gdfValue: '8875e9da-8060-5135-e053-7b5f1cac3ec1',
          gsuValue: '8875e9da-8060-5135-e053-7b5f1cac3ec1',
          compareStatus: 'EQUAL',
        },
        code: {
          gdfValue: 'RATETIERSTRUCT3',
          gsuValue: 'RATETIERSTRUCT3',
          compareStatus: 'EQUAL',
        },
        name: {
          gdfValue: 'Single/Single+1/Family',
          gsuValue: 'Single/Single+1/Family',
          compareStatus: 'EQUAL',
        },
        sortOrder: {
          gdfValue: 30,
          gsuValue: 30,
          compareStatus: 'EQUAL',
        },
        compareStatus: 'EQUAL',
      },
      rateTierValues: [
        {
          type: {
            id: {
              gdfValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
              gsuValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'EE',
              gsuValue: 'EE',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'Single',
              gsuValue: 'Single',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 10,
              gsuValue: 10,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          value: {
            gdfValue: '36.57',
            gsuValue: '36.00',
            compareStatus: 'NOT_EQUAL',
          },
          compareStatus: 'NOT_EQUAL',
        },
        {
          type: {
            id: {
              gdfValue: '888d64f0-9e0f-192c-e053-7f5f1cac798a',
              gsuValue: '888d64f0-9e0f-192c-e053-7f5f1cac798a',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'EE1',
              gsuValue: 'EE1',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'Single+1',
              gsuValue: 'Single+1',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 20,
              gsuValue: 20,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          value: {
            gdfValue: '73.13',
            gsuValue: '73.13',
            compareStatus: 'EQUAL',
          },
          compareStatus: 'EQUAL',
        },
        {
          type: {
            id: {
              gdfValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
              gsuValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'F',
              gsuValue: 'F',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'Family',
              gsuValue: 'Family',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 80,
              gsuValue: 80,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          value: {
            gdfValue: '109.70',
            gsuValue: '109.70',
            compareStatus: 'EQUAL',
          },
          compareStatus: 'EQUAL',
        },
      ],
      addonRates: [],
    },
  },
  apiResponseFromReferential: {
    dentalDiscountedForPreventive: false,
    dentalVoluntary: false,
    comments: [
      {
        text: 'test comment',
        createDate: '2021-06-03T09:01:12',
        createUser: 'janagle',
        createUserDisplayName: null,
      },
    ],
  },
  icons: ['ReportIcon'],
  error: 1,
  warning: 0,
  messagetexts: ['Rate comments exists - user review always required'],
  highlightedCells: ['Single'],
};

// only in GDF, with rate comment and no add-on
export const scenario04 = {
  apiResponseFromRatesGsu: {
    compareStatus: 'ONLY_IN_GDF',
    effectiveFromDate: {
      gdfValue: '2022-01-01',
      gsuValue: null,
      compareStatus: 'ONLY_IN_GDF',
    },
    properties: {
      area: {
        code: {
          gdfValue: 'code',
          gsuValue: '',
          compareStatus: 'ONLY_IN_GDF',
        },
      },
      rateTierValues: [],
      addonRates: [],
    },
  },

  apiResponseFromReferential: {
    dentalDiscountedForPreventive: false,
    dentalVoluntary: false,
    comments: [
      {
        text: 'test comment',
        createDate: '2021-06-03T09:01:12',
        createUser: 'janagle',
        createUserDisplayName: null,
      },
    ],
  },
  icons: ['WarningAmberIcon', 'ReportIcon'],
  error: 2,
  warning: 0,
  messagetexts: [
    'GDF Viewer could not accurately compare this rate',
    'Rate comments exists - user review always required',
  ],
  highlightedCells: [],
};

// only in GDF, with rate comment, with one add-on
export const scenario05 = {
  apiResponseFromRatesGsu: {
    compareStatus: 'ONLY_IN_GDF',
    effectiveFromDate: {
      gdfValue: '2022-01-01',
      gsuValue: null,
      compareStatus: 'ONLY_IN_GDF',
    },
    properties: {
      area: {
        code: {
          gdfValue: 'code',
          gsuValue: '',
          compareStatus: 'ONLY_IN_GDF',
        },
      },
      rateTierValues: [],
      addonRates: [],
    },
  },
  apiResponseFromReferential: {
    dentalDiscountedForPreventive: false,
    dentalVoluntary: false,
    comments: [
      {
        text: 'test comment',
        createDate: '2021-06-03T09:01:12',
        createUser: 'janagle',
        createUserDisplayName: null,
      },
    ],
  },
  icons: ['WarningAmberIcon', 'ReportIcon'],
  error: 2,
  warning: 0,
  messagetexts: [
    'GDF Viewer could not accurately compare this rate',
    'Rate comments exists - user review always required',
  ],
  highlightedCells: [],
};

// Match and rate field diff, with rate comment, with one mis-matched add-on rate (only in GDF)
export const scenario06 = {
  apiResponseFromRatesGsu: {
    compareStatus: 'ONLY_IN_GDF',
    effectiveFromDate: {
      gdfValue: '2022-01-01',
      gsuValue: '2022-01-01',
      compareStatus: 'ONLY_IN_GDF',
    },
    properties: {
      area: {
        code: {
          gdfValue: 'code',
          gsuValue: '',
          compareStatus: 'ONLY_IN_GDF',
        },
      },
      addonRates: [
        {
          externalRateId: {
            gdfValue: null,
            gsuValue: 'e3c',
            compareStatus: 'N/A',
          },
          type: {
            id: {
              gdfValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              gsuValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'ART2',
              gsuValue: 'ART2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'HRA',
              gsuValue: 'HRA',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 50,
              gsuValue: 50,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          rateTierStructure: {
            id: {
              gdfValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              gsuValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'RATETIERSTRUCT2',
              gsuValue: 'RATETIERSTRUCT2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'Single/Family',
              gsuValue: 'Single/Family',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 20,
              gsuValue: 20,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          values: [
            {
              id: {
                gdfValue: null,
                gsuValue: '585fea0f-86ab-4f8b-94f4-c41194e74d46',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'EE',
                  gsuValue: 'EE',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Single',
                  gsuValue: 'Single',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 10,
                  gsuValue: 10,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '4.75',
                gsuValue: '5.00',
                compareStatus: 'NOT_EQUAL',
              },
              compareStatus: 'NOT_EQUAL',
            },
            {
              id: {
                gdfValue: null,
                gsuValue: 'e10399f9-3820-4701-b7d9-733a582b8f1d',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'F',
                  gsuValue: 'F',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Family',
                  gsuValue: 'Family',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 80,
                  gsuValue: 80,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '4.75',
                gsuValue: '5.00',
                compareStatus: 'NOT_EQUAL',
              },
              compareStatus: 'NOT_EQUAL',
            },
          ],
          compareStatus: 'NOT_EQUAL',
        },
      ],
    },
  },

  apiResponseFromReferential: {
    dentalDiscountedForPreventive: false,
    dentalVoluntary: false,
    comments: [
      {
        text: 'test comment',
        createDate: '2021-06-03T09:01:12',
        createUser: 'janagle',
        createUserDisplayName: null,
      },
    ],
  },
  icons: ['ReportIcon'],
  error: 1,
  warning: 0,
  messagetexts: ['Rate comments exists - user review always required'],
  highlightedCells: ['Single', 'Family'],
};

// Match and rate field diff, with rate comment, with one mis-matched add-on rate (only in GDF)
export const scenario07 = {
  apiResponseFromRatesGsu: {
    compareStatus: 'ONLY_IN_GDF',
    effectiveFromDate: {
      gdfValue: '2022-01-01',
      gsuValue: '2022-01-05',
      compareStatus: 'ONLY_IN_GDF',
    },
    properties: {
      rateTierValues: [],
      addonRates: [
        {
          externalRateId: {
            gdfValue: null,
            gsuValue: 'e3c',
            compareStatus: 'N/A',
          },
          type: {
            id: {
              gdfValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              gsuValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'ART2',
              gsuValue: 'ART2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'HRA',
              gsuValue: 'HRA',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 50,
              gsuValue: 50,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          rateTierStructure: {
            id: {
              gdfValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              gsuValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'RATETIERSTRUCT2',
              gsuValue: 'RATETIERSTRUCT2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'Single/Family',
              gsuValue: 'Single/Family',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 20,
              gsuValue: 20,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          values: [
            {
              id: {
                gdfValue: null,
                gsuValue: '585fea0f-86ab-4f8b-94f4-c41194e74d46',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'EE',
                  gsuValue: 'EE',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Single',
                  gsuValue: 'Single',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 10,
                  gsuValue: 10,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '4.75',
                gsuValue: '5.00',
                compareStatus: 'NOT_EQUAL',
              },
              compareStatus: 'NOT_EQUAL',
            },
            {
              id: {
                gdfValue: null,
                gsuValue: 'e10399f9-3820-4701-b7d9-733a582b8f1d',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'F',
                  gsuValue: 'F',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Family',
                  gsuValue: 'Family',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 80,
                  gsuValue: 80,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '5.00',
                gsuValue: '4.75',
                compareStatus: 'NOT_EQUAL',
              },
              compareStatus: 'NOT_EQUAL',
            },
          ],
          compareStatus: 'ONLY_IN_GDF',
        },
      ],
    },
  },

  apiResponseFromReferential: {
    dentalDiscountedForPreventive: false,
    dentalVoluntary: false,
    comments: [
      {
        text: 'test comment',
        createDate: '2021-06-03T09:01:12',
        createUser: 'janagle',
        createUserDisplayName: null,
      },
    ],
  },
  icons: ['WarningAmberIcon', 'ReportIcon'],
  error: 2,
  warning: 0,
  messagetexts: [
    'Add-On Rate Record(s) found in GDF and not found in GSU:',
    'Rate comments exists - user review always required',
  ],
  highlightedCells: ['Single', 'Family'],
};

// Match and rate field diff, with rate comment, with one matched add-on rate and no diff on add-on (only in GDF)
export const scenario08 = {
  apiResponseFromRatesGsu: {
    compareStatus: 'ONLY_IN_GDF',
    effectiveFromDate: {
      gdfValue: '2022-01-01',
      gsuValue: '2022-01-05',
      compareStatus: 'ONLY_IN_GDF',
    },
    properties: {
      area: {
        code: {
          gdfValue: 'code',
          gsuValue: '',
          compareStatus: 'ONLY_IN_GDF',
        },
      },
      rateTierValues: [],
      addonRates: [
        {
          externalRateId: {
            gdfValue: null,
            gsuValue: 'e3c',
            compareStatus: 'N/A',
          },
          type: {
            id: {
              gdfValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              gsuValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'ART2',
              gsuValue: 'ART2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'HRA',
              gsuValue: 'HRA',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 50,
              gsuValue: 50,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          deleted: {
            gdfValue: false,
            gsuValue: false,
            compareStatus: 'N/A',
          },
          deleteReason: {
            gdfValue: null,
            gsuValue: null,
            compareStatus: 'N/A',
          },
          published: {
            gdfValue: false,
            gsuValue: false,
            compareStatus: 'N/A',
          },
          rateTierStructure: {
            id: {
              gdfValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              gsuValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'RATETIERSTRUCT2',
              gsuValue: 'RATETIERSTRUCT2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'Single/Family',
              gsuValue: 'Single/Family',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 20,
              gsuValue: 20,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          values: [
            {
              id: {
                gdfValue: null,
                gsuValue: '585fea0f-86ab-4f8b-94f4-c41194e74d46',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'EE',
                  gsuValue: 'EE',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Single',
                  gsuValue: 'Single',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 10,
                  gsuValue: 10,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '4.75',
                gsuValue: '4.75',
                compareStatus: 'EQUAL',
              },
              compareStatus: 'EQUAL',
            },
            {
              id: {
                gdfValue: null,
                gsuValue: 'e10399f9-3820-4701-b7d9-733a582b8f1d',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'F',
                  gsuValue: 'F',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Family',
                  gsuValue: 'Family',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 80,
                  gsuValue: 80,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '5.00',
                gsuValue: '5.00',
                compareStatus: 'EQUAL',
              },
              compareStatus: 'EQUAL',
            },
          ],
          compareStatus: 'ONLY_IN_GDF',
        },
      ],
    },
  },

  apiResponseFromReferential: {
    dentalDiscountedForPreventive: false,
    dentalVoluntary: false,
    comments: [
      {
        text: 'test comment',
        createDate: '2021-06-03T09:01:12',
        createUser: 'janagle',
        createUserDisplayName: null,
      },
    ],
  },
  icons: ['WarningAmberIcon', 'ReportIcon'],
  error: 2,
  warning: 0,
  messagetexts: [
    'Add-On Rate Record(s) found in GDF and not found in GSU:',
    'Rate comments exists - user review always required',
  ],
  highlightedCells: [],
};

// addonrate only in GSU, with rate comment
export const scenario09 = {
  apiResponseFromRatesGsu: {
    compareStatus: 'ONLY_IN_GDF',
    effectiveFromDate: {
      gdfValue: '2022-01-01',
      gsuValue: '2022-01-05',
      compareStatus: 'ONLY_IN_GDF',
    },
    properties: {
      area: {
        code: {
          gdfValue: 'code',
          gsuValue: '',
          compareStatus: 'ONLY_IN_GDF',
        },
      },
      rateTierValues: [],
      addonRates: [
        {
          externalRateId: {
            gdfValue: null,
            gsuValue: 'e3c',
            compareStatus: 'N/A',
          },
          type: {
            id: {
              gdfValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              gsuValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'ART2',
              gsuValue: 'ART2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'HRA',
              gsuValue: 'HRA',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 50,
              gsuValue: 50,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          rateTierStructure: {
            id: {
              gdfValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              gsuValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'RATETIERSTRUCT2',
              gsuValue: 'RATETIERSTRUCT2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'Single/Family',
              gsuValue: 'Single/Family',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 20,
              gsuValue: 20,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          values: [
            {
              id: {
                gdfValue: null,
                gsuValue: '585fea0f-86ab-4f8b-94f4-c41194e74d46',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'EE',
                  gsuValue: 'EE',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Single',
                  gsuValue: 'Single',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 10,
                  gsuValue: 10,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '4.75',
                gsuValue: '5.00',
                compareStatus: 'NOT_EQUAL',
              },
              compareStatus: 'NOT_EQUAL',
            },
            {
              id: {
                gdfValue: null,
                gsuValue: 'e10399f9-3820-4701-b7d9-733a582b8f1d',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'F',
                  gsuValue: 'F',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Family',
                  gsuValue: 'Family',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 80,
                  gsuValue: 80,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '4.75',
                gsuValue: '5.00',
                compareStatus: 'NOT_EQUAL',
              },
              compareStatus: 'NOT_EQUAL',
            },
          ],
          compareStatus: 'ONLY_IN_GSU',
        },
      ],
    },
  },

  apiResponseFromReferential: {
    dentalDiscountedForPreventive: false,
    dentalVoluntary: false,
    comments: [
      {
        text: 'test comment',
        createDate: '2021-06-03T09:01:12',
        createUser: 'janagle',
        createUserDisplayName: null,
      },
    ],
  },
  icons: ['WarningIcon', 'ReportIcon'],
  error: 1,
  warning: 1,
  messagetexts: [
    'Add-On Rate Record(s) found in GSU and not found in GDF Viewer:',
    'Rate comments exists - user review always required',
  ],
  highlightedCells: [],
};

// match, with one mis-matched add-on rate (only in GDF), diff on rate tier values, but has rate comments
export const scenario10 = {
  apiResponseFromRatesGsu: {
    compareStatus: 'ONLY_IN_GDF',
    effectiveFromDate: {
      gdfValue: '2022-01-01',
      gsuValue: '2022-01-05',
      compareStatus: 'ONLY_IN_GDF',
    },
    properties: {
      area: {
        code: {
          gdfValue: 'code',
          gsuValue: '',
          compareStatus: 'ONLY_IN_GDF',
        },
      },
      rateTierValues: [],
      addonRates: [
        {
          externalRateId: {
            gdfValue: null,
            gsuValue: 'e3c',
            compareStatus: 'N/A',
          },
          type: {
            id: {
              gdfValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              gsuValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'ART2',
              gsuValue: 'ART2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'HRA',
              gsuValue: 'HRA',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 50,
              gsuValue: 50,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          rateTierStructure: {
            id: {
              gdfValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              gsuValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'RATETIERSTRUCT2',
              gsuValue: 'RATETIERSTRUCT2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'Single/Family',
              gsuValue: 'Single/Family',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 20,
              gsuValue: 20,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          values: [
            {
              id: {
                gdfValue: null,
                gsuValue: '585fea0f-86ab-4f8b-94f4-c41194e74d46',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'EE',
                  gsuValue: 'EE',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Single',
                  gsuValue: 'Single',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 10,
                  gsuValue: 10,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '4.75',
                gsuValue: '5.00',
                compareStatus: 'NOT_EQUAL',
              },
              compareStatus: 'NOT_EQUAL',
            },
            {
              id: {
                gdfValue: null,
                gsuValue: 'e10399f9-3820-4701-b7d9-733a582b8f1d',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'F',
                  gsuValue: 'F',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Family',
                  gsuValue: 'Family',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 80,
                  gsuValue: 80,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '5.00',
                gsuValue: '5.00',
                compareStatus: 'EQUAL',
              },
              compareStatus: 'NOT_EQUAL',
            },
          ],
          compareStatus: 'ONLY_IN_GDF',
        },
      ],
    },
  },

  apiResponseFromReferential: {
    dentalDiscountedForPreventive: false,
    dentalVoluntary: false,
    comments: [
      {
        text: 'test comment',
        createDate: '2021-06-03T09:01:12',
        createUser: 'janagle',
        createUserDisplayName: null,
      },
    ],
  },
  icons: ['WarningAmberIcon', 'ReportIcon'],
  error: 2,
  warning: 0,
  messagetexts: [
    'Add-On Rate Record(s) found in GDF and not found in GSU:',
    'Rate comments exists - user review always required',
  ],
  highlightedCells: ['Single'],
};

// match, with one mis-matched add-on rate (only in GSU) and a second mis-matched add-on rate (only in GDF), but has rate comments and one diff in rate tier values
export const scenario11 = {
  apiResponseFromRatesGsu: {
    compareStatus: 'ONLY_IN_GDF',
    effectiveFromDate: {
      gdfValue: '2022-01-01',
      gsuValue: '2022-01-05',
      compareStatus: 'ONLY_IN_GDF',
    },
    properties: {
      area: {
        code: {
          gdfValue: 'code',
          gsuValue: '',
          compareStatus: 'ONLY_IN_GDF',
        },
      },
      rateTierValues: [],
      addonRates: [
        {
          externalRateId: {
            gdfValue: null,
            gsuValue: 'e3c',
            compareStatus: 'N/A',
          },
          type: {
            id: {
              gdfValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              gsuValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'ART2',
              gsuValue: 'ART2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'HRA',
              gsuValue: 'HRA',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 50,
              gsuValue: 50,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          rateTierStructure: {
            id: {
              gdfValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              gsuValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'RATETIERSTRUCT2',
              gsuValue: 'RATETIERSTRUCT2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'Single/Family',
              gsuValue: 'Single/Family',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 20,
              gsuValue: 20,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          values: [
            {
              id: {
                gdfValue: null,
                gsuValue: '585fea0f-86ab-4f8b-94f4-c41194e74d46',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'EE',
                  gsuValue: 'EE',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Single',
                  gsuValue: 'Single',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 10,
                  gsuValue: 10,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '4.75',
                gsuValue: '5.00',
                compareStatus: 'NOT_EQUAL',
              },
              compareStatus: 'NOT_EQUAL',
            },
            {
              id: {
                gdfValue: null,
                gsuValue: 'e10399f9-3820-4701-b7d9-733a582b8f1d',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'F',
                  gsuValue: 'F',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Family',
                  gsuValue: 'Family',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 80,
                  gsuValue: 80,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '5.00',
                gsuValue: '5.00',
                compareStatus: 'EQUAL',
              },
              compareStatus: 'NOT_EQUAL',
            },
          ],
          compareStatus: 'ONLY_IN_GDF',
        },
        {
          externalRateId: {
            gdfValue: null,
            gsuValue: 'e3c',
            compareStatus: 'N/A',
          },
          type: {
            id: {
              gdfValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              gsuValue: '897b281c-4995-2df4-e053-7b5f1cac92be',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'ART2',
              gsuValue: 'ART2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'HRA',
              gsuValue: 'HRA',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 50,
              gsuValue: 50,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          rateTierStructure: {
            id: {
              gdfValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              gsuValue: '8875e9da-805f-5135-e053-7b5f1cac3ec1',
              compareStatus: 'EQUAL',
            },
            code: {
              gdfValue: 'RATETIERSTRUCT2',
              gsuValue: 'RATETIERSTRUCT2',
              compareStatus: 'EQUAL',
            },
            name: {
              gdfValue: 'Single/Family',
              gsuValue: 'Single/Family',
              compareStatus: 'EQUAL',
            },
            sortOrder: {
              gdfValue: 20,
              gsuValue: 20,
              compareStatus: 'EQUAL',
            },
            compareStatus: 'EQUAL',
          },
          values: [
            {
              id: {
                gdfValue: null,
                gsuValue: '585fea0f-86ab-4f8b-94f4-c41194e74d46',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'EE',
                  gsuValue: 'EE',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Single',
                  gsuValue: 'Single',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 10,
                  gsuValue: 10,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '4.75',
                gsuValue: '5.00',
                compareStatus: 'NOT_EQUAL',
              },
              compareStatus: 'NOT_EQUAL',
            },
            {
              id: {
                gdfValue: null,
                gsuValue: 'e10399f9-3820-4701-b7d9-733a582b8f1d',
                compareStatus: 'N/A',
              },
              rateAttributeType: {
                id: {
                  gdfValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  gsuValue: '888d64f0-9e38-192c-e053-7f5f1cac798a',
                  compareStatus: 'EQUAL',
                },
                code: {
                  gdfValue: 'F',
                  gsuValue: 'F',
                  compareStatus: 'EQUAL',
                },
                name: {
                  gdfValue: 'Family',
                  gsuValue: 'Family',
                  compareStatus: 'EQUAL',
                },
                sortOrder: {
                  gdfValue: 80,
                  gsuValue: 80,
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              value: {
                gdfValue: '4.75',
                gsuValue: '5.00',
                compareStatus: 'NOT_EQUAL',
              },
              compareStatus: 'NOT_EQUAL',
            },
          ],
          compareStatus: 'ONLY_IN_GSU',
        },
      ],
    },
  },

  apiResponseFromReferential: {
    dentalDiscountedForPreventive: false,
    dentalVoluntary: false,
    comments: [
      {
        text: 'test comment',
        createDate: '2021-06-03T09:01:12',
        createUser: 'janagle',
        createUserDisplayName: null,
      },
    ],
  },
  icons: ['WarningAmberIcon', 'ReportIcon'],
  error: 2,
  warning: 1,
  messagetexts: [
    'Add-On Rate Record(s) found in GDF and not found in GSU:',
    'Rate comments exists - user review always required',
    'Add-On Rate Record(s) found in GSU and not found in GDF Viewer:',
  ],
  highlightedCells: ['Single'],
};

// match, with one mis-matched add-on rate (only in GSU) and a second mis-matched add-on rate (only in GDF), but has rate comments and one diff in rate tier values
export const scenario12 = {
  apiResponseFromRatesGsu: {
    compareStatus: 'ONLY_IN_GDF',
    effectiveFromDate: {
      gdfValue: '2022-01-01',
      gsuValue: '2022-01-05',
      compareStatus: 'ONLY_IN_GDF',
    },
    properties: {
      area: {
        code: {
          gdfValue: 'code',
          gsuValue: '',
          compareStatus: 'ONLY_IN_GDF',
        },
      },
      rateTierValues: [],
      addonRates: [],
    },
  },

  apiResponseFromReferential: {
    dentalDiscountedForPreventive: false,
    dentalVoluntary: false,
    comments: [],
  },
  icons: [],
  error: 0,
  warning: 0,
  messagetexts: [],
  highlightedCells: [],
};
