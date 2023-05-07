import { Button, Card, Container, Stack, Typography } from "@mui/material";


export const SectionLayout = ({ children , breadcrumb }) => {
  
    return (
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            { breadcrumb }
          </Typography>
{/*           <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nuevo Miembro
          </Button> */}
        </Stack>

        <Card>
            { children }
        </Card>
      </Container>
    )
  }