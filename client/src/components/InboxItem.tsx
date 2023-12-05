import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type InboxItemProps = {
  name: string;
  photoUrl?: string;
  conversationId: string;
};
const InboxItem: React.FC<InboxItemProps> = ({
  name,
  photoUrl,
  conversationId,
}) => {
  const navigate = useNavigate();

  const handleChatButtonClick = () => {
    navigate(`/patient/chats?conversationId=${conversationId}`);
  };

  const [firstName, lastName] = name.split(" ");
  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={photoUrl}>{!photoUrl && getInitials()}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${firstName} ${lastName}`} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleChatButtonClick}
      >
        Chat
      </Button>
    </ListItem>
  );
};

export default InboxItem;
