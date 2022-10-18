import { createTheme,ThemeProvider } from "@mui/material"
import { lightGreen } from "@mui/material/colors";
import { blueGrey } from "@mui/material/colors";
// const TEAL_COLOR = '#17637B';
const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen[500],
    },
    secondary:{
        main:blueGrey[500]
    }
  },
});
const CustomTheme = (props) => {
    const{children} = props
    return (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
  )
}

export default CustomTheme