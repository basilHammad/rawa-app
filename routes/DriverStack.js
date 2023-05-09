import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Trips from "../screens/driver-screens/Trips";
import Header from "../components/Header";
import TripOrders from "../screens/driver-screens/TripOrders";
import CustomerAddressMap from "../screens/driver-screens/CustomerAddressMap";
import OrdersList from "../screens/driver-screens/OrdersList";
import Trip from "../screens/driver-screens/Trip";
import DeliveringOrder from "../screens/driver-screens/DeliveringOrder";
import { FONTS, SIZES } from "../constants";
import userContext from "../context/user/userContext";
import EditPassword from "../screens/driver-screens/EditPassword";
import Orders from "../screens/driver-screens/Orders/Orders";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const TripsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Trips"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Trips"
        component={Trips}
        options={{
          headerTitle: (props) => <Header {...props} />,
        }}
      />

      <Stack.Screen
        name="Orders"
        component={TripOrders}
        options={{ title: "الطلبات" }}
      />
      <Stack.Screen
        name="CustomerAddress"
        component={CustomerAddressMap}
        options={{ title: "عنوان العميل" }}
      />
      <Stack.Screen name="OrdersList" component={OrdersList} />
      <Stack.Screen
        name="Trip"
        component={Trip}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="DeliveringOrder"
        component={DeliveringOrder}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
};

const DriverStack = () => {
  const { setIsLoggedin } = useContext(userContext);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition={"right"}
        initialRouteName="Trips"
        screenOptions={{
          swipeEnabled: false,
        }}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="تسجيل الخروج"
                onPress={() => {
                  AsyncStorage.clear();
                  setIsLoggedin(false);
                }}
                labelStyle={{
                  fontSize: SIZES.large,
                  fontFamily: FONTS.semiBold,
                }}
              />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen
          name="الرحلات"
          component={TripsStack}
          options={{
            headerTitle: (props) => <Header {...props} />,
            drawerLabelStyle: {
              fontSize: SIZES.large,
              fontFamily: FONTS.semiBold,
            },
          }}
        />
        <Drawer.Screen
          name="الطلبات"
          component={Orders}
          options={{
            headerTitle: (props) => <Header {...props} />,
            drawerLabelStyle: {
              fontSize: SIZES.large,
              fontFamily: FONTS.semiBold,
            },
          }}
        />
        <Drawer.Screen
          name="تعديل كلمة السر"
          component={EditPassword}
          options={{
            headerTitle: (props) => <Header {...props} />,
            drawerLabelStyle: {
              fontSize: SIZES.large,
              fontFamily: FONTS.semiBold,
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DriverStack;
