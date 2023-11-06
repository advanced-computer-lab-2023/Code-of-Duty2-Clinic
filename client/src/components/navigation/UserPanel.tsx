import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  List,
  Stack,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PublicIcon from "@mui/icons-material/Public";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { SidebarItem } from "../../types";
import { welcomeRoute } from "../../data/routes/guestRoutes";
import el7a2niLogo from "../../assets/el7a2ni_logo.png";
import UserTray from "../trays/UserTray";

interface Props {
  sidebarItems: SidebarItem[];
}

const UserPanel: React.FC<Props> = ({ sidebarItems }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState<string>(""); // For expandable sidebar items with sub-items
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleClick = (item: SidebarItem) => {
    if (item.href) {
      setOpen("");
      if (isSmallScreen) {
        setDrawerOpen(false);
      }
    } else if (item.items) {
      setOpen((prevState) => (prevState === item.title ? "" : item.title));
    }
  };

  const renderSidebarItems = (items: SidebarItem[]) => {
    return items.map((item) => (
      <React.Fragment key={item.title}>
        <ListItemButton
          component={item.href ? NavLink : "div"}
          to={item.href}
          onClick={() => {
            handleClick(item);
            if (isSmallScreen && item.href) {
              setDrawerOpen(false);
            }
          }}
          sx={{
            textDecoration: "none",
            padding: 1.5,
            marginRight: theme.spacing(1),
          }}
        >
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.title} sx={{ fontWeight: "bold" }} />
          {item.items &&
            (open === item.title ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        {item.items && (
          <Collapse in={open === item.title} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
              {renderSidebarItems(item.items)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isSmallScreen
          ? theme.palette.background.default
          : "transparent",
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        borderRadius: isSmallScreen ? "10rem" : "none",
        position: isSmallScreen ? "sticky" : "static",
        top: isSmallScreen ? 0 : theme.spacing(2),
        zIndex: theme.zIndex.drawer - 1,
        boxShadow: isSmallScreen ? "0px 2px 2px rgba(0, 0, 0, 0.25)" : "none",
      }}
    >
      {isSmallScreen ? (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ marginLeft: theme.spacing(1) }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ padding: theme.spacing(2) }}>
              <Stack direction="column" spacing={2} alignItems="flex-start">
                <IconButton edge="end" onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </IconButton>
                <List>
                  <ListItem>
                    <img
                      src={el7a2niLogo}
                      alt="El7a2ni Logo"
                      style={{
                        maxHeight: "12rem",
                        marginTop: "0rem",
                        marginBottom: "0rem",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                  </ListItem>
                  {renderSidebarItems(sidebarItems)}
                </List>
              </Stack>
            </Box>
          </Drawer>
        </>
      ) : (
        <Box sx={{ width: "100%" }} /> // Empty box to reserve space
      )}
      <Box sx={{ marginRight: theme.spacing(1), display: "flex" }}>
        <UserTray />

        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: "white", width: "1px", mx: 2 }}
        />

        <IconButton color="inherit" onClick={() => navigate(welcomeRoute.path)}>
          <PublicIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UserPanel;
