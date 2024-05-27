import { createContext } from "react";

export const initialContext = {
  isLoggedIn: false,
  userInfo: {
    name: null,
    username: null,
    activities: [],
  },
};

export const LoginContext = createContext(initialContext);
