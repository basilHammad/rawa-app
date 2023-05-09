import { useState, useEffect } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

const useLocation = () => {
  const [location, setLocation] = useState(null);

  const requestLocationPermissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    return status;
  };

  const getCurrentLocation = async () => {
    const status = await requestLocationPermissions();
    if (status !== "granted") return;
    const location = await getCurrentPositionAsync({});
    setLocation(location);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    location,
  };
};

export default useLocation;
