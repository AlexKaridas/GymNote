import { View, Text, Dimensions } from "react-native";
import Animated, { useAnimatedGestureHandler } from "react-native-reanimated";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Link } from "expo-router";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  PanGestureHandlerGestureEvent,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ExerciseCard = ({
  exercise,
  simultaneousHandlers,
  setPressedExercise,
  title,
}) => {
  const defaultTitle = "New Workout";
  const itemString = JSON.stringify(exercise);

  const listItemHeight = 100;

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(listItemHeight);

  const { width: screenWidth } = Dimensions.get("window");
  const translate_x_max = screenWidth * 0.1;

  // Additional state to track whether the item has been dismissed
  const shouldDismiss = useSharedValue(false);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      if (!shouldDismiss.value) {
        // If the item is not dismissed, restrict translation to be within 30% of the element's width
        translateX.value = Math.min(
          translate_x_max,
          Math.max(0, event.translationX)
        );
      } else {
        // If the item is dismissed, allow positive translation on the X-axis (swipe right)
        translateX.value = translate_x_max + Math.max(0, event.translationX);
      }
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value > translate_x_max;
      if (shouldBeDismissed) {
        // If the item should be dismissed, set the shouldDismiss state to true
        shouldDismiss.value = true;
      } else {
        // If the item should not be dismissed, reset its translation and shouldDismiss state
        shouldDismiss.value = false;
        // translateX.value = withTiming(0);
      }
    },
  });

  // Gesture handler for scroll gestures
  const scrollGesture = useAnimatedGestureHandler({
    onActive: () => {
      // If a scroll occurs, reset the item's translation and shouldDismiss state
      translateX.value = withTiming(0);
      shouldDismiss.value = false;
    },
  });

  const rstyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
    };
  });

  const taskContainer = {
    height: 100,
  };

  const handlePress = () => {
    console.log("Pressed: ", exercise);
    setPressedExercise({ pressed: true, exercise: exercise });
  };

  return (
    <Animated.View style={[rTaskContainerStyle, taskContainer]}>
      <View className="absolute transition-opacity duration-300 ease-in-out w-full h-20 mt-5 bg-red rounded-lg justify-center items-left pl-3">
        <TouchableOpacity onPress={handlePress}>
          <MaterialCommunityIcons name="pen" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <PanGestureHandler
        onGestureEvent={panGesture}
        simultaneousHandlers={simultaneousHandlers}
      >
        <Animated.View style={rstyle}>
          <Link
            href={{
              pathname: `/(tabs)/workout/[id]`,
              params: { id: itemString },
            }}
            asChild
          >
            <View
              className="flex w-full bg-fifth h-20 justify-between mt-5 border-l-4 border-red p-4 rounded-md flex-row shadow-md"
              style={{ elevation: 9 }}
            >
              <View className="flex flex-column justify-evenly">
                <Text className="text-white font-[CustomFontBold] text-lg">
                  {exercise.name}
                </Text>
              </View>
              <View className="flex flex-column items-center justify-evenly">
                <Text className="text-white font-extrabold text-lg ml-2">
                  {exercise.weight} kg
                </Text>
              </View>
            </View>
          </Link>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default ExerciseCard;
