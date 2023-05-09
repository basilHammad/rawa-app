import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createOpenLink } from "react-native-open-maps";
import { COLORS, FONTS, SIZES } from "../constants";
import { Btn } from "./Buttons";

const OpenMapBtn = ({ order }) => {
  const [isPressed, setIsPressed] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (!isPressed) return;

    createOpenLink({
      start: "",
      end:
        order?.customer?.location_lat && order?.customer?.location_lng
          ? `${order?.customer?.location_lat}, ${order?.customer?.location_lng}`
          : "",
      navigate:
        order?.customer?.location_lat && order?.customer?.location_lng
          ? true
          : false,
    }).call();
    navigation.navigate("DeliveringOrder", {
      order: order,
      title: order?.customer?.name,
    });

    setIsPressed(false);
  }, [isPressed]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Btn style={stl.btn} onPress={() => setIsPressed(true)}>
        <Text
          style={{
            color: COLORS.blue,
            fontSize: SIZES.font,
            fontFamily: FONTS.bold,
          }}
        >
          توصيل
        </Text>
      </Btn>
    </View>
  );
};

const stl = StyleSheet.create({
  btn: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    color: COLORS.blue,
    flex: 1,
    textAlign: "center",
    borderTopWidth: 1,
    borderColor: COLORS.gray,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OpenMapBtn;
