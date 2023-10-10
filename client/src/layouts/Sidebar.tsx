import React, { useState, ReactElement } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Drawer, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

type SidebarItem = {
  title: string;
  href: string;
  icon: ReactElement;
};

type SidebarProps = {
  items: Array<{
    title: string;
    items: SidebarItem[];
  }>;
};

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleExpandClick = (title: string) => {
    setExpanded(expanded !== title ? title : null);
  };

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(!open)} sx={
        {
          marginLeft: '3px',
        }
      }>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          {items.map((section, index) => (
            <React.Fragment key={index}>
              <ListItem button onClick={() => handleExpandClick(section.title)}>
                <ListItemText primary={section.title} />
              </ListItem>
              <Collapse in={expanded === section.title} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {section.items.map((item, index) => {
                    return (
                      <ListItem button component={Link} to={item.href} selected={item.href === location.pathname} key={index} onClick={() => setOpen(false)}>
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
