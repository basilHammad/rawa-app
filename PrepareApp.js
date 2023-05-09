import { useState, useEffect, useContext } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Network from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";

// import AdminStack from "./routes/AdminStack";
import DriverStack from "./routes/DriverStack";
import Login from "./screens/Login";
import { getData } from "./utils";
import userContext from "./context/user/userContext";
import Screen404 from "./screens/Screen404";

export default function PrepareApp() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isInternetReachable, setIsInternetReachable] = useState();

  const { isAdmin, isLoggedin, setIsAdmin, setIsLoggedin } =
    useContext(userContext);

  const prepare = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        cairoBold: require("./assets/fonts/cairo/bold.ttf"),
        cairoRegular: require("./assets/fonts/cairo/regular.ttf"),
        cairoSemiBold: require("./assets/fonts/cairo/semiBold.ttf"),
      });
      const { isInternetReachable } = await Network.getNetworkStateAsync();
      setIsInternetReachable(isInternetReachable);

      const token = await getData("userToken");
      if (token) {
        const role = await getData("userRole");
        if (role !== "provider") setIsAdmin(false);
        setIsLoggedin(true);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    prepare();
    // AsyncStorage.clear();
  }, []);

  if (!appIsReady) return null;

  if (!isInternetReachable) return <Screen404 />;

  if (isAdmin && isLoggedin) return <Text>Something went wrong</Text>;

  return isLoggedin ? <DriverStack /> : <Login setIsLoggedin={setIsLoggedin} />;
}
