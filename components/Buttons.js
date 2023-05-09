import React from "react";
import { Pressable } from "react-native";

export const Btn = ({ style, children, onPress, disabled }) => (
  <Pressable disabled={disabled} onPress={onPress} style={style}>
    {children}
  </Pressable>
);
