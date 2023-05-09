import { View, Image } from "react-native";

import Container from "../components/Container";
import { SIZES } from "../constants";

const Screen404 = () => {
  return (
    <Container>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingTop: SIZES.extraLarge * 5,
        }}
      >
        <Image
          style={{ width: "80%", height: "50%" }}
          source={require("../assets/404.jpg")}
          resizeMode="cover"
        />
      </View>
    </Container>
  );
};

export default Screen404;
