const SKEY = 'session';

export const DefaultSession: Session = {
  loginUser: null,
};

export const getStorage = () => {
  const storedData = localStorage.getItem(SKEY);
  if (storedData) {
    return JSON.parse(storedData) as Session;
  }

  setStorage(DefaultSession);

  return DefaultSession;
};

export const setStorage = (session: Session) => {
  localStorage.setItem(SKEY, JSON.stringify(session));
};
