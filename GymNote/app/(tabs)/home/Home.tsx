import { useState, useRef, useEffect } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DayCard from "components/Cards/DayCard";
import { ScrollView } from "react-native-gesture-handler";
import { useStore } from "utils/useStore";
import NewWorkout from "components/Buttons/NewWorkout";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { EditWorkout } from "components/EditWorkout";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { supabase } from "utils/initSupabase";
import { Image } from "expo-image";

const Home = () => {
  const [pressedProfile, setPressedProfile] = useState<boolean>(false);
  const [pressedWorkout, setPressedWorkout] = useState({
    pressed: false,
    item: {},
  });
  const { workouts, userInfo, setUserInfo } = useStore();

  const item = workouts;

  const router = useRouter();
  const username = userInfo?.user_metadata.full_name;
  const picture = userInfo?.user_metadata.avatar_url;

  useEffect(() => {
    GoogleSignin.configure({}); // Initialize the Google Sign-In client
  }, [userInfo]);

  function workoutsCounter() {
    let numberOfExercises = 0;
    workouts.map((workout) => {
      workout.exercises.map((exercise) => {
        numberOfExercises++;
      });
    });
    return numberOfExercises;
  }

  const exercises = workoutsCounter();

  const scrollRef = useRef(null);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // Remember to remove the user from your app's state as well
      const { error } = await supabase.auth.signOut();
      console.error("Error in SignOut supabase: ", error);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    console.log("Logout");
    setPressedProfile(false);
    signOut();

    router.replace("/(auth)/login");
  };

  return (
    <>
      <ScrollView
        className="flex-1 mt-0 bg-seventh transition-opacity duration-300 ease-in-out"
        ref={scrollRef}
      >
        <StatusBar style="light" />

        <View className="flex flex-column flex-1 justify-evenly">
          <LinearGradient
            colors={["#284c8c", "#1f3d70"]}
            className="flex-column  pt-16 px-5 pb-5 rounded-3xl z-10 justify-between"
          >
            <View className="flex-row justify-between">
              <View className="column">
                <Text className="text-[#fff] font-bold text-4xl">Welcome</Text>
                <View className="flex flex-row items-center">
                  <MaterialCommunityIcons
                    name="dumbbell"
                    size={25}
                    color="yellow"
                  />
                  <Text className="text-[#fff] text-lg ml-1 text-center font-bold">
                    {username}
                  </Text>
                </View>
              </View>
              <TouchableHighlight
                onPress={() => setPressedProfile((prevState) => !prevState)}
              >
                <View className="w-12 h-12 rounded-md items-center justify-center">
                  {picture ? (
                    <Image
                      source={{ uri: picture }}
                      contentFit="cover"
                      transition={1000}
                      className="w-full h-full rounded-md"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="account"
                      size={30}
                      color="010101"
                      className="bg-cover w-full h-full rounded-md"
                    />
                  )}
                </View>
              </TouchableHighlight>
            </View>

            {pressedProfile && (
              <View className="absolute top-32 right-8 z-10">
                <View className="flex relative bg-black rounded-md w-24 h-12 items-center justify-center">
                  <TouchableHighlight onPress={logout}>
                    <Text className="flex text-lightGreen font-[CustomFontBold] text-md text-center ">
                      Logout
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}

            <View className="flex-column m-0 p-0">
              <Text className="mt-9 pt-2 text-9xl font-extrabold text-[#4fc19d]">
                {exercises}
              </Text>
              <Text className="text-lg font-bold text-[#fff]">
                {exercises > 1 ? <>Exercises</> : <>Exercise</>}
              </Text>
            </View>
          </LinearGradient>
          <ScrollView
            className="flex-1 bg-seventh px-5 py-5 mt-[-22]"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingBottom: 100,
            }}
          >
            <Stack.Screen
              options={{
                headerShown: false,
              }}
            />

            {item.map((item, index) => (
              <DayCard
                key={index}
                item={item}
                simultaneousHandlers={scrollRef}
                setPressedWorkout={setPressedWorkout}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {pressedWorkout.pressed ? (
        <EditWorkout
          setPressedWorkout={setPressedWorkout}
          pressedWorkout={pressedWorkout}
        />
      ) : (
        <NewWorkout
          name={"New Workout"}
          link={"home/newWorkoutModal"}
          color={"bg-lightGreen"}
          itemTitle={"New Workout"}
        />
      )}
    </>
  );
};

export default Home;
