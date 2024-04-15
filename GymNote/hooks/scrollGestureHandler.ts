// Import necessary dependencies
import {
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

// Function to create the scroll gesture handler
export const createScrollGestureHandler = (
  translateX,
  translate_x_max,
  shouldDismiss
) => {
  return useAnimatedGestureHandler({
    onActive: () => {
      // If a scroll occurs, reset the item's translation and shouldDismiss state
      translateX.value = withTiming(0);
      shouldDismiss.value = false;
    },
  });
};
