/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { DefaultSession, getStorage, setStorage } from '../utils/Storage';

type SessionContextProp = {
  session: Session;
  login: (id: number, name: string) => boolean;
  logout: () => boolean;
};

type Action =
  | {
      type: 'set';
      payload: Session;
    }
  | {
      type: 'login';
      payload: LoginUser | null;
    }
  | {
      type: 'logout';
      payload: LoginUser | null;
    };

const SessionContext = createContext<SessionContextProp>({
  session: { loginUser: null },
  login: () => false,
  logout: () => false,
});

const reducer = (session: Session, { type, payload }: Action) => {
  let newer;
  switch (type) {
    case 'set':
      newer = { ...payload };
      break;
    case 'login':
    case 'logout':
      newer = { ...session, loginUser: payload };
      break;
    default:
      return session;
  }
  setStorage(newer);
  return newer;
};

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, dispatch] = useReducer(reducer, DefaultSession);

  const login = useCallback((id: number, username: string) => {
    dispatch({ type: 'login', payload: { id, username } });
    return true;
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'logout', payload: null });
    return true;
  }, []);

  useEffect(() => {
    dispatch({ type: 'set', payload: getStorage() });
  }, []);

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
