import { Card, Icon, ListItem, useTheme } from "@rneui/themed";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../store/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { StyleSheet } from "react-native";
import { MenuCat } from "../entities/MenuCat";


const prod_example = "https://www.mealwize.com/static/images/M/cover.jpg";

// type Props = {
//     navigation: any;
// }
type Props = NativeStackScreenProps<RootStackParamList, "merchant">;

const MerchantScreen: React.FC<Props> = ({ navigation }) => {
  const { setIsLogged } = React.useContext(AuthContext);
  const merchant = useSelector((state: RootState) => state.merchant.merchant);
  const order = useSelector((state: RootState) => state.order.order);
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState<any>(null);
  const categoryRefs = useRef<{ [key: string]: any }>({});
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${merchant?.name} - Table ${order?.table_id}`,
    });
    setSelected(merchant?.menu_cats[0]);
    console.log(merchant);
  }, [navigation]);

  function handleMenuPress(menu: MenuCat) {
    setSelected(menu);
    const categoryRef = categoryRefs.current[menu.id];
    if (categoryRef) {
      categoryRef.measureLayout(
        scrollViewRef.current,
        (x: any, y: any) => {
          scrollViewRef.current?.scrollTo({ y, animated: true });
        },
        (error: any) => console.log(error)
      );
    }
  }

  function getRandomImageUri(randomNumber: number) {
    return `https://ailu-torreval.github.io/imgs/assets/${randomNumber}.png`;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
          source={merchant_banner}
          style={{ width: "100%", height:"auto", alignSelf: "center", justifyContent: 'center' }}
          resizeMode="contain"
          />  */}

      <View style={styles.container2}>
        <FlatList
          horizontal
          data={merchant?.menu_cats}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: menu_cat }) => {
            return (
              <TouchableOpacity onPress={() => handleMenuPress(menu_cat)}>
                <Text
                  style={[
                    styles.tagText,
                    menu_cat == selected ? styles.isSelected : null,
                  ]}
                >
                  {menu_cat.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.container2}
        />
      </View>

      <ScrollView style={{ paddingHorizontal: 10 }} ref={scrollViewRef}>
        {merchant?.menu_cats.map((category) => (
          <View
            key={category.id}
            style={styles.categoryContainer}
            ref={(ref) => {
              if (ref) {
                categoryRefs.current[category.id] = ref;
              }
            }}
          >
            <Text style={styles.categoryTitle}>{category.name}</Text>
            {category.products.map((product) => {
              const randomNumber = Math.floor(Math.random() * 7) + 1;
              return (
                <TouchableOpacity
                  key={product.id}
                  onPress={() =>
                    navigation.navigate("product", { id: product.id, imgId: randomNumber })
                  }
                >
                  <View style={styles.cardContent}>
                    <Image
                      source={{ uri: getRandomImageUri(randomNumber) }}
                      style={styles.productImage}
                    />
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productDesc}>{product?.desc}</Text>
                      {product.is_offer ? (
                        <View style={styles.priceContainer}>
                          <Text
                            style={[styles.productPrice, styles.strikethrough]}
                          >
                            {product.price}kr.
                          </Text>
                          <Text style={styles.offerPrice}>
                            {product.offer_price}kr.
                          </Text>
                        </View>
                      ) : (
                        <Text style={styles.productPrice}>
                          {product.price}kr.
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingVertical: 20,
  },
  tagText: {
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#DFDCDC",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  isSelected: {
    backgroundColor: "#F39200",
    color: "#FFFFFF",
  },
  container2: {
    marginVertical: 10,
  },
  item: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  card: {
    display: "flex",
    flexDirection: "row",
  },
  cardContent: {
    backgroundColor: "#FFF",
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    height: 100,
    flex: 1,
    flexShrink: 1,
    paddingVertical: 10,
    paddingRight: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  productDesc: {
    fontSize: 14,
    color: "gray",
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
});

export default MerchantScreen;
