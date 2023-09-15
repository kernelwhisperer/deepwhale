import { Roboto, Roboto_Mono } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto_Mono({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1c1e25",
      paper: "#1c1e25",
    },
    primary: {
      main: "#f49bf5",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))":
            {
              backdropFilter: "blur(4px)",
            },
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))":
            {
              backdropFilter: "blur(4px)",
            },
          background: "transparent",
          // backgroundColor: "var(--mui-palette-background-glass)",
          // border: "1px solid",
          // borderColor: "var(--mui-palette-primary-main)",
          // borderRadius: 0,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: "none",
          boxShadow: "none"
        }
      }
    }
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
