import { createTheme } from "@mui/material";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

export const themeV1 = createTheme({
  palette: {
    primary: {
      main: "#0081AD",
      light: "#D9ECF3",
      dark: "#004B66",
    },
    secondary: {
      main: "#00A766",
      light: "#DCF7EC",
      dark: "#00663A",
    },
    text: {
      primary: "#00131A",
    },
    error: {
      main: "#E64646",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});
