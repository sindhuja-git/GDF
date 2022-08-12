/* eslint-disable no-param-reassign */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import render from 'utils/testing/render';

import createMSWRestServer from 'utils/testing/createMSWRestServer';

import { client } from 'app/Authenticated/components/AuthenticatedAppProvider';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LaunchRateInfo from '../screens/RateInfo/components/LaunchRateInfo';
import useApiCall from '../shared/useApiCall';
import { FetchStates } from '../shared/constants';

jest.mock(
  'app/Authenticated/screens/Group/screens/Launch/shared/useLaunchFormattedParams',
  () => () => ({ packageCode: 'abc123' })
);

const mockCallResponseWithEqualRateTierSelection = ({ url }) => {
  if (url.includes('rates/gsu')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
        compareStatus: 'ONLY_IN_GDF',

        properties: {
          addonRates: [
            {
              type: {
                name: {
                  compareStatus: 'NOT_EQUAL',
                  gdfValue: 'HRA',
                  gsuValue: 'MEDICAL',
                },
                code: {
                  compareStatus: 'EQUAL',
                  gdfValue: 'ART2',
                  gsuValue: 'ART2',
                },
                values: [
                  {
                    value: {
                      gdfValue: null,
                      gsuValue: '4.75',
                    },
                  },
                  {
                    value: {
                      gdfValue: '2',
                      gsuValue: '4.75',
                    },
                  },
                ],
              },

              rateTierStructure: {
                name: {
                  gdfValue: 'Single/Family',
                  gsuValue: 'Single/Family',
                  compareStatus: 'EQUAL',
                },
                compareStatus: 'EQUAL',
              },
              values: [
                {
                  rateAttributeType: {
                    name: {
                      gdfValue: 'Single',
                      gsuValue: 'Single',
                      compareStatus: 'EQUAL',
                    },
                    code: {
                      compareStatus: 'NOT_EQUAL',
                      gdfValue: 'ART1',
                      gsuValue: 'ART2',
                    },
                  },
                  value: {
                    gdfValue: '4.75',
                    gsuValue: '2',
                    compareStatus: 'NOT_EQUAL',
                  },
                  compareStatus: 'NOT_EQUAL',
                },
              ],
            },
          ],
        },
      },
    };
  }

  if (url.includes('rate/referential')) {
    return {
      currentState: FetchStates.FINISHED,
      response: true,
    };
  }
  if (url.includes('/rates')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
        gdfName: 'name',
      },
    };
  }

  // mock diff call responses
  return {
    currentState: FetchStates.FINISHED,
    response: 'NOT_EQUAL',
  };
};
const mockCallResponse = ({ url }) => {
  if (url.includes('rates/gsu')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
        compareStatus: 'ONLY_IN_GDF',
        effectiveFromDate: {
          gdfValue: '2022-01-01',
          gsuValue: null,
          compareStatus: 'ONLY_IN_GDF',
        },
        effectiveToDate: {
          gdfValue: '2022-12-31',
          gsuValue: null,
          compareStatus: 'ONLY_IN_GDF',
        },
        planRateType: {
          code: {
            gdfValue: 'code',
            gsuValue: '',
            compareStatus: 'ONLY_IN_GDF',
          },
          name: {
            gdfValue: 'name',
            gsuValue: '',
            compareStatus: 'ONLY_IN_GDF',
          },
          id: {
            gdfValue: 'id',
            gsuValue: '',
            compareStatus: 'ONLY_IN_GDF',
          },
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
              type: {
                name: {
                  compareStatus: 'NOT_EQUAL',
                  gdfValue: 'HRA',
                  gsuValue: 'MEDICAL',
                },
                code: {
                  compareStatus: 'EQUAL',
                  gdfValue: 'ART2',
                  gsuValue: 'ART2',
                },
              },
              values: [
                {
                  rateAttributeType: {
                    code: {
                      gdfValue: 'EE',
                      gsuValue: 'EE',
                      compareStatus: 'EQUAL',
                    },
                    id: {
                      compareStatus: 'EQUAL',
                      gdfValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                      gsuValue: '888d64f0-9e0c-192c-e053-7f5f1cac798a',
                    },
                    name: {
                      gdfValue: 'Single',
                      gsuValue: 'Single',
                      compareStatus: 'EQUAL',
                    },
                    value: {
                      gdfValue: '1',
                      gsuValue: '1',
                      compareStatus: 'EQUAL',
                    },
                    sortOrder: {
                      gdfValue: 10,
                      gsuValue: 10,
                      compareStatus: 'EQUAL',
                    },

                    compareStatus: 'EQUAL',
                  },
                },
              ],
              rateTierStructure: {
                name: {
                  gdfValue: 'Single/Family',
                  gsuValue: 'Single/Single+1/Family',
                  compareStatus: 'NOT_EQUAL',
                },
                compareStatus: 'NOT_EQUAL',
              },
            },
          ],
        },
      },
    };
  }
  if (url.includes('rate/referential')) {
    return {
      currentState: FetchStates.FINISHED,
      response: true,
    };
  }
  if (url.includes('/rates')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
        gdfName: 'name',
      },
    };
  }

  // mock diff call responses
  return {
    currentState: FetchStates.FINISHED,
    response: 'NOT_EQUAL',
  };
};

const mockCallResponseWithCompareStatusNotInGdfAndValidGsuEffectiveFromDate = ({
  url,
}) => {
  if (url.includes('rates/gsu')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
        compareStatus: 'ONLY_IN_GDF',
        effectiveFromDate: {
          gdfValue: '2022-01-01',
          gsuValue: '2022-01-01',
          compareStatus: 'ONLY_IN_GDF',
        },
      },
    };
  }
  if (url.includes('rate/referential')) {
    return {
      currentState: FetchStates.FINISHED,
      response: true,
    };
  }
  if (url.includes('/rates')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
        gdfName: 'name',
      },
    };
  }

  // mock diff call responses
  return {
    currentState: FetchStates.FINISHED,
    response: 'NOT_EQUAL',
  };
};

const mockCallResponseAddonRateFoundInGsuNotInGdf = ({ url }) => {
  if (url.includes('rates/gsu')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
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
          rateTierValues: [],
          addonRates: [
            {
              compareStatus: 'ONLY_IN_GSU',
              type: {
                name: {
                  compareStatus: 'NOT_EQUAL',
                  gdfValue: 'HRA',
                  gsuValue: 'BROKER',
                },
                code: {
                  compareStatus: 'EQUAL',
                  gdfValue: 'ART2',
                  gsuValue: 'ART2',
                },
              },
              rateTierStructure: {
                name: {
                  gdfValue: 'Single/Family',
                  gsuValue: 'Single/Single+1/Family',
                  compareStatus: 'NOT_EQUAL',
                },
                compareStatus: 'NOT_EQUAL',
              },
            },
          ],
        },
      },
    };
  }
  if (url.includes('rate/referential')) {
    return {
      currentState: FetchStates.FINISHED,
      response: true,
    };
  }
  if (url.includes('/rates')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
        gdfName: 'name',
      },
    };
  }

  // mock diff call responses
  return {
    currentState: FetchStates.FINISHED,
    response: 'NOT_EQUAL',
  };
};

const mockCallResponseAddonRateFoundInGdfNotInGsu = ({ url }) => {
  if (url.includes('rates/gsu')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
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
          rateTierValues: [],
          addonRates: [
            {
              compareStatus: 'ONLY_IN_GDF',
              type: {
                name: {
                  compareStatus: 'NOT_EQUAL',
                  gdfValue: 'HRA',
                  gsuValue: 'MEDICAL',
                },
                code: {
                  compareStatus: 'EQUAL',
                  gdfValue: 'ART2',
                  gsuValue: 'ART2',
                },
              },
              rateTierStructure: {
                name: {
                  gdfValue: 'Single/Family',
                  gsuValue: 'Single/Single+1/Family',
                  compareStatus: 'NOT_EQUAL',
                },
                compareStatus: 'NOT_EQUAL',
              },
            },
          ],
        },
      },
    };
  }
  if (url.includes('rate/referential')) {
    return {
      currentState: FetchStates.FINISHED,
      response: true,
    };
  }
  if (url.includes('/rates')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
        gdfName: 'name',
      },
    };
  }

  // mock diff call responses
  return {
    currentState: FetchStates.FINISHED,
    response: 'NOT_EQUAL',
  };
};

const mockCallResponseAddonRateFoundInGdfNotInGsuOrViceVersa = ({ url }) => {
  if (url.includes('rates/gsu')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
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
          rateTierValues: [],
          addonRates: [
            {
              compareStatus: 'ONLY_IN_GDF',
              type: {
                name: {
                  compareStatus: 'NOT_EQUAL',
                  gdfValue: 'HRA',
                  gsuValue: 'MEDICAL',
                },
                code: {
                  compareStatus: 'EQUAL',
                  gdfValue: 'ART2',
                  gsuValue: 'ART2',
                },
              },
              rateTierStructure: {
                name: {
                  gdfValue: 'Single/Family',
                  gsuValue: 'Single/Single+1/Family',
                  compareStatus: 'NOT_EQUAL',
                },
                compareStatus: 'NOT_EQUAL',
              },
            },
            {
              compareStatus: 'ONLY_IN_GSU',
              type: {
                name: {
                  compareStatus: 'NOT_EQUAL',
                  gdfValue: 'BROKER',
                  gsuValue: 'MEDICAL',
                },
                code: {
                  compareStatus: 'EQUAL',
                  gdfValue: 'ART2',
                  gsuValue: 'ART2',
                },
              },
              rateTierStructure: {
                name: {
                  gdfValue: 'Single/Family',
                  gsuValue: 'Single/Single+1/Family',
                  compareStatus: 'NOT_EQUAL',
                },
                compareStatus: 'NOT_EQUAL',
              },
            },
          ],
        },
      },
    };
  }
  if (url.includes('rate/referential')) {
    return {
      currentState: FetchStates.FINISHED,
      response: true,
    };
  }
  if (url.includes('/rates')) {
    return {
      currentState: FetchStates.FINISHED,
      response: {
        gdfName: 'name',
      },
    };
  }

  // mock diff call responses
  return {
    currentState: FetchStates.FINISHED,
    response: 'NOT_EQUAL',
  };
};

jest.mock('../shared/useApiCall');
const mswServer = createMSWRestServer();

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset Apollo cache
beforeEach(() => client.resetStore());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

const mockStore = configureStore();
const baseStore = {
  rateSummary: {
    rateSummary: [
      {
        planId: 'planId',
        gdfName: 'gdfName',
        packageCode: 'abc123',
        compareStatus: 'EQUAL',
      },
      {
        planId: 'planId1',
        gdfName: 'gdfName1',
        packageCode: 'abc123',
        compareStatus: 'NOT_COMPARABLE',
      },
    ],
  },
};

describe('Rate Info - plan details section tests, alert not present', () => {
  test('renders rate Info - rate details', async () => {
    (useApiCall as jest.Mock).mockImplementation(mockCallResponse);
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={mockStore(baseStore)}>
          <LaunchRateInfo load={false} err={false} />
        </Provider>
      );
    });
    expect(await screen.findByText('GDF Name')).toBeInTheDocument();
    expect(await screen.findByText(/Plan Begin Date/i)).toBeInTheDocument();
    expect(await screen.findByText(/Plan End Date/i)).toBeInTheDocument();
  });

  test('renders Rates Info - rate details, addon rates no differences', async () => {
    (useApiCall as jest.Mock).mockImplementation(mockCallResponse);

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={mockStore(baseStore)}>
          <LaunchRateInfo load={false} err={false} />
        </Provider>
      );
    });
    expect(await screen.findByText('GDF Name')).toBeInTheDocument();
    expect(await screen.findByText(/Begin Date/i)).toBeInTheDocument();
    expect(await screen.findByText(/End Date/i)).toBeInTheDocument();
  });

  test('renders Rates Info - chek add on rates section and labels present', async () => {
    (useApiCall as jest.Mock).mockImplementation(mockCallResponse);

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={mockStore(baseStore)}>
          <LaunchRateInfo load={false} err={false} />
        </Provider>
      );
    });
    expect(await screen.findByText('Add-on Rates')).toBeInTheDocument();
    expect(await screen.findByText(/Add-on Rate Type/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Rate-Tiers Selection/i)
    ).toBeInTheDocument();
  });

  test('Add on rates section- Addon ratetierselection is not equal to that of GDF', async () => {
    (useApiCall as jest.Mock).mockImplementation(mockCallResponse);

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      const { container } = render(
        <Provider store={mockStore(baseStore)}>
          <LaunchRateInfo load={false} err={false} />
        </Provider>
      );
      const backgroundHighlight = container.querySelector(
        '#background-highlighted-rateTiersSelection'
      );
      expect(await screen.findByText('Add-on Rates')).toBeInTheDocument();
      expect(await screen.findByText(/Add-on Rate Type/i)).toBeInTheDocument();
      expect(
        await screen.findByText(/Rate-Tiers Selection/i)
      ).toBeInTheDocument();
      expect(backgroundHighlight).toBeInTheDocument();
    });
  });

  test('Add on rates section- Addon ratetierselection is equal to that of GDF - No highlight is seen', async () => {
    (useApiCall as jest.Mock).mockImplementation(
      mockCallResponseWithEqualRateTierSelection
    );

    await act(async () => {
      const { container } = render(
        <Provider store={mockStore(baseStore)}>
          <LaunchRateInfo load={false} err={false} />
        </Provider>
      );
      const backgroundHighlight = container.querySelector(
        '#background-highlighted-rateTiersSelection'
      );
      expect(await screen.findByText('Add-on Rates')).toBeInTheDocument();
      expect(await screen.findByText(/Add-on Rate Type/i)).toBeInTheDocument();
      expect(
        await screen.findByText(/Rate-Tiers Selection/i)
      ).toBeInTheDocument();

      expect(backgroundHighlight).not.toBeInTheDocument();
    });
  });

  test('Add on rates section- Addon ratetierselection is equal to that of GDF but values are different - highlight is seen', async () => {
    (useApiCall as jest.Mock).mockImplementation(
      mockCallResponseWithEqualRateTierSelection
    );

    await act(async () => {
      const { container } = render(
        <Provider store={mockStore(baseStore)}>
          <LaunchRateInfo load={false} err={false} />
        </Provider>
      );
      const backgroundHighlight = container.querySelector(
        '#background-highlighted-RateValueDisplay'
      );
      expect(await screen.findByText('Add-on Rates')).toBeInTheDocument();
      expect(await screen.findByText(/Add-on Rate Type/i)).toBeInTheDocument();
      expect(
        await screen.findByText(/Rate-Tiers Selection/i)
      ).toBeInTheDocument();
      expect(backgroundHighlight).toBeInTheDocument();
    });
  });

  test('If compare status is "ONLY_IN_GDF", Show a red warning box with message - GDF Viewer could not accurately compare this rate', async () => {
    (useApiCall as jest.Mock).mockImplementation(mockCallResponse);

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={mockStore(baseStore)}>
          <LaunchRateInfo load={false} err={false} />
        </Provider>
      );
    });
    expect(
      await screen.findByText(
        'GDF Viewer could not accurately compare this rate'
      )
    ).toBeInTheDocument();

    const warningAmberIcon = screen.getByTestId('WarningAmberIcon');
    expect(warningAmberIcon).toBeInTheDocument();
  });

  test('Warning Indicator tests - If compare status is "ONLY_IN_GDF" and effectiveFrom Date gsuValue is null, Show a red warning box with message - GDF Viewer could not accurately compare this rate', async () => {
    (useApiCall as jest.Mock).mockImplementation(mockCallResponse);

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={mockStore(baseStore)}>
          <LaunchRateInfo load={false} err={false} />
        </Provider>
      );
    });
    expect(
      await screen.findByText(
        'GDF Viewer could not accurately compare this rate'
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        'GDF Viewer could not accurately compare this rate'
      )
    ).toBeInTheDocument();
    const warningAmberIcon = screen.getByTestId('WarningAmberIcon');
    expect(warningAmberIcon).toBeInTheDocument();
  });

  test('Warning Indicator tests - If compare status is "ONLY_IN_GDF" and effectiveFrom Date gsuValue is not null, do not show a red warning box with message - GDF Viewer could not accurately compare this rate', async () => {
    (useApiCall as jest.Mock).mockImplementation(
      mockCallResponseWithCompareStatusNotInGdfAndValidGsuEffectiveFromDate
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={mockStore(baseStore)}>
          <LaunchRateInfo load={false} err={false} />
        </Provider>
      );
    });
    expect(
      await screen.queryByText(
        'GDF Viewer could not accurately compare this rate'
      )
    ).not.toBeInTheDocument();

    const warningAmberIcon = screen.queryByTestId('WarningAmberIcon');
    expect(warningAmberIcon).not.toBeInTheDocument();
  });

  test('Warning Indicator tests - when addonrate is found in gsu but not in gdf ', async () => {
    (useApiCall as jest.Mock).mockImplementation(
      mockCallResponseAddonRateFoundInGsuNotInGdf
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={mockStore(baseStore)}>
          <LaunchRateInfo load={false} err={false} />
        </Provider>
      );
    });
    expect(
      await screen.queryByText(
        'Add-On Rate Record(s) found in GSU and not found in GDF Viewer:'
      )
    ).toBeInTheDocument();
    expect(await screen.queryByText('BROKER')).toBeInTheDocument();
  });

  test('Warning Indicator tests - when addonrate is found in gdf but not in gsu ', async () => {
    (useApiCall as jest.Mock).mockImplementation(
      mockCallResponseAddonRateFoundInGdfNotInGsu
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={mockStore(baseStore)}>
          <LaunchRateInfo load={false} err={false} />
        </Provider>
      );
    });

    expect(
      await screen.queryByText(
        'Add-On Rate Record(s) found in GDF and not found in GSU:'
      )
    ).toBeInTheDocument();
  });

  test('Warning Indicator tests - when addonrate is found in gdf but not in gsu and vice versa', async () => {
    (useApiCall as jest.Mock).mockImplementation(
      mockCallResponseAddonRateFoundInGdfNotInGsuOrViceVersa
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <Provider store={mockStore(baseStore)}>
          <LaunchRateInfo load={false} err={false} />
        </Provider>
      );
    });
    expect(
      await screen.queryByText(
        'Add-On Rate Record(s) found in GSU and not found in GDF Viewer:'
      )
    ).toBeInTheDocument();
    expect(
      await screen.queryByText(
        'Add-On Rate Record(s) found in GDF and not found in GSU:'
      )
    ).toBeInTheDocument();
  });
});
