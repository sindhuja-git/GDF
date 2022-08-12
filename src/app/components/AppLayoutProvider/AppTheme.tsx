import createHpTheme from '../shared/createHpTheme';

const appColors = {
  lightBlue: '#265077',
  darkBlue: '#022140',
  darkGreen: '#1e4258',
  lightGreen: '#2d5f5d',
  green: '#658D1B',
  white: '#fff',
  black: '#000',
  lightGray: '#F0F2F4',
  orangeDiff: '#ffc266',
};

export const appTheme = createHpTheme(true, {
  palette: {
    type: 'light',
    secondary: {
      main: appColors.lightGray,
    },
    warning: {
      main: appColors.orangeDiff,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
          overflow: 'hidden',
          width: '100%' /* restrict the page width to viewport */,
        },
      },
    },
    MuiListItem: {
      root: {
        marginLeft: '8px',
      },
      gutters: {
        paddingLeft: '0px ',
        paddingRight: '0px ',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: 'bold',
      },
    },
    MuiButton: {
      containedSecondary: {
        backgroundColor: '#006dca',
        color: 'white',
        '&:hover': {
          backgroundColor: '#006dca',
        },
      },
    },
  },
});
