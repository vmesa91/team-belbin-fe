
// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
//Helmet
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
        <Provider store={ store }>
          <ThemeProvider>
            < AppRouter />
          </ThemeProvider>
        </Provider>
      </ AuthProvider >
    </HelmetProvider>

  )
}
