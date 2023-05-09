import { View, Text, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../constants";

const Order = ({ item, index, length }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: index !== length - 1 ? 1 : 0,
        paddingBottom: 2,
        borderColor: "#eee",
        marginBottom: index !== length - 1 ? SIZES.medium : 0,
      }}
    >
      <Text
        style={{
          marginRight: SIZES.small,
          fontSize: SIZES.medium,
          fontFamily: FONTS.bold,
        }}
      >
        - {index + 1}
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("OrdersList", {
            products: item.order_products,
            customerName: item.full_name,
          });
        }}
        style={{ marginRight: "auto", flex: 1 }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.medium,
          }}
        >
          {item?.customer?.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingVertical: SIZES.base,
          }}
        >
          {item.order_products.map((order, i) => (
            <Text
              key={Math.random()}
              style={{
                color: COLORS.textGray,
                marginRight: SIZES.large,
                marginBottom: SIZES.base,
              }}
            >
              {order.qty} {order.product_name}
            </Text>
          ))}
        </View>
      </TouchableOpacity>
      {/* {item?.customer?.location_lat && item?.customer?.location_lng && (
        <Entypo
          name="location-pin"
          size={SIZES.extraLarge}
          color="blue"
          onPress={() =>
            navigation.navigate("CustomerAddress", {
              cords: {
                lat: item.customer.location_lat,
                lng: item.customer.location_lng,
              },
              name: item.full_name,
              title: item.full_name,
            })
          }
        />
      )} */}
    </View>
  );
};

export default Order;
