
import { Link, ListItemText } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import{ StyledItem , StyledIcon, StyledDotIcon } from './styles.js'
import { Iconify } from '../Iconify/Iconify.jsx';

// ----------------------------------------------------------------------

export const NavItem = ({ item , open , depth, active, ...other }) => {
 
  const { title, path , children=undefined, icon } = item; 
  const subItem = depth !== 1;

  const renderContent = (
     <StyledItem depth={depth} active={active} {...other}>
      {icon && <StyledIcon>{icon}</StyledIcon>}

      {subItem && (
        <StyledIcon>
          <StyledDotIcon active={active && subItem} />
        </StyledIcon>
      )}

      <ListItemText 
          primary={title} 
          primaryTypographyProps={{ noWrap: true, component: 'span', variant: 'body2' }}/>

      {!!children && (
        <Iconify
          width={16}
          icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
          sx={{ ml: 1, flexShrink: 0 }}
        />
      )}

    </StyledItem> 

  )

  const renderItem = () => {
  
      // Has child
      if (children) {
        return renderContent;
      }
    
      // No child
      return (
        <Link component={RouterLink} to={path} underline="none">
          {renderContent}
        </Link>
      );
  };

  return renderItem()
} 