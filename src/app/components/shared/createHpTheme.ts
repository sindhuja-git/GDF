import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';

import merge from 'deepmerge';

const BASE_FONT_FAMILY = '"Roboto", "Helvetica", "Arial", sans-serif';

function round(value: number) {
  return Math.round(value * 1e5) / 1e5;
}

type Casing = {
  textTransform: string;
};

export const hpColors = {
  hpPrimaryLight: '#7f5fcf',
  hpPrimaryBase: '#60489d',
  hpPrimaryDark: '#442e7f',
  hpSecondaryLight: '#ad489d',
  hpSecondaryBase: '#843177',
  hpSecondaryDark: '#6e2863',
  hpLinkBase: '#006dca',
  hpLinkDark: '#02569e',
  hpLinkXdark: '#03417b',
  hpActionBase: '#007e3e',
  hpActionDark: '#006532',
  hpActionXdark: '#044b27',
  hpSuccessBase: '#008003',
  hpInfoBase: '#00759f',
  hpWarningBase: '#bf4800',
  hpErrorBase: '#d91535',
  hpNeutralXxlight: '#ffffff',
  hpNeutralXlight: '#f0f2f4',
  hpNeutralLight: '#dddfe5',
  hpNeutralBase: '#ccced5',
  hpNeutralDark: '#696e79',
  hpNeutralXdark: '#3e4451',
  hpBackgroundBase: '#ffffff',
  hpTextXlight: '#ffffff',
  hpTextLight: '#696e79',
  hpTextBase: '#3e4451',
};

const highDensity = {
  props: {
    MuiButton: {
      size: 'small',
    },
    MuiFilledInput: {
      margin: 'dense',
    },
    MuiFormControl: {
      margin: 'dense',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiListItem: {
      dense: true,
    },
    MuiOutlinedInput: {
      margin: 'dense',
    },
    MuiFab: {
      size: 'small',
    },
    MuiTable: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
    },
    MuiToolbar: {
      variant: 'dense',
    },
  },
  overrides: {
    MuiIconButton: {
      sizeSmall: {
        // minimal touch target hit spacing
        marginLeft: 4,
        marginRight: 4,
        padding: 12,
      },
    },
  },
};

const generateTypographyVariants = (typography?: TypographyOptions) => {
  const fontSize = typography?.fontSize ?? 14;
  const htmlFontSize = typography?.htmlFontSize ?? 16;
  const coef = fontSize / 14;
  const fontWeightHigh = 700;
  const fontWeightNormal = 400;
  const fontWeightLight = 300;

  const pxToRem = (size: number) => `${(size / htmlFontSize) * coef}rem`;
  const buildVariant = (
    fontWeight: number,
    size: number,
    lineHeight: number,
    letterSpacing: number,
    casing?: Casing
  ) => ({
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight,
    letterSpacing: `${round(letterSpacing / size)}em`,
    ...casing,
  });

  return {
    h1: buildVariant(fontWeightHigh, 26, 1.167, -1.5),
    h2: buildVariant(fontWeightHigh, 22, 1.2, -0.5),
    h3: buildVariant(fontWeightHigh, 18.4, 1.167, 0),
    h4: buildVariant(fontWeightNormal, 18, 1.235, 0.25),
    h5: buildVariant(fontWeightHigh, 16.4, 1.334, 0),
    h6: buildVariant(fontWeightLight, 16, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightHigh, 13.6, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightHigh, 12, 1.57, 0.1),
    body1: buildVariant(fontWeightNormal, 14, 1.5, 0.15),
    body2: buildVariant(fontWeightLight, 14, 1.43, 0.15),
    button: buildVariant(fontWeightHigh, 14, 1.75, 0.4, {
      textTransform: 'none',
    }),
  };
};

const createHpTheme = (dense?: boolean, options?: ThemeOptions) => {
  const typographyVariants = generateTypographyVariants(
    options?.typography as TypographyOptions
  );
  const baseOptions = {
    typography: {
      fontFamily: BASE_FONT_FAMILY,
      ...typographyVariants,
    },
    palette: {
      primary: {
        main: hpColors.hpLinkBase,
        dark: hpColors.hpLinkDark,
        /**
         * TODO define lighter color
         */
        light: hpColors.hpLinkBase,
      },
      secondary: {
        main: hpColors.hpPrimaryBase,
        dark: hpColors.hpPrimaryDark,
        light: hpColors.hpPrimaryLight,
      },
      error: {
        main: hpColors.hpErrorBase,
      },
      warning: {
        main: hpColors.hpWarningBase,
      },
      info: {
        main: hpColors.hpInfoBase,
      },
      success: {
        main: hpColors.hpSuccessBase,
        dark: hpColors.hpActionDark,
        light: hpColors.hpActionBase,
      },
      text: {
        primary: hpColors.hpTextBase,
        secondary: hpColors.hpTextLight,
      },
      action: {
        active: hpColors.hpNeutralXdark,
        disabled: hpColors.hpNeutralDark,
        disabledBackground: hpColors.hpNeutralBase,
        selected: hpColors.hpNeutralLight,
        hover: hpColors.hpNeutralXlight,
      },
      divider: hpColors.hpNeutralBase,
      type: 'light',
      ...hpColors,
    },
    shape: { borderRadius: 2 },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          ':root': {
            fontSize: 16,
          },
        },
      },
      // Custom styles go here
    },
  };
  const newTheme = options
    ? merge(baseOptions, options as object)
    : baseOptions;

  return createMuiTheme(newTheme as ThemeOptions, dense ? highDensity : {});
};

export default createHpTheme;
