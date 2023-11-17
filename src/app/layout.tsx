'use client'

import MenuProvider from '@/shared/contexts/MenuContext';
import { CssBaseline } from '@mui/joy';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  fontFamily: {
    display: 'Pangram', // applies to `h1`–`h4`
    body: 'Lato', // applies to `title-*` and `body-*`
  },
  "colorSchemes": {
    "dark": {
      "palette": {
        "primary": {
          "50": "#fee4e9",
          "100": "#fcadbc",
          "200": "#fb768f",
          "300": "#f93f62",
          "400": "#f94668",
          "500": "#f70835",
          "600": "#c0062a",
          "700": "#89041e",
          "800": "#520312",
          "900": "#1b0106"
        }
      }
    },
    "light": {
      "palette": {
        "primary": {
          "50": "#e4ebfd",
          "100": "#afc4fa",
          "200": "#7a9df6",
          "300": "#4576f3",
          "400": "#0a3299",
          "500": "#104eef",
          "600": "#0c3dba",
          "700": "#092b85",
          "800": "#051a50",
          "900": "#02091b"
        }
      }
    }
  }
});

export default function RootLayout({children}:{children: React.ReactNode}) {
  return (
    <CssVarsProvider theme={theme} defaultMode='system'>
      <CssBaseline />
      <MenuProvider>
        <html lang="pt-BR">
          <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
            <link href="https://db.onlinewebfonts.com/c/56a82ed18dbcec3eaab8c012dea226cf?family=Pangram" rel="stylesheet" />
            <title>{process.env.NEXT_PUBLIC_PROJECT_NAME}</title>
          </head>
          <body>
            {children}
          </body>
        </html>
      </MenuProvider>
    </CssVarsProvider>
  );
}