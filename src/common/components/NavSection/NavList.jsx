import React, { useState } from 'react'
import { NavItem } from './NavItem'
import { Collapse } from '@mui/material'

export const NavList = ({ data , depth , hasChild }) => {
    
    
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(!isOpen);
      };
    
    const handleClose = () => {
        setIsOpen(false);
      };

     return (
        <>  
            < NavItem item={data} open={isOpen} depth={depth} onClick={handleToggle} />

            { hasChild && (
                
                <Collapse in={isOpen} unmountOnExit>
                    <NavSubList data={data.children} depth={depth}/>
                </Collapse>
            )}

        </>

     ) 
}

const NavSubList = ({ data , depth }) => {

    return (
      <>
        {data.map((list) => (
          <NavList
            data={list}
            depth={ depth + 1}
          />
        ))}
      </>
    );
  }
