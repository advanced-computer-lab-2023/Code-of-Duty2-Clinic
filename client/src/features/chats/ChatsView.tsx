import { Inbox } from "@talkjs/react";
import { Box } from "@mui/material";
import { useQueryParams } from "../../hooks/useQueryParams";

const ChatsView = () => {
  const conversationId = useQueryParams().get("conversationId") || undefined;
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Inbox
          messageField={{
            placeholder: "Write a message..",
            enterSendsMessage: true,
            autofocus: "smart",
          }}
          conversationId={conversationId}
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
