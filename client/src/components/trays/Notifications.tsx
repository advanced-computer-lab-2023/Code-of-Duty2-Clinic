import { useState, useEffect, useContext } from "react";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NotificationContext } from "../../contexts/NotificationContext";

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { notifications, setNotifications } = useContext(NotificationContext);

  useEffect(() => {
    fetchNotifications()
      .then((notifications) => {
        setNotifications(notifications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function fetchNotifications() {
    // TODO: Fetch notifications from database here
    // For now, we'll just return a placeholder value
    return Promise.resolve([]);
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
        <Badge badgeContent={notifications?.length} color="error">
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
        {notifications?.map((notification) => (
          <MenuItem>{notification.subject}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Notifications;
