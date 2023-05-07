
import { Box, Divider, Stack, TextField, Typography } from "@mui/material"
import { CustomTextField } from "../../components/Form/CustomTextField"


export const SetInputs = ({ inputFirst, inputSecond, multiline }) => {

  return (
    
    <>
    <Stack sx={{ p: 3 , display: 'flex' ,  maxWidth: '100%'}}>

        <Box sx={{ p: 3 , display: 'flex' , maxWidth: '50%'}}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {inputFirst}
            </Typography>
                <CustomTextField 
                    name={inputFirst}
                    label={inputFirst}
                    sx={{ p: 3 , width: '450px'}}
                />
        </Box>

        <Box sx={{ p: 3 ,  maxWidth: '50%'}}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {inputSecond}
            </Typography>
            { multiline ?  
                <CustomTextField
                    name={inputSecond}
                    label={inputSecond} 
                    multiline
                    rows={4}
                    sx={{ p: 3 , width: '450px'}}
                />
               :  
               <CustomTextField
                    name={inputSecond}
                    label={inputSecond}
                    sx={{ p: 3 , width: '450px'}}
                />
            }
        </Box>

    </Stack>
    </>

  )
}
