import { Divider, Drawer, List, ListItem, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'




export const SideBar = ({ drawerWidth }) => {
  return (  
    
    <Box component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >

      <Drawer
        variant='permanent'
        open
        sx={{ 
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
         }}
      >

      <Toolbar>
         <Typography variant='h6' noWrap component='div'>
            Sidebar
         </Typography>
      </Toolbar>
      <Divider />

      <List>
        <ListItem>
          <Link className='menu-container' to="/profiles">
              <button className='icon' id='Profiles'>
                <img src='/icons/Profiles.svg' alt='profiles'/>  
              </button>
            </Link>
        </ListItem>
        <ListItem>
          <Link className='menu-container' to="/users">
          <button className='icon' id='Users'>
              <img src='/icons/Users.svg' alt='users'/>  
          </button>
          </Link>
        </ListItem>    
         <ListItem>
         <Link className='menu-container' to="/teams">
          <button className='icon' id='Teams'>
              <img src='/icons/Teams.svg' alt='teams'/>  
          </button>
          </Link>
         </ListItem>
         <ListItem>
          <Link className='menu-container' to="/settings">
            <button className='icon' id='Settings'>
              <img src='/icons/Setting.svg' alt='settings'/>  
            </button>
            </Link> 
         </ListItem>
      </List>
      </Drawer>
    </Box>

  )
}
