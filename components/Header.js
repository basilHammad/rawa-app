import React, { useContext } from "react";
import { View, Text } from "react-native";

import Logo from "../components/Logo";
import { COLORS, FONTS, SIZES } from "../constants";
import userContext from "../context/user/userContext";
import { Btn } from "./Buttons";

const LogoTitle = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1,
        paddingHorizontal: SIZES.medium,
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            marginLeft: SIZES.small,
          }}
        >
          روى
        </Text>
        <View>
          <Logo width={40} height={40} />
        </View>
      </View>
      {/* <Btn
        style={{
          marginRight: SIZES.extraLarge,
        }}
        onPress={() => setIsLoggedin(false)}
      >
        <Text
          style={{
            fontSize: SIZES.large,
            fontFamily: FONTS.semiBold,
            color: COLORS.blue,
          }}
        >
          تسجيل الخروج
        </Text>
      </Btn> */}
    </View>
  );
};

export default LogoTitle;
