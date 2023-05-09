import * as types from "../actionTypes";

const userReducer = (state, action) => {
  switch (action.type) {
    case types.GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
        isLoggedin: true,
        // isAdmin: action.payload.role === "provider" ? true : false,
      };
    case types.SET_IS_LOGGEDIN:
      return {
        ...state,
        isLoggedin: action.payload,
      };
    case types.SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    case types.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
