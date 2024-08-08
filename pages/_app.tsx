import Layout from "@/components/Layout";
import { PortalProvider } from "@/providers/portal";
import { SnackbarProvider } from "@/providers/snackbar";
import { themeV1 } from "@/theme/v1";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <PortalProvider>
    <ThemeProvider theme={themeV1}>
      <SnackbarProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SnackbarProvider>
    </ThemeProvider>
  </PortalProvider>
}
