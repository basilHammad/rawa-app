import { View, Text, Modal, StyleSheet } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";
import { Btn } from "./Buttons";

const ConfirmationModal = ({ show, setShow, onConfirm }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        setShow(false);
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,.5)",
        }}
      >
        <View
          style={{
            padding: SIZES.large,
            width: "91%",
            backgroundColor: COLORS.white,
            borderRadius: SIZES.large,

            ...SHADOWS.dark,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: FONTS.bold,
              fontSize: SIZES.font,
              marginTop: SIZES.medium,
            }}
          >
            هل انت متاكد
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: SIZES.extraLarge,
            }}
          >
            <Btn
              onPress={onConfirm}
              style={{ ...stl.btn, backgroundColor: COLORS.green }}
            >
              <Text style={{ fontFamily: FONTS.bold, color: "#fff" }}>
                اتمام
              </Text>
            </Btn>

            <Btn
              onPress={() => setShow(false)}
              style={{ ...stl.btn, backgroundColor: COLORS.red }}
            >
              <Text style={{ fontFamily: FONTS.bold, color: "#fff" }}>
                الغاء
              </Text>
            </Btn>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const stl = StyleSheet.create({
  btn: {
    width: "35%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
});

export default ConfirmationModal;
