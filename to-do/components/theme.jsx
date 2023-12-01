'use client'
import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette:{
    primary:{
      main:"#17a420",
      light:"#56D16B",
      dark:"#006600",
      contrastText:"#FFFFFF",
    },
    divider:'gray',
  },
  components:{
    MuiButton:{
      defaultProps:{
        variant:'contained',
      }
    },
  },
  breakpoints:{
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
})