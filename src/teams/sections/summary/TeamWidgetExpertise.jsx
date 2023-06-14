import { Box, Card, CardHeader, LinearProgress, Stack, Typography, alpha } from "@mui/material"
import { dataRolesBelbin } from "../../../members/config/configTableMembers"


export const TeamWidgetExpertise = ({ title, subheader, data, ...other }) => { 

    const groupRoles = [
        { group : 'Roles de Acción' , id: 1,  value: calculateValue('Roles de Acción', data)},
        { group: 'Roles Mentales' , id: 2, value: calculateValue('Roles Mentales', data)}, 
        { group: 'Roles Sociales' , id: 3, value: calculateValue('Roles Sociales', data)}
    ]


  return (
    <Card { ...other }>
        <CardHeader  title={title} subheader={subheader} />

        <Stack spacing={3} sx={{ px: 3, my: 5 }}>
            { groupRoles.map(( dataRol ) => (
                <LinearProgress 
                    variant="determinate"
                    key={dataRol.id}
                    value={dataRol.value}
                    color={
                        (dataRol.group === 'Roles de Acción' && 'warning') ||
                        (dataRol.group === 'Roles Mentales' && 'error') ||
                        'success'
                      }

                    sx={{ height: 8, bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16) }}
                />
            ))}
        </Stack> 


        {/* Leyenda */}
        <Stack direction="row" justifyContent="space-between" sx={{ px: 3, pb: 3 }}>
            { groupRoles.map(( dataRol ) => (
                <Stack key={dataRol.id} alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Box
                        sx={{
                        width: 12,
                        height: 12,
                        borderRadius: 0.5,
                        bgcolor: 'success.main',
                         ...(dataRol.group === 'Roles de Acción' && { bgcolor: 'warning.main' }),
                        ...(dataRol.group === 'Roles Mentales' && { bgcolor: 'error.main' }), 
                        }}
                    />
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            {dataRol.group}
                    </Typography>
                    </Stack>
                </Stack>
            ))}
       </Stack>
    </Card>
  )
}

const calculateValue = (group, data) => {
    
    const numRolesBelbin = data.filter(( member ) => {
        const { belbinRol } = member

        // Buscar la categoría del miembro
        for (let i = 0; i < belbinRol.length; i++) {
            const rolMiembro = belbinRol[i];

            // Buscar el rol en la lista de roles de Belbin
            const rolBelbin = dataRolesBelbin.find((rol) => rol._id === rolMiembro);

            // Si se encuentra el rol, devolver la categoría
            if (rolBelbin) {
            return rolBelbin.group;
            }
        }

        return null
    })

   return (numRolesBelbin / data.length) * 100
    

    
 
}
