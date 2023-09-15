import React from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { Container, CssBaseline } from "@mui/material";
import { MapBg } from "./MapBg";

export const metadata = {
  title: "Savings calculator",
  description: "Easy Pricing. Guaranteed ROI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <CssBaseline />
          <Container maxWidth="lg" component="main">
            {children}
          </Container>
          <MapBg />
        </ThemeRegistry>
      </body>
    </html>
  );
}
