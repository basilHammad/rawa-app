import React, { useReducer } from "react";
import fetcher from "../../config/axios";
import userContext from "./userContext";
import userReducer from "./userReducer";

import * as types from "../actionTypes";
import { storeData } from "../../utils";

const UserState = (props) => {
  const intialState = {
    user: [],
    isLoggedin: false,
    isAdmin: false,
    isLoading: false,
  };

  const [state, dispatch] = useReducer(userReducer, intialState);

  const setIsLoggedin = (val) => {
    dispatch({
      type: types.SET_IS_LOGGEDIN,
      payload: val,
    });
  };

  const setIsAdmin = (val) => {
    dispatch({
      type: types.SET_IS_ADMIN,
      payload: val,
    });
  };

  const setIsloading = (val) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: val,
    });
  };

  const editPassword = async (oldPass, newPass, confirmPass, setErrors, cb) => {
    setIsloading(true);

    try {
      const data = JSON.stringify({
        current_password: oldPass,
        new_password: newPass,
        new_confirm_password: confirmPass,
      });
      const res = await fetcher.post("api/change-password", data);

      if (res.status === 200) cb();

      setIsloading(false);
    } catch (error) {
      if (error.response.data.errors.current_password[0]) {
        setErrors((pre) => ({
          ...pre,
          oldPassword: error.response.data.errors.current_password[0],
        }));
      }
      setIsloading(false);
    }
  };

  const login = async (userName, password, setErrors) => {
    setIsloading(true);
    try {
      const data = JSON.stringify({
        username: userName,
        password: password,
      });

      const res = await fetcher.post("api/login", data);

      if (res.data) {
        setIsloading(false);

        setErrors({});
        dispatch({
          type: types.GET_USER_DATA,
          payload: res.data.data,
        });
        await storeData("userToken", res.data.data.access_token);
        await storeData("userRole", res.data.data.role);
      }

      if (res.data.data.role !== "provider") setIsAdmin(false);
    } catch (error) {
      if (error.response) {
        setIsloading(false);

        if (error.response.status === 401) {
          setErrors((prev) => ({
            ...prev,
            generalError: error.response.data.message,
          }));
        }

        console.log({ ...error });
      }
    }
  };

  return (
    <userContext.Provider
      value={{
        ...state,
        login,
        setIsLoggedin,
        setIsAdmin,
        editPassword,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
