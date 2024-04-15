import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, Link } from "expo-router";
import { useStore } from "utils/useStore";
import { useState, useEffect } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Keyboard } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "expo-router";

export default function newExerciseModal() {
  const { workouts, setWorkouts } = useStore();
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: 0,
    reps: 0,
    weight: "",
    rest: 0,
    notes: "This is a note",
    completed: false,
  });
  const [success, setSuccess] = useState<boolean>(false);

  const { itemTitle } = useLocalSearchParams();

  console.log("New Exercise Item Title: ", itemTitle);

  function addNewExercise() {
    const updatedWorkouts = workouts.map((workout) => {
      if (workout.title === itemTitle) {
        return { ...workout, exercises: [...workout.exercises, newExercise] };
      } else {
        return workout;
      }
    });

    console.log("UpdatedWorkout: ", updatedWorkouts);
    console.log("NewExercise: ", newExercise);

    //* Checking whether an exercise with a similar name already exists
    if (!updatedWorkouts.find((workout) => workout.title === itemTitle)) {
      console.log("No workout found");
    }

    setWorkouts(updatedWorkouts);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      router.back();
    }, 2000);
  }

  const isPresented = router.canGoBack();

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
          Exercise Name
        </Text>
        <TextInput
          className="bg-third text-white rounded-lg p-2 w-48 z-20"
          placeholder="Bench Press"
          placeholderTextColor={"rgba(240, 240, 240, 0.6)"}
          keyboardType="default"
          onSubmitEditing={Keyboard.dismiss}
          value={newExercise.name}
          onChangeText={(text) =>
            setNewExercise({ ...newExercise, name: text })
          }
        />
        <Text className="text-white font-[CustomFontBold] text-2xl mb-5 mt-5">
          Weight
        </Text>
        <TextInput
          className="bg-third text-white rounded-lg p-2 w-48 z-20"
          placeholder="70"
          placeholderTextColor={"rgba(240, 240, 240, 0.6)"}
          keyboardType="numeric"
          onSubmitEditing={Keyboard.dismiss}
          value={newExercise.weight}
          onChangeText={(text) =>
            setNewExercise({ ...newExercise, weight: text })
          }
        />
        <TouchableOpacity onPress={addNewExercise}>
          <View className="rounded-md w-32 bg-red h-12 items-center justify-center mt-10">
            <Text
              className="text-white font-extrabold text-md"
              style={{ elevation: 4 }}
            >
              Add
            </Text>
          </View>
        </TouchableOpacity>
        {success && (
          <View className="transition duration-300 absolute bottom-[-120] left-5 flex items-center justify-center ease-in-out ">
            <View
              className={`bg-green rounded-2xl w-25 h-10 shadow-lg flex flex-row items-center justify-center px-4`}
            >
              <MaterialCommunityIcons
                name="check"
                size={20}
                color={"white"}
                style={{ elevation: 4 }}
              />
              <Text className="text-white font-[CustomFontBold] text-md ml-2">
                Exercise added!
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
