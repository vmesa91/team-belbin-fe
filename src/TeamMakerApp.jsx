
import { AuthProvider } from './auth'
import { AppRouter } from './router/AppRouter'
import { TeamMakerAppTheme } from './theme/TeamMakerAppTheme'

export const TeamMakerApp = () => {
  return (
    < AuthProvider >
      <TeamMakerAppTheme>
      < AppRouter />
      </TeamMakerAppTheme>
    </ AuthProvider >

  )
}
