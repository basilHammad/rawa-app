import {
  View,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import Container from "../../components/Container";
import { closeKeyboard } from "../../utils";
import { COLORS, FONTS, SIZES } from "../../constants";
import useKeyboard from "../../hooks/useKeyboard";
import { Btn } from "../../components/Buttons";
import Input from "../../components/Input";
import userContext from "../../context/user/userContext";
import { useNavigation } from "@react-navigation/native";

const EditPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const iskeyboardOpen = useKeyboard();
  const { isLoading, editPassword } = useContext(userContext);
  const navigation = useNavigation();

  const handleOldPassword = (val) => {
    setOldPassword(val);
    setErrors((pre) => ({ ...pre, oldPassword: "" }));
  };

  const handleNewPassword = (val) => {
    setNewPassword(val);
    setErrors((pre) => ({ ...pre, newPassword: "" }));
  };

  const handleConfirmPassword = (val) => {
    setConfirmPassword(val);
    setErrors((pre) => ({ ...pre, confirmPassword: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!oldPassword.trim()) errors.oldPassword = "يجب ادخال كلمة السر القديمة";
    if (!newPassword.trim()) errors.newPassword = "يجب ادخال كلمة السر الجديدة";
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "يجب تاكيد كلمة السر";
    } else if (confirmPassword.trim() !== newPassword.trim()) {
      errors.confirmPassword = "كلمة السر غير مطابقة";
    }

    return errors;
  };

  const handelSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length) {
      return setErrors((pre) => ({ ...pre, ...errors }));
    }

    editPassword(oldPassword, newPassword, confirmPassword, setErrors, () => {
      setSuccessMsg("تم تعديل كلمة السر");
      setTimeout(() => {
        navigation.navigate("Trips");
      }, 1000);
    });
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={closeKeyboard}>
        <View
          style={{
            flex: 1,
            paddingTop: 100,
            alignItems: "center",
          }}
        >
          {successMsg ? (
            <Text
              style={{
                fontSize: SIZES.medium,
                fontFamily: FONTS.bold,
                color: COLORS.green,
                marginBottom: SIZES.large,
              }}
            >
              {successMsg}
            </Text>
          ) : null}
          <Input
            value={oldPassword}
            onChange={handleOldPassword}
            placeholder="كلمة السر القديمة"
            error={errors.oldPassword}
            style={{
              height: 40,
              borderBottomWidth: 3,
              fontFamily: FONTS.regular,
            }}
            pareintStyle={{ width: "90%" }}
            isPassword
          />
          <Input
            value={newPassword}
            onChange={handleNewPassword}
            placeholder="كلمة السر الجديدة"
            error={errors.newPassword}
            style={{
              height: 40,
              borderBottomWidth: 3,
              fontFamily: FONTS.regular,
            }}
            pareintStyle={{ width: "90%" }}
            isPassword
          />
          <Input
            value={confirmPassword}
            onChange={handleConfirmPassword}
            placeholder="تاكيد كلمة السر"
            error={errors.confirmPassword}
            style={{
              height: 40,
              borderBottomWidth: 3,
              fontFamily: FONTS.regular,
            }}
            pareintStyle={{ width: "90%" }}
            isPassword
          />

          <Btn
            style={{
              backgroundColor: COLORS.yellow,
              width: "100%",
              justifyContet: "center",
              alignItems: "center",
              padding: SIZES.small,
              borderRadius: SIZES.medium,
              minHeight: 50,
              marginTop: iskeyboardOpen ? 0 : "auto",
              marginBottom: SIZES.large * 2,
            }}
            onPress={handelSubmit}
          >
            {isLoading ? (
              <ActivityIndicator style={{ flex: 1 }} color={COLORS.blue} />
            ) : (
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  flex: 1,
                  textAlignVertical: "center",
                }}
              >
                تعديل
              </Text>
            )}
          </Btn>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default EditPassword;
