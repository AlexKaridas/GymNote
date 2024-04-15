import { useStore } from "utils/useStore";
import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const EditExercise = ({ setPressedExercise, pressedExercise }) => {
  const { workouts, setWorkouts } = useStore();
  const [newTitle, setNewTitle] = useState<string>("");
  const [newWeight, setNewWeight] = useState<string>("");

  const deleteWorkout = () => {
    console.log("\nDelete Workout\n");
    // const updatedWorkouts = workouts.filter(
    //   (workout) => workout.title !== pressedWorkout.item.title
    // );
    // setPressedWorkout({
    //   pressed: false,
    //   item: {},
    // });
    // setWorkouts(updatedWorkouts);
  };

  const saveWorkout = () => {
    console.log("\t--- Save Workout ---\t");
    console.log("PressedExercise: ", pressedExercise);
    let nice = workouts.find(
      (workout) => pressedExercise.exercise.name === workout.title
    );
    console.log("Workouts: ", nice);
    console.log("Workout types: ", typeof workouts);

    // let count = 0;
    // const updatedWorkouts = workouts.map((workout) => {
    //   if (workout.title === pressedWorkout.item.title && count === 0) {
    //     console.log("Workout true', workout: ", workout, "\n\tcount: ", count);
    //     count++;
    //     // Change the title for the specific workout
    //     return { ...workout, title: newTitle };
    //   } else {
    //     // Keep other items unchanged
    //     return workout;
    //   }
    // });
    // console.log("Updated Workouts: ", updatedWorkouts);
    // setWorkouts(updatedWorkouts);
    // setPressedWorkout({
    //   pressed: false,
    //   item: {},
    // });
  };

  useEffect(() => {
    setNewWeight(pressedExercise.exercise.weight);
  }, [pressedExercise]);

  const addWeight = () => {
    let weight = parseInt(newWeight);
    console.log(newWeight,'type: ',typeof newWeight, 'weight: ',typeof weight)
    weight++;
    setNewWeight(weight.toString());
  };

  const removeWeight = () => {
    let weight = parseInt(newWeight);
    weight--;
    setNewWeight(weight.toString());
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
            setPressedExercise({
              pressed: false,
              exercise: {},
            });
          }}
        />
      </View>
      <View
        className="absolute top-24 left-8 bg-seventh w-5/6 rounded-xl transition-opacity duration-300 ease-in-out"
        style={{ elevation: 10 }}
      >
        <View className="flex relative w-full items-center justify-center">
          <Text className="text-white justify-self-center mt-10 text-xl">
            Edit Exercise
          </Text>
          <View className="mt-10 flex flex-column justify-center items-center mb-5">
            <View className="items-center justify-items-center">
              <Text className="text-white justify-self-center text-lg">
                Title
              </Text>
              <TextInput
                className="bg-fourth w-60 h-10 rounded-md mt-5 pl-2 text-white"
                placeholder={`${pressedExercise.exercise.name}`}
                placeholderTextColor="gray"
                onChangeText={(text) => {
                  setNewTitle(text);
                }}
              ></TextInput>
            </View>
            <View className="flex flex-column items-center justify-center w-full mt-10">
              <Text className="text-white text-lg mt-5">Weight</Text>
              <View className="flex flex-row justify-center items-center mt-5">
                <TouchableOpacity
                  className="bg-fourth rounded-lg h-12 mr-1 items-center justify-center px-2"
                  onPress={removeWeight}
                >
                  <MaterialCommunityIcons
                    name="minus"
                    size={28}
                    color="white"
                  />
                </TouchableOpacity>
                <View className="bg-fourth rounded-lg h-12 w-20 items-center justify-center">
                  <Text className="text-lightGreen text-xl font-extrabold">
                    {newWeight === "" ? "0" : newWeight}
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-fourth rounded-lg h-12 ml-1 items-center justify-center px-2"
                  onPress={addWeight}
                >
                  <MaterialCommunityIcons name="plus" size={28} color="white" />
                </TouchableOpacity>
              </View>
            </View>
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
