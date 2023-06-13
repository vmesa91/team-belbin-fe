
import { Avatar, Box, Card, Typography } from '@mui/material'
import { Image } from '../../../common/components/Image/Image'
import { styled, alpha } from '@mui/material/styles';
import { useSelector } from 'react-redux';


const StyledDropZone = styled('div')(({ theme }) => ({
  width: 144,
  height: 144,
  margin: 'auto',
  display: 'flex',
  cursor: 'pointer',
  overflow: 'hidden',
  borderRadius: '50%',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
}));

export const TeamWidgetSummary = ({ title, total, description, icon, teamlead, sx, ...other }) => {

  const { members } = useSelector( state => state.memberStore )

  const leaderInfo = members.find( ( member ) => member._id === teamlead )
  
  const { user } = leaderInfo
  return (
    <>
    
    <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          pl: 3,
          ...sx,
        }}
        {...other}
    >
        <div>
          <Typography variant="h3">{title}</Typography>

          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
             {total} Miembros
          </Typography>

          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
             {description}
          </Typography>
        </div>

        <Box
            sx={{
              width: 120,
              height: 120,
              lineHeight: 0,
              borderRadius: '50%',
              bgcolor: 'background.neutral',
            }}
          >
        {icon}
      </Box>
    </Card>
    <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          pl: 3,
          ...sx,
          marginTop: 2
        }}
        {...other}
    >
        <div>
        <Typography variant="h4"> { user.name } </Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          TEAM LEAD 
        </Typography>

        <Typography variant="h8" sx={{ color: 'text.secondary' }}>
           { user.email }
        </Typography>
        </div>
        <StyledDropZone>
            <Image
                alt="avatar"
                src={ 'avatarUrl' }
                sx={{
                    zIndex: 8,
                    overflow: 'hidden',
                    borderRadius: '50%',
                    position: 'absolute',
                    width: `calc(100% - 16px)`,
                    height: `calc(100% - 16px)`,
                  }}
            />
        </StyledDropZone>
    </Card>
    
    </>
  )
}
