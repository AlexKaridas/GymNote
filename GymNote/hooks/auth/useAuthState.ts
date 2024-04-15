import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

function useAuthState() {
  const [authState, setAuthState] = useState({
    id: "",
    username: "",
    signedIn: false,
    token: "",
  });

  useEffect(() => {
    /*
      Check if token is available.
    */
    const checkToken = async () => {
      // Returns null if there is no entry for the given key
      const auth = await SecureStore.getItemAsync("auth");

      if (auth) {
        /* 
          JSON.parse() takes a JSON string and transforms it into a JavaScript object.
          This string has to be valid JSON and will throw this error if incorrect syntax was encountered.
        */
        try {
          const authParsed = JSON.parse(auth);
          const token = authParsed.token;

          if (token) {
            setAuthState(authParsed);
          } else {
            setAuthState({
              id: "",
              username: "",
              signedIn: false,
              token: "",
            });
          }
        } catch (error) {
          console.warn("Token error: ", error);
        }
      }
    };

    checkToken();
  }, []);

  return { authState, setAuthState };
}

export default useAuthState;
