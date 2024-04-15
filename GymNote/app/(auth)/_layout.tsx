import "react-native-url-polyfill/auto";
import { registerRootComponent } from "expo";
import { Slot } from "expo-router";
import { useFonts } from "@expo-google-fonts/inter";
import { useEffect, useState } from "react";
import Splash from "components/Splash";

export default function GymNoteLayout() {
  const [isLoading, setIsLoading] = useState(true);

  const [fontsLoaded, loading] = useFonts({
    CustomFont: require("assets/fonts/NotoSans-Regular.ttf"),
    CustomFontBold: require("assets/fonts/NotoSans-Bold.ttf"),
    CustomFontLight: require("assets/fonts/NotoSans-Light.ttf"),
    CustomFontMedium: require("assets/fonts/NotoSans-Medium.ttf"),
    CustomFontExtraLight: require("assets/fonts/NotoSans-ExtraLight.ttf"),
    CustomFontSemiBold: require("assets/fonts/NotoSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if ((!fontsLoaded && loading) || null) {
      setIsLoading(true);
    }
  }, [fontsLoaded]);

  if (isLoading) {
    return <Splash setIsLoading={setIsLoading} />;
  }
  return <Slot />;
}

registerRootComponent(GymNoteLayout);
