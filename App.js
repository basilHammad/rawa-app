import "react-native-gesture-handler";
import { I18nManager } from "react-native";

import PrepareApp from "./PrepareApp";
import UserState from "./context/user/userState";
import OrderState from "./context/order/orderState";

export default function App() {
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);

  return (
    <UserState>
      <OrderState>
        <PrepareApp />
      </OrderState>
    </UserState>
  );
}
