import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/Container";
import { COLORS, FONTS, SIZES } from "../../constants";
import Input from "../../components/Input";
import { Btn } from "../../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import orderContext from "../../context/order/orderContext";
import { makeCall } from "../../utils";
import useLocation from "../../hooks/useLocation";
import { Picker } from "@react-native-picker/picker";
import InlineHeader from "../../components/InlineHeader";
import ConfirmationModal from "../../components/ConfirmationModal";

const REJECT_REASONS = [
  { label: "test", value: 1 },
  { label: "test", value: 2 },
  { label: "test", value: 3 },
  { label: "test", value: 4 },
  { label: "test", value: 5 },
  { label: "اخرى", value: "others" },
];

const DeliveringOrder = ({ route }) => {
  const [note, setNote] = useState("");
  const [error, setError] = useState({ note: "", rejectReason: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [showNoteField, setShowNoteField] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const order = route.params.order;
  const navigation = useNavigation();
  const {
    trip,
    editOrder,
    editClientLocation,
    getRejectReasons,
    rejectReasons,
  } = useContext(orderContext);
  const { location } = useLocation();

  const handleNoteChange = (val) => {
    setNote(val);
    setError((pre) => ({ ...pre, note: "" }));
  };

  const handleSubmit = () => {
    editOrder(order.id, "3", rejectReason || note, () => {
      navigation.goBack();
    });
  };

  const handleReject = () => {
    if (!note && rejectReason === "others") {
      return setError((pre) => ({ ...pre, note: "يجب ادخال سبب الرفض" }));
    }
    if (!rejectReason) {
      return setError((pre) => ({
        ...pre,
        rejectReason: "يجب ادخال سبب الرفض",
      }));
    }

    editOrder(order.id, "0", note, () => {
      navigation.goBack();
    });
  };

  const handleChangeLocation = () => {
    editClientLocation(
      order.customer.id,
      location?.coords.latitude,
      location?.coords.longitude,
      () => setSuccessMessage("تم تثبيت موقع العميل")
    );
  };

  useEffect(() => {
    getRejectReasons();
    return () => {
      setNote("");
      setSuccessMessage("");
      setShowNoteField("");
    };
  }, []);

  useEffect(() => {
    if (rejectReason !== "others") return setShowNoteField(false);
    setShowNoteField(true);
    // setRejectReason("");
  }, [rejectReason]);

  return (
    <Container>
      <View style={{ marginTop: SIZES.large }}>
        <InlineHeader title={order.customer.name} />

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.font,
            marginBottom: SIZES.base,
            color: COLORS.red,
          }}
        >
          اسم العميل :{" "}
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.medium,
              color: "#333",
            }}
          >
            {order.customer.name}
          </Text>
        </Text>

        <View
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.font,
            color: COLORS.red,
            marginBottom: SIZES.base,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.font,
              color: COLORS.red,
              marginRight: SIZES.base,
            }}
          >
            الهاتف :
          </Text>
          <Btn onPress={() => makeCall(order.customer.mobile_number)}>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.medium,
                color: "#333",
                fontFamily: FONTS.regular,
              }}
            >
              {order.customer.mobile_number}
            </Text>
          </Btn>
        </View>

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.font,
            color: COLORS.red,
            marginBottom: SIZES.large,
          }}
        >
          العنوان :{" "}
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: SIZES.medium,
              color: "#333",
            }}
          >
            {order.customer.address_description}
          </Text>
        </Text>

        {order.note ? (
          <>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.medium,
                marginBottom: SIZES.large,
              }}
            >
              ملاحظات :{" "}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: SIZES.small,
              }}
            >
              {order.note}
            </Text>
          </>
        ) : null}

        {order?.order_products.length && (
          <Text
            style={{
              fontSize: SIZES.large,
              fontFamily: FONTS.bold,
              marginBottom: SIZES.medium,
            }}
          >
            الطلبات
          </Text>
        )}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: SIZES.large,
          }}
        >
          {order?.order_products?.map((order, i) => (
            <Text
              key={Math.random()}
              style={{
                color: COLORS.textGray,
                marginRight: SIZES.large,
                marginBottom: SIZES.base,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.font,
              }}
            >
              {order.qty} {order.product_name}
            </Text>
          ))}
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: error.rejectReason ? COLORS.red : "#ccc",
            borderRadius: 5,
            marginBottom: SIZES.large,
          }}
        >
          <Picker
            selectedValue={rejectReason}
            onValueChange={(itemValue) => {
              setRejectReason(itemValue);
              setError((pre) => ({ ...pre, rejectReason: "" }));
              setNote("");
            }}
          >
            <Picker.Item label={"سبب الرفض"} value={""} />
            {[...rejectReasons, { label: "اخرى", value: "others" }].map(
              (item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              )
            )}
          </Picker>
        </View>

        <View>
          {showNoteField && (
            <Input
              value={note}
              onChange={handleNoteChange}
              placeholder="سبب الرفض"
              allowFontScaling={true}
              multiline={true}
              style={{
                height: "auto",
                borderWidth: 1,
              }}
              error={error.note}
            />
          )}

          <View style={{ marginBottom: SIZES.extraLarge }}>
            <Btn
              onPress={handleChangeLocation}
              style={{ ...stl.btn, backgroundColor: COLORS.darkBlue }}
            >
              <Text style={{ fontFamily: FONTS.bold, color: "#fff" }}>
                تثبيت موقع العميل
              </Text>
            </Btn>
            {successMessage ? (
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: SIZES.font,
                  marginTop: SIZES.medium,
                  color: COLORS.red,
                }}
              >
                {successMessage}
              </Text>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Btn
              onPress={() => setShowConfirmationModal(true)}
              style={{ ...stl.btn, backgroundColor: COLORS.green }}
            >
              <Text style={{ fontFamily: FONTS.bold, color: "#fff" }}>
                اتمام
              </Text>
            </Btn>
            <Btn
              onPress={handleReject}
              style={{ ...stl.btn, backgroundColor: COLORS.red }}
            >
              <Text style={{ fontFamily: FONTS.bold, color: "#fff" }}>رفض</Text>
            </Btn>
          </View>
        </View>
      </View>
      <ConfirmationModal
        show={showConfirmationModal}
        setShow={setShowConfirmationModal}
        onConfirm={handleSubmit}
      />
    </Container>
  );
};

const stl = StyleSheet.create({
  btn: {
    width: "48%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
});

export default DeliveringOrder;
