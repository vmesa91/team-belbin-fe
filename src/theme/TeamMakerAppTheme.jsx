import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { lightTheme } from "./lightTheme"


export const TeamMakerAppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ lightTheme }>
    <CssBaseline />
        { children }
  </ThemeProvider>
  )
}
