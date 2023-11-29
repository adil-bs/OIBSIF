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
    divider:'black',
  },
  components:{
    MuiButton:{
      defaultProps:{
        variant:'contained',
      }
    },
  },
})