import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#F5F5F7'
        },
        secondary: {
            main: '#FFEAE4'   
        },
        error: {
            main: red.A400
        }

    }
})