export interface CustomPalette {
  [key: string]: {
    black?: string;
    white?: string;
    light?: string;
    main?: string;
    dark?: string;
  };
}

export interface CustomThemeOptions {
  palette: CustomPalette;
}

const theme: CustomThemeOptions = {
  palette: {
    common: {
      black: '#212121',
      white: '#efefef',
    },
    // Blue
    primary: {
      light: '#5e73ff',
      main: '#0048c5',
      dark: '#00229b',
    },
    // Purple
    secondary: {
      light: '#9966ff',
      main: '#5566ff',
      dark: '#4436ff',
    },
    // Green
    success: {
      light: '#49b063',
      main: '#008037',
      dark: '#00520c',
    },
    // Yellow
    warning: {
      light: '#ffff7a',
      main: '#ffd147',
      dark: '#c8a002',
    },
    // Red
    error: {
      light: '#ff718d',
      main: '#d13d60',
      dark: '#9a0037',
    },
    gold: {
      light: '#fcef43',
      main: '#f6d42a',
    },
    // Silver
    info: {
      light: '#eee9e9',
      main: '#c5bbba',
      dark: '#948b8a',
    },
    bronze: {
      light: '#c09278',
      main: '#8f5536',
    },
    merit: {
      light: '#fb7a9b',
      main: '#ed4f77',
    },
  },
};
export default theme;
