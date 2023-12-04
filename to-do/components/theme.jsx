'use client'
import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette:{
    primary:{
      main:"#17a420",
      light:"#56D16B",
      dark:"#037F03",
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
    MuiDialog:{
      styleOverrides:{
        paper:{
          background: 'linear-gradient(to right, #DAE7F3, #D4E9F2,#D5DDE2)',
          borderRadius:'15px',
        },  
      },
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