export interface Message {
  id: string;
  hash: string;
  time: string;
  sessionId: string;
  originId: string;
  content: string;
  isError?: boolean;
  token?: string;
}
