import api from '@/api/api';
import { ChatMessage } from '@/schema/chat.schema';

type GetChatMessageType = {
  targetId: number;
  cursor?: number;
  limit?: number;
};
export async function getChatMessages({ targetId, cursor, limit }: GetChatMessageType) {
  return api
    .get(`/messages/${targetId}`, {
      params: { cursor, limit },
    })
    .then((res) => res.data as ChatMessage[]);
}

export async function sendMessage({ content, cId, userId }: { userId: number, content: string; cId: string }) {
  return api.post('messages', { content, cId, userId });
}
