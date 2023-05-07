// component
import { SvgColor } from '../SvgColor/SvgColor'

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

export const navTabs = [
  {
    title: 'Dashboard',
    path: '/home/dashboard',
    icon: icon('ic_analytics')
  },
  {
    title: 'Perfiles',
    path: '/home/profile',
    icon: icon('ic_profile'),
    children: [
        {
        title: 'Crear Perfiles',
        path: '/profile/createProfile',
        },
      {
        title: 'Gestionar Perfiles',
        path: '/profile/tableProfiles',
      },
  ]
  },
  {
    title: 'Miembros',
    path: '/home/member',
    icon: icon('ic_member'),
    children: [
      {
      title: 'Crear Miembros',
      path: '/member/createMember',
      },
    {
      title: 'Gestionar Miembros',
      path: '/member/tableMembers',
    },
]
  },
  {
    title: 'Equipos',
    path: '/home/team',
    icon: icon('ic_teams'),
    children: [
      {
      title: 'Crear Equipos',
      path: '/team/createTeam',
      },
    {
      title: 'Gestionar Equipos',
      path: '/team/tableTeams',
    },
]
  },
  {
    title: 'Administración',
    path: '/home/settings',
    icon: icon('ic_admin'),
    children: [
      {
      title: 'Crear Datos',
      path: '/data/createData',
      }
]
  },
]
