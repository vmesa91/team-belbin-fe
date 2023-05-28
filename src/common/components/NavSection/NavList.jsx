import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { NavItem } from './NavItem'
import { Collapse } from '@mui/material'
import useActiveLink from '../../../hooks/useActiveLink'

export const NavList = ({ data , depth , hasChild }) => {
    
    const { pathname } = useLocation()
    
    const { active } = useActiveLink(data.path) 

    const [isOpen, setIsOpen] = useState(active)


    useEffect(() => {
      if (!active) {
        handleClose();
      }
    }, [pathname])

    const handleToggle = () => {
        setIsOpen(!isOpen);
      };
    
    const handleClose = () => {
        setIsOpen(false);
      };

     return (
        <>  
            < NavItem item={data} open={isOpen} depth={depth} active={active} onClick={handleToggle} />

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
            key={list.title + list.path}
            data={list}
            depth={ depth + 1}
            hasChild={!!list.children}
          />
        ))}
      </>
    );
  }
