import { TextInput, Text, View } from "react-native";
import React from "react";

import { COLORS, SIZES } from "../constants";

const Input = ({
  value,
  onChange,
  placeholder,
  style,
  pareintStyle,
  error,
  isPassword,
  multiline,
}) => {
  return (
    <View
      style={{
        marginBottom: SIZES.large,
        ...pareintStyle,
      }}
    >
      <TextInput
        style={{
          borderColor: error ? COLORS.red : COLORS.gray,
          padding: SIZES.small,
          textAlign: "right",
          ...style,
        }}
        value={value}
        onChangeText={(val) => onChange(val)}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        multiline={multiline}
      />

      <Text
        style={{
          marginBottom: SIZES.small,
          color: COLORS.red,
          opacity: error ? 1 : 0,
        }}
      >
        {error}
      </Text>
    </View>
  );
};

export default Input;
