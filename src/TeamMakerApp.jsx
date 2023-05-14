
import { HelmetProvider } from 'react-helmet-async';
// Routes
import { AppRouter } from './router/AppRouter'
// Theme
import ThemeProvider from './theme';
// Components
import { AuthProvider } from './auth'

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
