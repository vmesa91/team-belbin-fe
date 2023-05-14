import { Avatar, Box, Drawer, Link, alpha, Typography } from '@mui/material'
import styled from '@emotion/styled'
import useResponsive from '../../../hooks/useResponsive'

import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

// mock
import account from '../../../_mock/account'
import { NavBarSection } from '../NavSection/NavBarSection'
import { navTabs } from './navTabs'

const NAV_WIDTH = 280

const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
}))

// ----------------------------------------------------------------------

export const NavBar = ({ openNav, onCloseNav }) => {
    const { pathname } = useLocation()
    const isDesktop = useResponsive('up', 'lg')

    useEffect(() => {
        if (openNav) {
            onCloseNav()
        }
    }, [pathname])

    const renderContent = (
        <>
            <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }} />

            <Box sx={{ mb: 5, mx: 2.5 }}>
                <Link underline="none">
                    <StyledAccount>
                        <Avatar src={account.photoURL} alt="photoURL" />
                        <Box sx={{ ml: 2 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{ color: 'text.primary' }}
                            >
                                {account.displayName}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary' }}
                            >
                                {account.role}
                            </Typography>
                        </Box>
                    </StyledAccount>
                </Link>
            </Box>

            <NavBarSection data={navTabs} />
        </>
    )

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV_WIDTH },
            }}
            >
            {isDesktop ? (
                <Drawer
                    open
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            width: NAV_WIDTH,
                            bgcolor: 'transparent',
                            borderRightStyle: 'dashed',
                        },
                    }}
                >
                    {renderContent}
                    
                </Drawer>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    PaperProps={{
                        sx: { width: NAV_WIDTH },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    )
}
