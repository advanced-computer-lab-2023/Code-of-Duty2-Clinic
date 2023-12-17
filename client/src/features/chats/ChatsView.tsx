import { Inbox } from "@talkjs/react";
import { Box } from "@mui/material";
import { useQueryParams } from "../../hooks/useQueryParams";
import { FC, useCallback, useContext } from "react";
import Talk from "talkjs";
import { createConversation } from "../../utils/createConversation";
import { Session } from "talkjs/all";
import UserRole from "../../types/enums/UserRole";
import axios from "axios";
import { config } from "../../configuration";
import { useQuery } from "react-query";
import { AuthContext } from "../../contexts/AuthContext";

const getOtherUserData = async ({
  id,
  receiverRole,
  senderRole
}: {
  id: string | null;
  receiverRole: UserRole;
  senderRole: UserRole;
}) => {
  if (!id) return null;
  const sender = senderRole === UserRole.PATIENT ? "patients" : "doctors";
  const receiver =
    receiverRole === UserRole.PATIENT ? "patients" : UserRole.DOCTOR ? "doctors" : "pharmacists";
  const response = await axios.get(`${config.serverUri}/${sender}/${receiver}/${id}`);

  return receiverRole === UserRole.PATIENT ? response.data : response.data.patientInfo;
};

const ChatsView = () => {
  const id = useQueryParams().get("id")!;
  const role = useQueryParams().get("role");
  const receiverRole =
    role === "patient"
      ? UserRole.PATIENT
      : role === "doctor"
        ? UserRole.DOCTOR
        : UserRole.PHARMACIST;

  const currentUserRole = useContext(AuthContext).authState.role;

  const otherUserDataQuery = useQuery(["otherUserData", id, role], () =>
    getOtherUserData({ id, receiverRole, senderRole: currentUserRole })
  );

  const initiateConversation = useCallback(
    (session: Session) => {
      const otherData = {
        id,
        name: otherUserDataQuery.data?.name || "Unknown",
        email: otherUserDataQuery.data?.email || "Unknown",
        photoUrl: otherUserDataQuery.data?.imageUrl,
        role: role?.toUpperCase()
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
            autofocus: "smart"
          }}
          showChatHeader={true}
          loadingComponent={<span>LOADING....</span>}
          style={{
            width: 550,
            height: 600
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
          autofocus: "smart"
        }}
        syncConversation={initiateConversation}
        showChatHeader={true}
        loadingComponent={<span>LOADING....</span>}
        style={{
          width: 550,
          height: 600
        }}
      />
    </Box>
  );
};

export default ChatsView;
