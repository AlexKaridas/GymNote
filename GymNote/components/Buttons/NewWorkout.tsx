import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NewWorkout = ({ link, name, color, itemTitle }) => {
  return (
    <View className="absolute bottom-12 left-28 flex items-center justify-center">
      <Link href={{ pathname: `/(tabs)/${link}`, params: { itemTitle } }}>
        <TouchableOpacity
          className={`${color} rounded-2xl w-44 h-10 shadow-lg flex flex-row items-center justify-center px-2`}
          style={{
            shadowColor: "#000000",
            elevation: 9,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.8,
            shadowRadius: 10,
          }}
        >
          <MaterialCommunityIcons name="plus-thick" size={20} color={"white"} />
          <Text className="text-white font-bold text-md ml-2">{name}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default NewWorkout;
