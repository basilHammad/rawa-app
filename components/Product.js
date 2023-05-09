import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";

const Product = ({
  id,
  img,
  name,
  price,
  handleItemSelect,
  selectedItem,
  item,
}) => {
  return (
    <View
      style={{
        marginBottom: SIZES.small,
        padding: SIZES.medium,
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "#D4D4D4",
        backgroundColor: COLORS.white,
        ...SHADOWS.medium,
      }}
    >
      <View style={{ height: 150, width: "100%", marginBottom: SIZES.base }}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{ uri: img }}
          resizeMode="contain"
        />
      </View>
      <Text style={{ ...stl.text, color: COLORS.darkBlue }}>{name}</Text>
      <Text style={{ ...stl.text, color: COLORS.green }}>{price} دينار</Text>
      <View
        style={{
          width: "100%",
          height: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f6d398",
          paddingHorizontal: SIZES.base,
        }}
      >
        <Ionicons
          name="add"
          size={24}
          color="black"
          onPress={() => handleItemSelect(item, "+")}
          style={{
            backgroundColor: "#ffeac7",
            width: 50,
            height: 50,
            borderRadius: 25,
            textAlign: "center",
            textAlignVertical: "center",
            borderColor: "#fff",
          }}
        />
        <Text
          style={{
            ...stl.text,
          }}
        >
          {selectedItem?.qty}
        </Text>
        <Ionicons
          name="remove-outline"
          size={24}
          color="black"
          onPress={() => handleItemSelect(item, "-")}
          style={{
            backgroundColor: "#ffeac7",
            width: 50,
            height: 50,
            borderRadius: 25,
            textAlign: "center",
            textAlignVertical: "center",
            borderColor: "#fff",
          }}
        />
      </View>
    </View>
  );
};

const stl = StyleSheet.create({
  text: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    marginBottom: SIZES.base,
  },
});

export default Product;
