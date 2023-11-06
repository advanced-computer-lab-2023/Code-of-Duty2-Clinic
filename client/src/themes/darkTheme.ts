import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gradient?: string;
  }
  interface PaletteOptions {
    gradient?: string;
  }
}

const darkTheme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#1B1B1B',
      paper: '#1B1B1B',
    },
    primary: {
      main: '#103939',
    },
    secondary: {
      main: '#103939',
    },
    gradient: 'linear-gradient(to top, #103939, #103939)'
  },
});

export default darkTheme;
