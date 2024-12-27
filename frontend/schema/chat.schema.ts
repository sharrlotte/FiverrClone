export type ChatMessage = {
  id: number;
  content: string;
  userId: number;
  cId?: string;
  createdAt: string;
};

export type MessageGroup = {
  id: number;
  userId: number;
  contents: { content: string; cId?: string }[];
  createdAt: string;
};
