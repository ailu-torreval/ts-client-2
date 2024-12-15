import { Button, ListItem, useTheme } from "@rneui/themed";
import { View, Text, TouchableHighlight, Platform } from "react-native";
import { AuthContext } from "../store/AuthContext";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormControl, Input, ScrollView, VStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type CardDetails = {
  cardNr: string;
  expiration: string;
  cardName: string;
  cvv: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "checkout">;

const CheckoutScreen: React.FC<Props> = ({ navigation, route }) => {
  const { isLogged } = React.useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const order = useSelector((state: RootState) => state.order.order);
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
      console.log("order in basket", order);
      let total = 0;
      total = order.order_products.reduce(
        (acc, product) => acc + product.total_amount,
        0
      );
      setTotal(total);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>
            Service at {merchant?.merchant?.name} 
          </Text>
          {!merchant?.merchant?.is_table_service ? (
            <>
            <Text>Self Service</Text>
            <Text>We will send you a notification when the order is ready to pick up at the counter.</Text>
            </>
          ) : (
            <>
            <Text>Table Service</Text>
            <Text>Our staff will bring the order to your table (Table Nr. {order?.table_id}).</Text>
            </>
          )}
        </View>
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
        size="lg"
        disabled={!isFormValid}
        style={styles.btn}
        onPress={() => navigation.navigate("basket")}
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
  cardContent: {
    backgroundColor: "#FFF",
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
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
    width: 350,
  },
  prodTotal: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#F39200",
    textAlign: "right",
  },
  prodGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5,
  },
  productDetails: {
    flex: 1,
    flexShrink: 1,
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  productImage: {
    width: "30%",
    height: 130,
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
});
