import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { NavBar , SideBar} from '../components'


const drawerWidth = 240

export const HomeLayout = ( { children } ) => {
  return (
    <Box sx={{ display: 'flex' }} >
        < NavBar drawerWidth={drawerWidth} />
        < SideBar drawerWidth={drawerWidth} />   

        <Box component='main'
            sx={{ flexGlow: 1, p: 3 }}
        >
            < Toolbar />
            { children }

        </Box>

    </Box>

  )
}
