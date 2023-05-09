import { Text, FlatList } from "react-native";
import Container from "../../components/Container";
import { FONTS, SIZES } from "../../constants";
import ProductCard from "../../components/ProductCard";
import InlineHeader from "../../components/InlineHeader";

const OrdersList = ({ route }) => {
  const { products, customerName } = route.params;

  return (
    <Container>
      <InlineHeader title={customerName} />

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default OrdersList;
