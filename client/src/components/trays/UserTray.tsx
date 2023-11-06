import { Box } from "@mui/material";
import Notifications from "./Notifications";
import Avatar from "./Avatar";

const UserTray = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Notifications />

      <Avatar />
    </Box>
  );
};

export default UserTray;
