import { useState, useContext } from "react";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NotificationContext } from "../../contexts/NotificationContext";

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { notifications } = useContext(NotificationContext);

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
        {notifications?.map((notification, index) => (
          <MenuItem key={index}>{notification.subject}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Notifications;
