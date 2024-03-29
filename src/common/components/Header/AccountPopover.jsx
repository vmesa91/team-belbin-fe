import { Avatar, Box, Divider, IconButton, MenuItem, Popover, Typography, alpha } from "@mui/material"
import account from '../../../_mock/account'
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/store/auth/authThunk";


export const AccountPopover = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { user } = useSelector( state => state.authStore )

    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleLogout = async () => {
        try {
          
          dispatch( logout() )
          handleClose();
        } catch (error) {
          console.error(error);
        }
      };

    const handleClickItem = (path) => {
        handleClose();
        navigate(path);
    };  

    return (
        <>
            <IconButton 
                onClick={handleOpen}
                sx={{
                p: 0,
                ...(open && {
                    '&:before': {
                    zIndex: 1,
                    content: "''",
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    position: 'absolute',
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                    },
                }),
            }}>
               <Avatar src={user.image} alt="photoURL"/>
            </IconButton>

            <Popover 
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                    p: 0,
                    mt: 1.5,
                    ml: 0.75,
                    width: 180,
                    '& .MuiMenuItem-root': {
                        typography: 'body2',
                        borderRadius: 0.75,
                    },
                    },
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        {user.name + ' ' + user.surname }
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {user.email}
                    </Typography>
                </Box>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <MenuItem onClick={ () => handleClickItem( "/user/accountSettings" ) } sx={{ m: 1 }} >Configuración</MenuItem>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <MenuItem onClick={handleLogout} sx={{ m: 1 }}> Salir </MenuItem>

            </Popover>
        </>
    )
}
