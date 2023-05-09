import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import SearchableDropDown from "react-native-searchable-dropdown";
import { Picker } from "@react-native-picker/picker";

import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";
import { closeKeyboard } from "../utils";
import { Btn } from "./Buttons";
import { useState } from "react";

const PAYMENT_TYPES = [
  { text: "كاش", value: 1, id: 1 },
  { text: "كوبون", value: 2, id: 2 },
  { text: "ذمم", value: 3, id: 3 },
];

const CreateOrderModal = ({
  showModal,
  setShowModal,
  selectedClient,
  setSelectedClient,
  clients,
  handelSubmit,
  error,
  setError,
  loading,
  setPaymentType,
  paymentType,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <TouchableWithoutFeedback onPress={closeKeyboard}>
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
              minHeight: 500,

              ...SHADOWS.dark,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.extraLarge,
                marginBottom: SIZES.extraLarge,
              }}
            >
              اختر العميل
            </Text>
            {clients.length ? (
              <SearchableDropDown
                onTextChange={() => setError((pre) => ({ ...pre, client: "" }))}
                onItemSelect={(item) => {
                  setSelectedClient(item);
                  setError((pre) => ({ ...pre, client: "" }));
                }}
                onRemoveItem={(item, index) => {
                  setSelectedClient({});
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: "#fff",
                  borderColor: "#bbb",
                  borderWidth: 1,
                  borderTopWidth: 0,
                  // borderRadius: 5,
                }}
                itemTextStyle={{ color: "#222" }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={clients}
                resetValue={false}
                textInputProps={{
                  placeholder: selectedClient.name
                    ? selectedClient.name
                    : "العميل",
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: error.client ? COLORS.red : "#ccc",
                    borderRadius: 5,
                  },
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
            ) : null}
            {error.client ? (
              <Text
                style={{
                  color: COLORS.red,
                  paddingHorizontal: SIZES.small,
                  fontFamily: FONTS.regular,
                  fontSize: SIZES.small,
                }}
              >
                {error.client}
              </Text>
            ) : null}

            <View
              style={{
                borderWidth: 1,
                borderColor: error.paymentType ? COLORS.red : "#ccc",
                borderRadius: 5,

                // backgroundColor: "red",
                marginTop: SIZES.medium,
              }}
            >
              <Picker
                selectedValue={paymentType}
                onValueChange={(itemValue) => {
                  setPaymentType(itemValue);
                  setError((pre) => ({ ...pre, paymentType: "" }));
                }}
              >
                <Picker.Item label={"طريقة الدفع"} value={""} />
                {PAYMENT_TYPES.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.text}
                    value={item.value}
                  />
                ))}
              </Picker>
            </View>
            {error.paymentType ? (
              <Text
                style={{
                  color: COLORS.red,
                  paddingHorizontal: SIZES.small,
                  fontFamily: FONTS.regular,
                  fontSize: SIZES.small,
                }}
              >
                {error.paymentType}
              </Text>
            ) : null}

            <Btn
              style={{
                backgroundColor: COLORS.darkBlue,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                marginTop: "auto",
                borderRadius: SIZES.large,
              }}
              onPress={() => handelSubmit()}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.medium,
                  }}
                >
                  اتمام
                </Text>
              )}
            </Btn>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateOrderModal;
