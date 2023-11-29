'use client'
const { createTheme } = require("@mui/material");

export const theme = createTheme({
  palette:{
    primary:{
      main:"#07901E",
      light:"#56D16B",
      dark:"#266531",
      contrastText:"#FFFFFF",
    },
  },
  components:{
    MuiButton:{
      styleOverrides:{
        outlined:{backgroundColor:"#e6e6e6"}
      },
    }
  },
  typography:{
    button:{textTransform:"none",}
  }
})