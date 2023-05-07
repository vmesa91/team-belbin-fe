import { Stack, List } from '@mui/material'
import { NavList } from './NavList'


export const NavBarSection = ({ data = [], ...other }) => {

    return (
        <Stack {...other}>
            <List disablePadding sx={{ px: 2 }}>
                { data.map((list, index ) => (
                    <NavList key={index} data={list} depth={1} hasChild={!!list.children}/>
                ) )}
            </List>
        </Stack>
    )
}
