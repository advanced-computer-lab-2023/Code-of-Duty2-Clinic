import Talk from "talkjs";

export function createConversation(
  session: Talk.Session,
  conversationId: string,
  other: Talk.User
) {
  const conversation = session.getOrCreateConversation(conversationId);
  conversation.setParticipant(session.me);
  conversation.setParticipant(other);
}
