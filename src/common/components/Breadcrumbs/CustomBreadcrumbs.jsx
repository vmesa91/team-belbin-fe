import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import { LinkItem } from './LinkItem';
// component
import { SvgColor } from "../SvgColor/SvgColor";


export const CustomBreadcrumbs = ({ links, action, heading, moreLink, activeLast, sx, ...other }) => {

  const lastLink = links[links.length - 1].name;

  const icon = <SvgColor src={'/assets/icons/navbar/ic_notification_chat.svg'} sx={{ width: 1, height: 1 }} />
  return (
    <Box sx={{ mb: 5, ...sx }}>
       <Stack direction="row" alignItems="center">
    
            <Box sx={{ flexGrow: 1 }}>
            
            {/* HEADING */}
            {heading && (
                <Typography variant="h4" gutterBottom>
                  {icon } {heading}
                </Typography>
            )}

          {/* BREADCRUMBS */}
          {!!links.length && (
              <Breadcrumbs separator={<Separator />} {...other}>
              {links.map((link) => (
                <LinkItem
                  key={link.name || ''}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
                />
              ))}
              </Breadcrumbs>
            )}
            </Box>

            {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
       </Stack>

        {/* MORE LINK */}
        {!!moreLink && (
          <Box sx={{ mt: 2 }}>
            {moreLink.map((href) => (
              <Link
                noWrap
                key={href}
                href={href}
                variant="body2"
                target="_blank"
                rel="noopener"
                sx={{ display: 'table' }}
              >
                {href}
              </Link>
            ))}
          </Box>
        )}
      </Box>
  )
}
// ----------------------------------------------------------------------

function Separator() {
  return (
    <Box
      component="span"
      sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled' }}
    />
  );
}