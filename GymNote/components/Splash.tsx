import { View } from "react-native";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";

export default function Splash({ setIsLoading }) {
  return (
    <View className="flex-1 items-center bg-black justify-center">
      <StatusBar style="light" />
      <View className="h-2/6 w-2/6">
        <LottieView
          source={require("assets/animation.json")}
          autoPlay
          loop={false}
          resizeMode="cover"
          onAnimationFinish={() => setIsLoading(false)}
        />
      </View>
    </View>
  );
}
