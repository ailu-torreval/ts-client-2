import { Avatar, Button, Icon, ListItem, useTheme } from "@rneui/themed";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableHighlight,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Product } from "../entities/Product";
import { OrderProduct } from "../entities/Order";
import { addOrderProduct, removeOrderProduct, updateOrder } from "../store/orderSlice";
import { Card } from "native-base";
import { CardTitle } from "@rneui/base/dist/Card/Card.Title";

type Props = NativeStackScreenProps<RootStackParamList, "basket">;

const BasketScreen: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const order = useSelector((state: RootState) => state.order.order);
  const merchant = useSelector((state: RootState) => state.merchant);
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

  function handleSuggestedProdPress(product: Product) {
    console.log(product);
    const orderProduct: OrderProduct = {
      product_id: product.id,
      name: product.name,
      price: product.price,
      total_amount: product.price,
      note: "",
    };
    dispatch(addOrderProduct(orderProduct));
  }

  function generateRandomNr() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Your Basket</Text>
        </View>
        {
        order?.order_products && order?.order_products?.length > 0 ? (
        order?.order_products?.map((product) => (
          <BasketProduct key={`bp_${generateRandomNr()}`} product={product} />
        ))) : (
          <Card>
            <CardTitle>Your basket is empty</CardTitle>
          </Card>
          )}

        <View>
          <Text style={[styles.title, { textAlign: "right" }]}>
            Total: {total} kr.
          </Text>
        </View>

        {merchant.suggested_products &&
          merchant.suggested_products.length > 0 && (
            <View>
              <Text>May we suggest?</Text>
              {merchant?.suggested_products?.map((product) => {
                if (product.is_suggestion) {
                  return (
                    <TouchableHighlight
                      key={`p_${product.id}`}
                      onPress={() => handleSuggestedProdPress(product)}
                    >
                      <ListItem bottomDivider>
                        <Icon name="add-circle-outline" />
                        <ListItem.Content style={{ width: "100%" }}>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Text style={{ textTransform: "capitalize" }}>
                              {product.name}
                            </Text>
                            <Text>{product.price} kr.</Text>
                          </View>
                        </ListItem.Content>
                      </ListItem>
                    </TouchableHighlight>
                  );
                }
              })}
            </View>
          )}
      </ScrollView>
      {order?.order_products && order?.order_products?.length > 0 && (
        <Button
        buttonStyle={{
          height: 65,
        }}
        size="lg"
        style={styles.btn}
        onPress={() => navigation.navigate("checkout")}
        >
        <Text style={{ color: "white", fontSize: 22 }}>
          Checkout - {total}kr.
        </Text>
      </Button>
      )}
    </SafeAreaView>
  );
};

export default BasketScreen;

const BasketProduct: React.FC<{ product: OrderProduct }> = ({ product }) => {

  const dispatch = useDispatch<AppDispatch>();

  function handleDelete() {
    console.log("delete", product);
    dispatch(removeOrderProduct(product));
  }

  return (
    <View style={styles.cardContent}>
      <Image
        source={{ uri: "https://ailu-torreval.github.io/imgs/assets/4.png" }}
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={styles.productName}>{product.name}</Text>
          <Text>{product?.price} kr. </Text>
        </View>
        {product.option && (
          <View>
            <Text>
              {product.option.name}{" "}
              {product.option.price > 0 && (
                <Text>- +{product.option.price} kr.</Text>
              )}
            </Text>
          </View>
        )}
        {product.extras && product.extras.length > 0 && (
          <View>
            {product.extras.map((extra) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
                key={`x_${extra.id}`}
              >
                <Text>{extra.name}</Text>
                <Text>+{extra.price} kr.</Text>
              </View>
            ))}
          </View>
        )}
        {product.note && (
          <Text>
            <i>"{product.note}"</i>
          </Text>
        )}
        <View
          style={styles.prodGrid}
        >
          <Button onPress={handleDelete} radius={"sm"} size="sm" type="solid" color="error">
            <Icon name="delete" color="white" />
            <Text style={{color: "white"}}>
            Delete
            </Text>
          </Button>
          <Text style={styles.prodTotal}>{product.total_amount} kr.</Text>
        </View>
      </View>
    </View>
  );
};

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
