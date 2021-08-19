export interface ChatUser {
  id: string;
  name: string;
}

export interface ChatSession {
  id: string;
  name: string;
  members: ChatUser['id'][];
  lastMessage: string;
  lastTime: string;
  unreadNumber: number;
}
