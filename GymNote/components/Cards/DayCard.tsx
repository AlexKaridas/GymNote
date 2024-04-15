import { View, Text, Dimensions, Touchable } from "react-native";
import { Link } from "expo-router";
import {
  PanGestureHandlerGestureEvent,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler } from "react-native-reanimated";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DayCard = ({ item, simultaneousHandlers, setPressedWorkout }) => {
  const defaultTitle = "New Workout";
  const itemString = JSON.stringify(item);

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
    console.log("Pressed: ", item);
    setPressedWorkout({ pressed: true, item: item });
  };

  return (
    <Animated.View style={[rTaskContainerStyle, taskContainer]}>
      <View className="absolute transition-opacity duration-300 ease-in-out w-full h-20 mt-8 bg-lightGreen rounded-lg justify-center items-left pl-3">
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
            <TouchableOpacity
              className="flex bg-fifth z-20 w-full rounded-sm h-20 mt-8 border-l-lightGreen ml-1 justify-evenly"
              style={{ elevation: 0 }}
              activeOpacity={0.99}
            >
              <Text className="text-white  z-20 font-[CustomFontBold] text-lg w-full items-center justify-center ml-3">
                {item.title && item.title.length > 0
                  ? item.title
                  : defaultTitle}
              </Text>
              <View className="flex flex-row z-20 items-center ml-3">
                <Text className="text-white  z-20 font-[CustomFontBold] text-[12px]">
                  Exercises{" "}
                </Text>
                <Text className="text-lightGreen z-20  font-[CustomFontBold] text-[16px]">
                  {item.exercises.length}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default DayCard;
