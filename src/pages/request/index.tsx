import { USER_NAME_KEY, getUserInfo } from "@/utils/user";
import { getHashQuery } from "@/utils/util";
import { useEffect } from "react";

export default () => {
  useEffect(() => {
    const hash = location.hash;
    const query: {
      id?: string;
      key?: string;
      token?: string;
    } = getHashQuery();
    if (query.id && query.key && query.token) {
      const sessionKeyMap = JSON.parse(localStorage.getItem('session-key-map') || '{}');
      sessionKeyMap[query.id] = query.key;
      localStorage.setItem('session-key-map', JSON.stringify(sessionKeyMap));
      const sessionTokenMap = JSON.parse(localStorage.getItem('session-token-map') || '{}');
      sessionTokenMap[query.id] = query.token;
      localStorage.setItem('session-token-map', JSON.stringify(sessionTokenMap));
      getUserInfo()
        .then(() => {
          window.location.href = `/#id=${query.id}&token=${query.token}`;
        });
    }
  }, []);
  return <div />;
};