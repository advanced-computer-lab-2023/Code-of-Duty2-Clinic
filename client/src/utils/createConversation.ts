import Talk from "talkjs";
import { ConversationBuilder } from "talkjs/all";

export function createConversation(
  session: Talk.Session,
  conversationId: string,
  other: Talk.User
) {
  const conversation = session.getOrCreateConversation(conversationId);
  conversation.setParticipant(session.me);
  conversation.setParticipant(other);
  return conversation as ConversationBuilder;
}
