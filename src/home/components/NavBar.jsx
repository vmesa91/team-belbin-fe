
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../auth/context/AuthContext'
import { Logout } from '../../auth/components/Logout'

export const NavBar = ({ drawerWidth }) => {

  const {  user  } = useContext( AuthContext )

  return (
    <AppBar
      position='fixed'
      sx={{ 
         width: { sm: `calc(100% - ${ drawerWidth }px)` },
         ml: { sm: `${ drawerWidth }px)`  }
        }}
    >
      <Toolbar>
        <IconButton 
          color='inherit'
          edge='start'
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

          <Grid container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='h6' noWrap component='div'> {user?.name } </Typography>
              < Logout />
   {/*          <IconButton color='error'>
                <LogoutOutlined />
            </IconButton> */}
          </Grid> 
      </Toolbar>
    </AppBar>

 /*    <nav>
        <h4>
          {user?.name }
        </h4>
      <br/>
        < LogoutPage />
    </nav> */
  )
}
