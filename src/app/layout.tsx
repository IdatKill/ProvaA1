import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material";

const emotionCache = createCache({ key: "css", prepend: true });
const theme = createTheme();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>


        {children}

        
      </body>
    </html>
  );


}
