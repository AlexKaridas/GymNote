import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "utils/initSupabase";
import { useStore } from "utils/useStore";
import { useEffect } from "react";

export default function Auth() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "66558204182-o86men29smq83r8hc66vmk9h3s3t5iic.apps.googleusercontent.com",
      profileImageSize: 120,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      hostedDomain: "",
    });
  }, []);
  const { setUserInfo } = useStore();

  async function handleGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();
      console.log("User Info: ", JSON.stringify(userInfo, null, 2));

      if (userInfo.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.idToken,
        });

        console.error("\nError in Auth: ", error);

        // Updating the state with user information
        console.log("Login Success: ", data.user);
        setUserInfo(data.user);
      } else {
        throw new Error("No ID token present!");
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.error(
          "SignInCancelled: ",
          error.code.statusCodes.SIGN_IN_CANCELLED
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.error("InProgress: ", error.code.statusCodes.IN_PROGRESS);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error(
          "PlayServices: ",
          error.code.statusCodes.PLAY_SERVICES_NOT_AVAILABLE
        );
      } else {
        console.error("Something else happened: ", error);
      }
    }
  }

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={() => handleGoogleSignIn()}
    />
  );
}
