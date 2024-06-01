import { uuid } from "./id";
import { generateSymmetricKey } from "./secret";

export async function genRequestUrl(id: string) {
  const token = uuid();
  const key = await generateSymmetricKey();
  const tokenKeyMap = JSON.parse(localStorage.getItem('token-key-map') || '{}');
  tokenKeyMap[token] = key;
  localStorage.setItem('token-key-map', JSON.stringify(tokenKeyMap));
  return `${window.location.origin}/request#key=${encodeURIComponent(key)}&id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`;
}