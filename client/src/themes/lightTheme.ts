import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gradient?: string;
    complexGradient?: string;
  }
  interface PaletteOptions {
    gradient?: string;
    complexGradient?: string;
  }
}

const lightTheme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF"
    },
    primary: {
      main: "#103939"
    },
    secondary: {
      main: "#103939"
    },
    gradient: "linear-gradient(to left bottom, #103939, #103939)",
    complexGradient: "linear-gradient(95deg, #103939 30%, #207878 60%, #103939 90%)"
  }
});

export default lightTheme;
