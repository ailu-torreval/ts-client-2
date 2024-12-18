import { Button, Card, ListItem, useTheme } from "@rneui/themed";
import { View, Text, TouchableHighlight, Platform } from "react-native";
import { AuthContext } from "../store/AuthContext";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FormControl,
  Input,
  ScrollView,
  VStack,
  Icon,
  Toast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {
  createOrder,
  prepareOrder,
  setLoading,
  updateOrder,
} from "../store/orderSlice";
import { Order } from "../entities/Order";
import { unwrapResult } from "@reduxjs/toolkit";

type CardDetails = {
  cardNr: string;
  expiration: string;
  cardName: string;
  cvv: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "checkout">;

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const { isLogged } = React.useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const order = useSelector((state: RootState) => state.order.order);
  const orderState = useSelector((state: RootState) => state.order.loading);
  const user = useSelector((state: RootState) => state.user.user);
  const merchant = useSelector((state: RootState) => state.merchant);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNr: "1234 1234 1234 1234",
    expiration: "10/28",
    cardName: "ailin torre val",
    cvv: "123",
  });

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (order?.order_products) {
      if (order.date === null) {
        console.log("order in basket", order);
        let total = 0;
        total = order.order_products.reduce(
          (acc, product) => acc + product.total_amount,
          0
        );
        setTotal(total);
      } else {
        // navigation.navigate("proccessing");
        handleOrder(order);
      }
    }
  }, [order]);

  useEffect(() => {
    if (
      cardDetails.cardNr !== "" &&
      cardDetails.expiration !== "" &&
      cardDetails.cardName !== "" &&
      cardDetails.cvv !== "" &&
      /^\d+$/.test(cardDetails.cvv)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [cardDetails]);

  function createRandomUuid() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  async function handlePayment() {
    dispatch(setLoading(true));
    const total_amount = total;
    console.log("Payment", cardDetails);
    await dispatch(prepareOrder());

    const orderDetails: Partial<Order> = {
      id: null,
      contact_method: merchant?.merchant?.is_table_service ? 0 : 1,
      date: new Date().toISOString(),
      order_status: "pending",
      payment_method: 0,
      total_amount: total_amount,
      payment_ref: createRandomUuid(),
      user_id: isLogged ? user?.id : null,
    };
    await dispatch(updateOrder(orderDetails));
  }

  async function handleOrder(order: Partial<Order>) {
    try {
      const resultAction = await dispatch(createOrder(order as Order));
      unwrapResult(resultAction);
      navigation.navigate("proccessing");
    } catch (error) {
      Toast.show({
        description: "Something went wrong, please try again.",
      });
      console.log("error posting order", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.headerWrap}>
          <Text style={styles.headerText}>
            Service at {merchant?.merchant?.name}
          </Text>
          {!merchant?.merchant?.is_table_service ? (
            <>
              <Text style={styles.subHeaderText}>Self Service</Text>
              <Text style={styles.bodyText}>
                We will send you a notification when the order is ready to pick
                up at the counter.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.subHeaderText}>Table Service</Text>
              <Text style={styles.bodyText}>
                Our staff will bring the order to your table when it's ready.
              </Text>
              <Text style={[styles.bodyText, { fontWeight: "bold" }]}>
                Table Nr. {order?.table_id}
              </Text>
            </>
          )}
        </View>
        <Card>
          <Card.Title>Order Summary</Card.Title>
          <View>
            {order?.order_products?.map((product) => (
              <View key={product.id}>
                <View style={[styles.grid, styles.margin]}>
                  <Text style={{ fontWeight: 600 }}>1 x {product.name}</Text>
                  <Text>{product.price} kr.</Text>
                </View>
                {product.option && (
                  <View
                    style={[styles.grid, { marginLeft: 20 }]}
                    key={product.option.id}
                  >
                    <Text>{product.option.name}</Text>
                    {product.option.price > 0 && (
                      <Text>+ {product.option.price} kr.</Text>
                    )}
                  </View>
                )}
                {product.extras && product.extras?.length > 0 && (
                  <Text style={{ fontWeight: 500, marginTop: 10 }}>
                    Extras:
                  </Text>
                )}
                {product.extras?.map((extra) => (
                  <View
                    style={[styles.grid, { marginLeft: 20 }]}
                    key={extra.id}
                  >
                    <Text>{extra.name}</Text>
                    <Text>+ {extra.price} kr.</Text>
                  </View>
                ))}
                {product.note && (
                  <Text style={{ marginTop: 7 }}>
                    <i>"{product.note}"</i>
                  </Text>
                )}
              </View>
            ))}
            <View style={[styles.grid, styles.margin]}>
              <Text style={{ fontWeight: 800 }}>Total</Text>
              <Text style={{ fontWeight: 600 }}>{total} kr.</Text>
            </View>
          </View>
        </Card>

        {!merchant.merchant?.is_table_service && (
          <View>
            <Text style={styles.headerText}>
              check if the user has notification token for push notif
            </Text>
          </View>
        )}
        <View>
          <Text style={styles.title}>Payment Details</Text>
          <View style={styles.content}>
            <FormControl>
              <FormControl.Label>Card Name</FormControl.Label>
              <Input
                variant="underlined"
                size="xl"
                placeholder="card name"
                value={cardDetails.cardName}
                onChangeText={(value) =>
                  setCardDetails({ ...cardDetails, cardName: value })
                }
                autoCapitalize="none"
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    pr="10"
                    color="muted.400"
                  />
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Card Number</FormControl.Label>
              <Input
                variant="underlined"
                size="xl"
                placeholder="card nr"
                value={cardDetails.cardNr}
                onChangeText={(value) =>
                  setCardDetails({ ...cardDetails, cardNr: value })
                }
                autoCapitalize="none"
                keyboardType="numeric"
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="credit-card" />}
                    size={5}
                    ml="2"
                    pr="10"
                    color="muted.400"
                  />
                }
              />
            </FormControl>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <FormControl style={{ flex: 1 }}>
                <FormControl.Label>Expiration</FormControl.Label>
                <Input
                  variant="underlined"
                  size="xl"
                  placeholder="MM/YY"
                  value={cardDetails.expiration}
                  onChangeText={(value) =>
                    setCardDetails({ ...cardDetails, expiration: value })
                  }
                  autoCapitalize="none"
                  keyboardType="numeric"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="event" />}
                      size={5}
                      ml="2"
                      pr="10"
                      color="muted.400"
                    />
                  }
                />
              </FormControl>
              <FormControl style={{ flex: 1 }}>
                <FormControl.Label>CVV</FormControl.Label>
                <Input
                  variant="underlined"
                  size="xl"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChangeText={(value) =>
                    setCardDetails({ ...cardDetails, cvv: value })
                  }
                  autoCapitalize="none"
                  keyboardType="numeric"
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="lock" />}
                      size={5}
                      ml="2"
                      pr="10"
                      color="muted.400"
                    />
                  }
                />
              </FormControl>
            </View>
          </View>
        </View>
      </ScrollView>
      <Button
        buttonStyle={{
          height: 65,
        }}
        loading={orderState}
        loadingProps={{
          size: "small",
          color: "white",
        }}
        size="lg"
        disabled={!isFormValid}
        style={styles.btn}
        onPress={handlePayment}
      >
        <Text style={{ color: "white", fontSize: 22 }}>Pay - {total}kr.</Text>
      </Button>
    </SafeAreaView>
  );
};
export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerWrap: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productName: {
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  content: {
    // flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 10,
    textTransform: "capitalize",
    color: "#F39200",
  },
  btn: {
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
    color: "#F39200",
  },
  bodyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 10,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textTransform: "capitalize",
  },
  margin: {
    marginTop: 17,
  },
});
