import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import NewWorkout from "components/Buttons/NewWorkout";
import { ScrollView } from "react-native-gesture-handler";
import ExerciseCard from "components/Cards/ExerciseCard";
import { EditExercise } from "components/EditExercise";
import { useRef } from "react";
import { StatusBar } from "expo-status-bar";

interface LocalSearchParams {
  id: string;
}

const WorkoutScreen = () => {
  const { id } = useLocalSearchParams();
  const [pressedExercise, setPressedExercise] = useState({
    pressed: false,
    exercise: {},
  });
  const navigation = useNavigation();
  const decodedId = decodeURIComponent(id);
  const item = JSON.parse(decodedId);

  useEffect(() => {
    navigation.setOptions({
      title: item.title,
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
  }, [item, navigation]);

  const scrollRef = useRef(null);

  console.log("Pressed Edit Exercise: ", pressedExercise);

  return (
    <View className="flex-1">
      <StatusBar style="light" />

      <ScrollView
        className="bg-seventh px-5 py-5"
        showsVerticalScrollIndicator={false}
        horizontal={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
        }}
      >
        {item.exercises.map((exercise, index) => (
          <ExerciseCard
            simultaneousHandlers={scrollRef}
            exercise={exercise}
            key={index}
            title={exercise.title}
            setPressedExercise={setPressedExercise}
          />
        ))}
      </ScrollView>
      {pressedExercise.pressed ? (
        <EditExercise
          setPressedExercise={setPressedExercise}
          pressedExercise={pressedExercise}
        />
      ) : (
        <NewWorkout
          name={"New Exercise"}
          link={"workout/newExerciseModal"}
          color={"bg-red"}
          itemTitle={"New Exercise"}
        />
      )}
    </View>
  );
};

export default WorkoutScreen;
