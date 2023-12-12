import { Inbox } from "@talkjs/react";
import { Box } from "@mui/material";
import { useQueryParams } from "../../hooks/useQueryParams";
import { FC, useCallback } from "react";
import Talk from "talkjs";
import { createConversation } from "../../utils/createConversation";
import { Session } from "talkjs/all";
import useFirstPath from "../../hooks/useFirstPath";

const ChatsView: FC = () => {
  const id = useQueryParams().get("id")!;
  const name = useQueryParams().get("name")!;
  const photoUrl = useQueryParams().get("photoUrl");

  const initiateConversation = useCallback(
    (session: Session) => {
      const otherData = {
        id,
        name,
        photoUrl: photoUrl || name.charAt(0).toUpperCase(),
        role: useFirstPath() === "doctor" ? "PATIENT" : "DOCTOR",
      };
      const other = new Talk.User(otherData);
      const conversationId = Talk.oneOnOneId(session.me, other);
      return createConversation(session, conversationId, other);
    },
    [id, name, photoUrl]
  );

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Inbox
          messageField={{
            placeholder: "Write a message..",
            enterSendsMessage: true,
            autofocus: "smart",
          }}
          syncConversation={initiateConversation}
          showChatHeader={true}
          loadingComponent={<span>LOADING....</span>}
          style={{
            width: 550,
            height: 600,
          }}
        />
      </Box>
    </>
  );
};

export default ChatsView;
