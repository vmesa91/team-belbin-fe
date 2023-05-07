import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

export const ConfirmDialog = ({ title, content, action, open, onClose, ...other }) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}> 
        <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

            {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}
            <DialogActions>
                {action}
                <Button variant="outlined" color="inherit" onClick={onClose}>
                    Cancelar
                </Button>
            </DialogActions>
       
    </Dialog>
  )
}
