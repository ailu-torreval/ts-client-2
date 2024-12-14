import { Button, CheckBox, Icon, ListItem, useTheme } from "@rneui/themed";
import {
  View,
  Text,
  TouchableHighlight,
  Platform,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import { AuthContext } from "../store/AuthContext";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchProduct } from "../store/merchantSlice";
import {
  Container,
  FormControl,
  Input,
  ScrollView,
  WarningOutlineIcon,
} from "native-base";
import { StyleSheet } from "react-native";
import { OrderProduct } from "../entities/Order";
import { updateOrder } from "../store/orderSlice";

type Props = NativeStackScreenProps<RootStackParamList, "product">;

const ProductScreen: React.FC<Props> = ({ navigation, route }) => {
  const { setIsLogged } = React.useContext(AuthContext);
  const product = useSelector(
    (state: RootState) => state.merchant.selectedProduct
  );
  const order = useSelector(
    (state: RootState) => state.order.order
  );
  const [orderProd, setOrderProd] = useState<Partial<OrderProduct> | null>(
    null
  );
  const [counter, setCounter] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const { id, imgId } = route.params;
  const { theme } = useTheme();
  const [groupValue, setGroupValue] = useState("");
  const [kitchenMsg, setKitchenMsg] = useState("");

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id]);

  useEffect(() => {
    if (product) {
      console.log(product.is_offer, product.offer_price);
      setTotal(product.is_offer ?  product.offer_price : product.price);
      setOrderProd((prevOrderProd) => ({
        ...prevOrderProd,
        product_id: product.id,
        price: product.is_offer ? product.offer_price : product.price,
      }));
      navigation.setOptions({
        headerTitle: product.name,
      });

      if (product.options && product.options.length > 0) {
        setGroupValue(product.options[0].id.toString());
      }
    }
  }, [product, navigation]);

  useEffect(() => {
    if (orderProd && orderProd.price) {
      let total = orderProd.price * counter;
      if (orderProd.extras) {
        const extrasTotal = orderProd.extras.reduce(
          (acc, extra) => acc + extra.price,
          0
        );
        total += extrasTotal * counter;
      }
      if (orderProd.option) {
        total += orderProd.option.price * counter;
      }
      setTotal(total);
    }
  }, [orderProd, counter]);

    function handleButtonPress() {
    let unitTotal = total / counter;
    for (let i = 0; i < counter; i++) {
      const orderProduct: OrderProduct = {
        product_id: orderProd!.product_id!,
        price: orderProd!.price!,
        total_amount: unitTotal,
        note: kitchenMsg,
        id: undefined,
        name: orderProd!.name!,
        extras: orderProd!.extras!,
        option: orderProd!.option!,
      };
      console.log(orderProduct);
      if (orderProduct.id === undefined) {
        delete orderProduct.id;
      }
    
      dispatch(
        updateOrder({
          order_products: [...(order?.order_products ?? []), orderProduct],
        })
      );
    }
    navigation.goBack();  
  }

  return (
    <>
      <SafeAreaView style={styles.container}>

        <View style={{ flex: 1}}>
          <ScrollView>

          <Image
            source={{
              uri: `https://ailu-torreval.github.io/imgs/assets/${imgId}.png`,
            }}
            style={styles.productImage}
          />
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.title}>{product?.name}</Text>
            <View style={{paddingVertical:5}}>
              <Text style={styles.desc}>{product?.desc}</Text>
              {product?.is_offer ? (
                <View style={styles.priceContainer}>
                  <Text style={[styles.productPrice, styles.strikethrough]}>
                    {product.price}kr.
                  </Text>
                  <Text style={styles.offerPrice}>
                    {product.offer_price}kr.
                  </Text>
                </View>
              ) : (
                <Text style={styles.productPrice}>{product?.price}kr.</Text>
              )}
            </View>
            {product?.has_options && (
              <>
                <View style={styles.optionContainer} >
                  <Text style={styles.optionTxt}>{product.option_title}</Text>

                  {product?.options?.map((option) => (
                    <CheckBox
                      key={option.id}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={groupValue === option.id.toString()}
                      onPress={() => {
                        setGroupValue(option.id.toString());
                        setOrderProd((prevOrderProd) => ({
                          ...prevOrderProd,
                          option: option,
                        }));
                      }}
                      title={
                        <View style={styles.optionGrid}>
                          <Text style={{ textTransform: "capitalize" }}>
                            {option.name}
                          </Text>
                          {option.price > 0 && <Text>+ {option.price}kr.</Text>}
                        </View>
                      }
                    />
                  ))}
                  {groupValue === "" && (
                    <Text style={styles.errorText}>
                      Please choose an option.
                    </Text>
                  )}
                </View>
              </>
            )}
            {product?.extras?.length && product?.extras?.length > 0 && (
              <>
                <View style={styles.optionContainer}>
                <Text style={styles.optionTxt}>Extras</Text>
                  {product?.extras?.map((extra) => (
                    <CheckBox
                      key={extra.id}
                      checked={
                        !!orderProd?.extras?.find((e) => e.id === extra.id)
                      }
                      onPress={() => {
                        setOrderProd((prevOrderProd) => {
                          const currentExtras = prevOrderProd?.extras || [];
                          const newExtras = currentExtras.find(
                            (e) => e.id === extra.id
                          )
                            ? currentExtras.filter((e) => e.id !== extra.id)
                            : [...currentExtras, extra];
                          return {
                            ...prevOrderProd,
                            extras: newExtras,
                          };
                        });
                      }}
                      title={
                        <View style={styles.optionGrid}>
                          <Text style={{ textTransform: "capitalize" }}>
                            {extra.name}
                          </Text>
                          <Text>+ {extra.price}kr.</Text>
                        </View>
                      }
                    />
                  ))}
                </View>
              </>
            )}
          </View>
          <View style={{paddingBottom: 50}}>
          <Input
            variant="underlined"
            size="xl"
            placeholder="Message for the kitchen"
            value={kitchenMsg}
            onChangeText={(value) => setKitchenMsg(value)}
            autoCapitalize="none"
            InputLeftElement={
              <Icon name="edit-note" />
            }
          />
          </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                padding: 10,
                backgroundColor: "white",
              }}
            >
              <Pressable
                onPress={() => setCounter((prevCounter) => prevCounter - 1)}
              >
                <Icon name="remove-circle-outline" />
              </Pressable>
              <Text style={{ fontSize:20 }}>{counter}</Text>
              <Pressable
                onPress={() => setCounter((prevCounter) => prevCounter + 1)}
              >
                <Icon name="add-circle-outline" />
              </Pressable>
            </View>
          </View>
          <Button
            onPress={handleButtonPress}
            buttonStyle={{
              height: 65,
            }}
            size="lg"
            style={styles.btn}
          >
            <Text style={{ color: "white", fontSize:22 }}>Add to basket: {total} kr. </Text>
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImage: {
    width: "100%",
    height: 200,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F39200",
    textAlign: "right",
  },
  offerPrice: {
    color: "#F39200",
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "gray",
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  optionGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 15,
  },
  optionContainer: {
    // padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  optionTxt: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 22,
    paddingLeft:10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop:5,
    textTransform: "capitalize",
  },
  desc: {
    fontSize: 15,
    color: "gray",
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  btn: {
    padding: 10,
  },
});

export default ProductScreen;
