import { Text, FlatList, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";

import orderContext from "../../../context/order/orderContext";
import Container from "../../../components/Container";
import Product from "../../../components/Product";
import { Btn } from "../../../components/Buttons";

import { COLORS, FONTS, SIZES } from "../../../constants";
import CreateOrderModal from "../../../components/CreateOrderModal";

const Orders = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});
  const [error, setError] = useState({ paymentType: "", client: "" });
  const [paymentType, setPaymentType] = useState("");

  const {
    getProducts,
    products,
    getClients,
    clients,
    createOrder,
    internalLoading,
  } = useContext(orderContext);

  const handleItemSelect = (product, flag) => {
    const foundItem = selectedItems.find((item) => item.id === product.id);
    const foundItemPrice = products.find(
      (item) => item.id === product.id
    ).price;

    if (foundItem) {
      const foundItemIndex = selectedItems.indexOf(foundItem);
      const selectedItemsCopy = [...selectedItems];

      if (flag === "-" && foundItem.qty === 1) {
        selectedItemsCopy.splice(foundItemIndex, 1);
        setSelectedItems(selectedItemsCopy);
        return;
      }

      const updatedQty = flag === "+" ? foundItem.qty + 1 : foundItem.qty - 1;

      selectedItemsCopy[foundItemIndex] = {
        ...foundItem,
        qty: updatedQty,
        price: updatedQty * foundItemPrice,
      };

      setSelectedItems(selectedItemsCopy);
      return;
    }

    if (flag === "-" && !foundItem) return;

    setSelectedItems((pre) => [...pre, { ...product, qty: 1 }]);
  };

  const reset = () => {
    setSelectedItems([]);
    setSelectedClient({});
    setError("");
    setShowModal(false);
  };

  const handelSubmit = () => {
    if (!Object.keys(selectedClient).length) {
      return setError((pre) => ({ ...pre, client: "يجب اختيار العميل" }));
    }
    if (!paymentType) {
      return setError((pre) => ({
        ...pre,
        paymentType: "يجب اختيار طريقة الدفع",
      }));
    }

    createOrder(selectedClient.id, selectedItems, paymentType, reset);
  };

  useEffect(() => {
    getProducts();
    getClients();
  }, []);

  return (
    <Container style={{ backgroundColor: COLORS.gray }}>
      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <Product
            item={item}
            id={item.id}
            img={item.img}
            name={item.name}
            price={item.price}
            handleItemSelect={handleItemSelect}
            selectedItem={selectedItems.find(
              (product) => product.id === item.id
            )}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: SIZES.extraLarge }}
      />
      <Btn
        style={stl.btn}
        onPress={() => setShowModal(true)}
        disabled={!selectedItems.length ? true : false}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontFamily: FONTS.bold,
            fontSize: SIZES.medium,
          }}
        >
          استمرار
        </Text>
      </Btn>

      <CreateOrderModal
        showModal={showModal}
        setShowModal={setShowModal}
        clients={clients}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        handelSubmit={handelSubmit}
        error={error}
        setError={setError}
        loading={internalLoading}
        setPaymentType={setPaymentType}
        paymentType={paymentType}
      />
    </Container>
  );
};

const stl = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.darkBlue,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.large,
    borderRadius: SIZES.large,
  },
});

export default Orders;
