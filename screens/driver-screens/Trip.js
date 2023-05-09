import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";

import Container from "../../components/Container";
import DelOrder from "../../components/DelOrder";
import InlineHeader from "../../components/InlineHeader";
import { COLORS, FONTS, SIZES } from "../../constants";
import orderContext from "../../context/order/orderContext";
import useLocation from "../../hooks/useLocation";
import { getClosestPointToOrigin, sortCoords, test } from "../../utils";

const Trip = ({ route }) => {
  const { title, tripId } = route.params;
  const location = useLocation();
  const { trip, getTripById, isLoading } = useContext(orderContext);
  const navigation = useNavigation();

  const [address, setAddress] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTripById(tripId);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!Object.keys(trip).length) return;

    const orders = trip.orders_ids;

    const address = orders.map((order) => ({
      latitude: order?.address?.location_lat,
      longitude: order?.address?.location_lng,
      id: order.id,
    }));

    const origin = {
      latitude: location?.location?.coords?.latitude,
      longitude: location?.location?.coords?.longitude,
    };

    const test = sortCoords(origin, address);
  }, [trip]);

  return (
    <Container style={stl.container}>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <>
          <InlineHeader title={title} />

          <FlatList
            data={trip?.orders_ids}
            renderItem={({ item, index }) => <DelOrder item={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </Container>
  );
};

const stl = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
  },
});

export default Trip;
