import Moment from "moment";

import { View, Text, StyleSheet } from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";
import { Btn } from "./Buttons";
import { useContext } from "react";
import orderContext from "../context/order/orderContext";

const Trip = ({ item, location, getTrips }) => {
  const { endTrip, startTrip } = useContext(orderContext);
  const navigation = useNavigation();

  const handleEndTrip = (id) => {
    endTrip(id, getTrips);
  };

  const handleStartTrip = (item) => {
    startTrip(item.id, () =>
      navigation.navigate("Trip", {
        orders: item.orders_ids,
        title: item.trip_name,
        tripId: item.id,
      })
    );
  };
  return (
    <View
      style={{
        paddingTop: SIZES.medium,
        marginBottom: SIZES.base,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "#D4D4D4",
        backgroundColor: COLORS.white,
        ...SHADOWS.medium,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: SIZES.medium,
        }}
      >
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: FONTS.bold,
            marginBottom: SIZES.base,
            paddingHorizontal: SIZES.medium,
          }}
        >
          {item.trip_name}
        </Text>

        <Text
          style={{
            color: "gray",
            paddingLeft: SIZES.medium,
            fontSize: SIZES.medium,
            fontFamily: FONTS.bold,
          }}
        >
          {Moment(item.trip_delivery_date).calendar()}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: SIZES.medium,
          marginBottom: SIZES.small,
        }}
      >
        <Text style={stl.text}>
          صافي السعر: <Text style={stl.text}>{item.total_price}</Text>
        </Text>

        <Text
          style={{
            ...stl.text,
            color: COLORS.green,
          }}
        >
          الطلبات: {item.orders_ids.length}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          borderTopWidth: 1,
          borderColor: COLORS.gray,
        }}
      >
        <Link
          style={{
            paddingHorizontal: SIZES.medium,
            paddingVertical: SIZES.small,
            color: COLORS.blue,
            flex: 1,
            textAlign: "center",
            borderRightWidth: 1,
            borderColor: COLORS.gray,
            ...stl.text,
          }}
          to={{
            screen: "Orders",
            params: {
              orders: item.orders_ids,
              title: item.trip_name,
              isTrip: true,
              location: location,
            },
          }}
        >
          مشاهدة
        </Link>
        {item?.orders_ids?.length ? (
          <Btn
            style={{
              paddingHorizontal: SIZES.medium,
              paddingVertical: SIZES.small,
              color: COLORS.blue,
              flex: 1,
              textAlign: "center",
              borderRightWidth: 1,
              borderColor: COLORS.gray,
              ...stl.text,
            }}
            onPress={() => handleStartTrip(item)}
            // to={{
            //   screen: "Trip",
            //   params: {
            //     orders: item.orders_ids,
            //     title: item.trip_name,
            //     tripId: item.id,
            //   },
            // }}
          >
            <Text
              style={{
                ...stl.text,
                color: COLORS.blue,
                textAlign: "center",
              }}
            >
              بدأ
            </Text>
          </Btn>
        ) : (
          <Btn
            style={{
              paddingHorizontal: SIZES.medium,
              paddingVertical: SIZES.small,

              flex: 1,
              borderRightWidth: 1,
              borderColor: COLORS.gray,
              ...stl.text,
            }}
            onPress={() => handleEndTrip(item.id)}
          >
            <Text
              style={{
                ...stl.text,
                color: COLORS.red,
                textAlign: "center",
              }}
            >
              {" "}
              انهاء
            </Text>
          </Btn>
        )}
      </View>
    </View>
  );
};

const stl = StyleSheet.create({
  text: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
  },
});

export default Trip;
