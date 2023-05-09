import { useState, useContext, useEffect, useCallback } from "react";
import { Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { COLORS, FONTS, SIZES } from "../../constants";
import Container from "../../components/Container";
import Trip from "../../components/Trip";
import orderContext from "../../context/order/orderContext";

import useLocation from "../../hooks/useLocation";

const Trips = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, trips, getTrips } = useContext(orderContext);
  const { location } = useLocation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTrips(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTrips();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container style={stl.container}>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.extraLarge,
              marginVertical: SIZES.large,
              textAlign: "center",
              marginBottom: SIZES.extraLarge * 1.5,
            }}
          >
            الرحلات
          </Text>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={trips}
            renderItem={({ item, index }) => (
              <Trip
                item={item}
                index={index}
                length={trips.length}
                location={location}
                getTrips={getTrips}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
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

export default Trips;
