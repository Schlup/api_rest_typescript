"use client"
import { createTheme } from "@mui/material/styles";
import { SUSE } from "next/font/google";

const SUSEMono = SUSE({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: SUSEMono.style.fontFamily,
  },
});

export default theme;
