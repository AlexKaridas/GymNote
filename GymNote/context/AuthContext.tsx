import { createContext } from "react";

const AuthContext = createContext({
  authState: {
    id: "",
    username: "",
    signedIn: false,
  },
  setAuthState: () => {},
});

export default AuthContext;
