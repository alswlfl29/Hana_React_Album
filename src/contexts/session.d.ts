type LoginUser = { id: number; username: string };

type Session = {
  loginUser: LoginUser | null;
};
