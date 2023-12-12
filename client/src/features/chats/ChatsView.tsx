import { Inbox } from "@talkjs/react";
import { Box } from "@mui/material";
import { useQueryParams } from "../../hooks/useQueryParams";
import { FC, useCallback } from "react";
import Talk from "talkjs";
import { createConversation } from "../../utils/createConversation";
import { Session } from "talkjs/all";
import UserRole from "../../types/enums/UserRole";
import axios from "axios";
import { config } from "../../configuration";
import { useQuery } from "react-query";

const getOtherUserData = async ({
  id,
  role,
}: {
  id: string | null;
  role: UserRole;
}) => {
  if (!id) return null;
  const sender = role === UserRole.DOCTOR ? "doctors" : "patients";
  const receiver = role === UserRole.DOCTOR ? "patients" : "doctors";
  const response = await axios.get(
    `${config.serverUri}/${sender}/${receiver}/${id}`
  );

  return role === UserRole.PATIENT ? response.data : response.data.patientInfo;
};

type Props = {
  role: UserRole;
};
const ChatsView: FC<Props> = ({ role }) => {
  const id = useQueryParams().get("id")!;

  const otherUserDataQuery = useQuery(["otherUserData", id, role], () =>
    getOtherUserData({ id, role })
  );

  const initiateConversation = useCallback(
    (session: Session) => {
      const otherData = {
        id,
        name: otherUserDataQuery.data?.name || "Unknown",
        email: otherUserDataQuery.data?.email || "Unknown",
        photoUrl: otherUserDataQuery.data?.imageUrl,
        role: role === UserRole.DOCTOR ? "PATIENT" : "DOCTOR",
      };
      const other = new Talk.User(otherData);
      const conversationId = Talk.oneOnOneId(session.me, other);
      return createConversation(session, conversationId, other);
    },
    [id, otherUserDataQuery.isSuccess]
  );

  if (!id) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Inbox
          messageField={{
            placeholder: "Write a message..",
            enterSendsMessage: true,
            autofocus: "smart",
          }}
          showChatHeader={true}
          loadingComponent={<span>LOADING....</span>}
          style={{
            width: 550,
            height: 600,
          }}
        />
      </Box>
    );
  }
  return (
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
  );
};

export default ChatsView;
