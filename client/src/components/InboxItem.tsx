import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import UserData from "../types/UserData";

type InboxItemProps = {
  otherData: UserData;
};
const InboxItem: React.FC<InboxItemProps> = ({ otherData }) => {
  const [firstName, lastName] = otherData.name.split(" ");
  const getInitials = () => {
    return `${firstName?.length > 0 ? firstName.charAt(0) : ""}${
      lastName?.length > 0 ? lastName.charAt(0) : ""
    }`;
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={otherData.photoUrl}>
          {!otherData.photoUrl && getInitials()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${firstName || ""} ${lastName || ""}`} />
      <Button
        variant="contained"
        color="primary"
        href={`/patient/chat?id=${otherData.id}`}
      >
        Chat
      </Button>
    </ListItem>
  );
};

export default InboxItem;
