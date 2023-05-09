import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS, SIZES } from "../constants";

const InlineHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: SIZES.large,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.bold,
          fontSize: SIZES.extraLarge,
        }}
      >
        {title}
      </Text>
      <Ionicons
        name="arrow-back"
        size={32}
        color="black"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default InlineHeader;
