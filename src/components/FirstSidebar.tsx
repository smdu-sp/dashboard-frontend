import { useContext } from 'react';
import Image from 'next/image';
import { Button, Tooltip, GlobalStyles, Avatar, List, ListItemButton, Sheet, IconButton } from '@mui/joy';
import { Close, Menu, OpenInNew, Person } from '@mui/icons-material';

import iconLogo from '@/assets/sis-icon.png';
import { MenuContext } from '@/shared/contexts/MenuContext';

export default function FirstSidebar() {
  const { sidebarStatus, toggleSidebar } = useContext(MenuContext);
  return (
    <Sheet
      className="FirstSidebar"
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s',
        zIndex: 100,
        height: '100dvh',
        width: 'var(--FirstSidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles styles={{ ':root': { '--FirstSidebar-width': '68px' }}} />
      <List size="sm" sx={{ '--ListItem-radius': '6px', '--List-gap': '8px' }}>
        <ListItemButton 
          sx={{
            p: 1,
            borderRadius: 6,
            display: { xs: 'flex', lg: 'none' },
          }}
          onClick={() => toggleSidebar()}
        >
          {sidebarStatus ? <Menu sx={{ fontSize: 24 }} /> : <Close sx={{ fontSize: 24 }} />}
        </ListItemButton>
        <ListItemButton sx={{ p: 1, borderRadius: 6, mt: { lg: 0 }}} component="a" href="/">
          <Image src={iconLogo} height={24} alt="icon-logo" />
        </ListItemButton>
      </List>  
      <Tooltip title="Sair" arrow placement="top">
        <IconButton color="primary" component="a" href="/login">
          <Person />
        </IconButton>
      </Tooltip>
    </Sheet>
  );
}
