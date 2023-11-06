import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { Transition } from "react-transition-group";

import { SidebarItem } from "../../types";
import el7a2niLogo from "../../assets/el7a2ni_logo.png";

interface Props {
  sidebarItems: SidebarItem[];
  sidebarWidth: string;
}

const Sidebar: React.FC<Props> = ({ sidebarItems, sidebarWidth }) => {
  const [open, setOpen] = useState<string>("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (item: SidebarItem) => {
    if (item.href) {
      setOpen("");
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
          onClick={() => handleClick(item)}
          sx={{
            color: "white",
            textDecoration: "none",
            padding: 1.5,
          }}
        >
          {item.icon && (
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
          )}

          <ListItemText
            primary={item.title}
            sx={{ color: "white", fontWeight: "bold" }}
          />

          {item.items &&
            (open === item.title ? (
              <ExpandLess sx={{ color: "white" }} />
            ) : (
              <ExpandMore sx={{ color: "white" }} />
            ))}
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
    <>
      <Transition in={!isSmallScreen} timeout={duration} unmountOnExit>
        {(state) => (
          <Box
            sx={{
              minWidth: sidebarWidth,
              maxWidth: sidebarWidth,
              background: (theme) => theme.palette.gradient,
              ...defaultStyle,
              ...transitionStyles[state],
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Box>
              <List>
                <ListItem>
                  <img
                    src={el7a2niLogo}
                    alt="El7a2ni Logo"
                    style={{
                      maxWidth: "70%",
                      height: "auto",
                      marginTop: "3rem",
                      marginBottom: "3rem",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </ListItem>
                {renderSidebarItems(sidebarItems)}
              </List>
            </Box>
          </Box>
        )}
      </Transition>
    </>
  );
};

export default Sidebar;

/**
 * Animation related styling for sidebar appearing and disappearing
 * based on screen size.
 */
const duration = 50;

type TransitionStyles = {
  entering: { opacity: number };
  entered: { opacity: number };
  exiting: { opacity: number };
  exited: { opacity: number };
  unmounted: { opacity: number };
};

const transitionStyles: TransitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 1,
};
