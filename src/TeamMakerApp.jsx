
import { HelmetProvider } from 'react-helmet-async';
// Routes
import { AppRouter } from './router/AppRouter'
// Theme
import ThemeProvider from './theme';
// Components
import { AuthProvider } from './auth'

export const TeamMakerApp = () => {
  return (
    <HelmetProvider>
      < AuthProvider >
        <ThemeProvider>
        < AppRouter />
        </ThemeProvider>
      </ AuthProvider >
    </HelmetProvider>

  )
}
