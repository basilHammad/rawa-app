import { useState, useContext, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
} from "react-native";

import { COLORS, FONTS, SIZES } from "../constants";
import { closeKeyboard, validateLoginForm } from "../utils";
import Container from "../components/Container";
import Input from "../components/Input";
import { Btn } from "../components/Buttons";
import userContext from "../context/user/userContext";
import useKeyboard from "../hooks/useKeyboard";

import Logo from "../components/Logo";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { isLoading, login } = useContext(userContext);
  const iskeyboardOpen = useKeyboard();

  const handleUsernameChange = (val) => {
    setusername(val);
    setErrors((pre) => ({ ...pre, username: "" }));
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
    setErrors((pre) => ({ ...pre, password: "" }));
  };

  const handelSubmit = () => {
    const validationErrors = validateLoginForm(username, password);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    // login("api_provider", "123456", setErrors);
    // login("0785130430", "123456", setErrors);
    login(username, password, setErrors);
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
          <View style={{ marginBottom: SIZES.extraLarge * 2 }}>
            <Logo width={100} height={iskeyboardOpen ? 100 : 150} />
          </View>

          <Input
            value={username}
            onChange={handleUsernameChange}
            placeholder="اسم المستخدم او رقم الهاتف"
            error={errors.username}
            style={{
              minHeight: 40,
              borderBottomWidth: 3,
              fontFamily: FONTS.regular,
            }}
            pareintStyle={{ width: "90%" }}
          />
          <Input
            value={password}
            onChange={handlePasswordChange}
            placeholder="كلمة السر"
            error={errors.password}
            style={{
              minHeight: 40,
              borderBottomWidth: 3,
              fontFamily: FONTS.regular,
            }}
            pareintStyle={{ width: "90%" }}
            isPassword
          />
          {errors?.generalError && (
            <Text
              style={{
                color: COLORS.red,
                fontFamily: FONTS.semiBold,
                marginBottom: SIZES.medium,
              }}
            >
              {errors?.generalError}
            </Text>
          )}
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
                تسجيل الدخول
              </Text>
            )}
          </Btn>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Login;
