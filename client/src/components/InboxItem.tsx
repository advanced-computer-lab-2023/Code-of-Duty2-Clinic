import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserData from "../types/UserData";
import { useSession } from "@talkjs/react";
import Talk from "talkjs";
import { createConversation } from "../utils/createConversation";

type InboxItemProps = {
  otherData: UserData;
};
const InboxItem: React.FC<InboxItemProps> = ({ otherData }) => {
  const navigate = useNavigate();
  const session = useSession()!;

  const handleChatButtonClick = () => {
    const doctor = new Talk.User(otherData);
    const conversationId = Talk.oneOnOneId(session.me, doctor);
    createConversation(session, conversationId, doctor);
    navigate(`/patient/chats?conversationId=${conversationId}`);
  };

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
        onClick={handleChatButtonClick}
      >
        Chat
      </Button>
    </ListItem>
  );
};

export default InboxItem;
