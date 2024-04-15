import {
  Text,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Stack } from "expo-router";
import Auth from "components/Auth";
import { StatusBar } from "expo-status-bar";

const Login = () => {
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      className="flex-1 items-center justify-center bg-black"
    >
      <View className="flex-1 items-center justify-center bg-black">
        <Stack.Screen
          options={{ headerShown: true, title: "Supabase Expo Router App" }}
        />
        <Image
          className="w-24 h-12 mb-5"
          source={require("assets/images/adaptive-icon.png")}
        />
        <Text className="text-white font-['CustomFontSemiBold'] text-2xl mb-5">
          Welcome to GymNote!
        </Text>
        {/* Google Sign In component */}
        <Auth />
        <StatusBar style="light" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
