import { getStorage } from './Storage';

export const isLogin = () => {
  if (getStorage().loginUser) return true;
  return false;
};
