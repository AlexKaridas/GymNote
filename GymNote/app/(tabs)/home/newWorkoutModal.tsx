import { View, Text, Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, Link } from "expo-router";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useStore } from "utils/useStore";
import { useState, useEffect } from "react";
import { useNavigation } from "expo-router";

export default function newWorkoutModal() {
  const { workouts, setWorkouts } = useStore();
  const [title, setTitle] = useState("");
  const isPresented = router.canGoBack();
  const onAddPress = () => {
    setWorkouts([
      ...workouts,
      {
        title: title,
        exercises: [],
      },
    ]);
    router.back();
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#101725",
      },
      headerTitleStyle: {
        color: "#FFFFFF",
        fontFamily: "CustomFontBold",
        fontSize: 18,
      },
      headerBackButtonMenuEnabled: true,
      headerTintColor: "#fff",
    });
  }, [navigation]);

  return (
    <View className="flex-1 bg-seventh items-center justify-center">
      <StatusBar style="light" />
      {!isPresented && <Link href="../">Dismiss</Link>}
      <View className="items-center justify-center mb-32">
        <Text className="text-white font-[CustomFontBold] text-2xl mb-5">
          Title
        </Text>
        <TextInput
          className="bg-third text-white rounded-lg p-2 w-48 z-20"
          placeholder="Monday"
          placeholderTextColor={"rgba(240, 240, 240, 0.6)"}
          keyboardType="default"
          onSubmitEditing={Keyboard.dismiss}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TouchableOpacity onPress={onAddPress}>
          <View className="rounded-md w-32 bg-lightGreen h-12 items-center justify-center mt-10">
            <Text
              className="text-white font-extrabold text-md"
              style={{ elevation: 4 }}
            >
              Add
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
