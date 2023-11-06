import { useState, useEffect } from "react";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notifications = () => {
  // TODO: Add another state for actual notifications
  const [numberOfNotifications, setNumberOfNotifications] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    fetchNotifications()
      .then((notifications) => {
        setNumberOfNotifications(notifications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function fetchNotifications() {
    // TODO: Fetch notifications from database here
    // For now, we'll just return a placeholder value
    return Promise.resolve(101);
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={numberOfNotifications} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* TODO: Replace with actual notifications */}
        <MenuItem>Notification 1</MenuItem>
        <MenuItem>Notification 2</MenuItem>
        <MenuItem>Notification 3</MenuItem>
      </Menu>
    </div>
  );
};

export default Notifications;
