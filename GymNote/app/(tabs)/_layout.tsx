import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home/Home"
        options={{
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="home/newWorkoutModal"
        options={{
          presentation: "modal",
          headerStyle: {
            backgroundColor: "#212129",
          },
          headerTitleStyle: {
            color: "#FFFFFF",
            fontFamily: "CustomFontBold",
            fontSize: 18,
          },
          headerTitle: "Add New Workout",
          headerBackButtonMenuEnabled: true,
          headerTintColor: "#fff",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="workout/newExerciseModal"
        options={{
          presentation: "modal",
          headerStyle: {
            backgroundColor: "#212129",
          },
          headerTitleStyle: {
            color: "#FFFFFF",
            fontFamily: "CustomFontBold",
            fontSize: 18,
          },
          headerTitle: "Add New Workout",
          headerBackButtonMenuEnabled: true,
          headerTintColor: "#fff",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="workout/[id]"
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}
