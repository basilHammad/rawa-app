import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants";

const ProductCard = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor: "#F5F6F8",
        padding: SIZES.medium,
        flexDirection: "row",
        borderRadius: SIZES.large,
        marginBottom: SIZES.medium,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Text style={stl.text}>{item.product_name}</Text>
        <View style={{ justifyContent: "space-between" }}>
          <Text style={stl.text}>دينار {item.price} </Text>
          <Text style={{ ...stl.text, color: COLORS.green }}>
            الكمية : {item.qty}
          </Text>
        </View>
      </View>
    </View>
  );
};

const stl = StyleSheet.create({
  text: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
  },
});

export default ProductCard;
