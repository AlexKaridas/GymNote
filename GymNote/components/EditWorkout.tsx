import { useStore } from "utils/useStore";
import React from "react";
import { useState } from "react";
import { Touchable, TouchableHighlight } from "react-native";
import { View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export const EditWorkout = ({ setPressedWorkout, pressedWorkout }) => {
  const { workouts, setWorkouts } = useStore();
  const [newTitle, setNewTitle] = useState<string>("");

  const deleteWorkout = () => {
    console.log("\nDelete Workout\n");
    const updatedWorkouts = workouts.filter(
      (workout) => workout.title !== pressedWorkout.item.title
    );
    setPressedWorkout({
      pressed: false,
      item: {},
    });
    setWorkouts(updatedWorkouts);
  };

  const saveWorkout = () => {
    console.log("\tSave Workout");

    let count = 0;
    const updatedWorkouts = workouts.map((workout) => {
      if (workout.title === pressedWorkout.item.title && count === 0) {
        console.log("Workout true', workout: ", workout, "\n\tcount: ", count);
        count++;
        // Change the title for the specific workout
        return { ...workout, title: newTitle };
      } else {
        // Keep other items unchanged
        return workout;
      }
    });
    console.log("Updated Workouts: ", updatedWorkouts);
    setWorkouts(updatedWorkouts);
    setPressedWorkout({
      pressed: false,
      item: {},
    });
  };

  return (
    <>
      <View className="absolute w-full h-full bg-overlay tranTouchableon-opacity duration-300 ease-in-out">
        <TouchableOpacity
          style={{
            height: "100%",
            width: "100%",
          }}
          onPress={() => {
            setPressedWorkout({
              pressed: false,
              item: {},
            });
          }}
        />
      </View>
      <View
        className="absolute top-64 left-8 bg-seventh w-5/6 rounded-xl transition-opacity duration-300 ease-in-out"
        style={{ elevation: 9 }}
      >
        <View className="relative w-full items-center justify-start">
          <Text className="text-white justify-self-center mt-10 text-xl">
            Edit Workout
          </Text>
          <View className="mt-10 flex flex-column items-center justify-items-center">
            <Text className="text-white justify-self-center text-lg">
              Title
            </Text>
            <TextInput
              className="bg-fourth w-60 h-10 rounded-md mt-5 pl-2 text-white"
              placeholder={`${pressedWorkout.item.title}`}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                setNewTitle(text);
              }}
            ></TextInput>
          </View>
        </View>
        <View className="flex flex-row items-center justify-evenly w-full mt-16 mb-10">
          <TouchableOpacity
            onPress={deleteWorkout}
            className="bg-fifth py-3 px-8 rounded-md"
            style={{ elevation: 5 }}
          >
            <Text className="text-red font-[CustomFontBold] text-md justify-self-center">
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={saveWorkout}
            className="bg-lightGreen py-3 px-8 rounded-md"
            style={{ elevation: 5 }}
          >
            <Text className="text-white font-[CustomFontBold] text-md justify-self-center">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
