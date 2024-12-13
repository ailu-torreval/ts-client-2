import { Card, Icon, ListItem, useTheme } from "@rneui/themed";
import {
  View,
  Text,
  TouchableHighlight,
  Platform,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image
} from "react-native";
import { AuthContext } from "../store/AuthContext";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logout } from "../store/userSlice";
import * as SecureStore from "expo-secure-store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { StyleSheet } from "react-native";

const prod_example = "https://www.mealwize.com/static/images/M/cover.jpg";

// type Props = {
//     navigation: any;
// }
type Props = NativeStackScreenProps<RootStackParamList, "merchant">;

const MerchantScreen: React.FC<Props> = ({ navigation }) => {
  const { setIsLogged } = React.useContext(AuthContext);
  const merchant = useSelector((state: RootState) => state.merchant.merchant);
  const order = useSelector((state: RootState) => state.order.order);
  const [expanded, setExpanded] = useState<boolean>(false);
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${merchant?.name} - Table ${order?.table_id}`,
    });
    console.log(merchant);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
          source={merchant_banner}
          style={{ width: "100%", height:"auto", alignSelf: "center", justifyContent: 'center' }}
          resizeMode="contain"
          />  */}


      <ScrollView style={{ paddingHorizontal: 10 }}>
        {merchant?.menu_cats.map((category) => (
          <View key={category.id} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            {category.products.map((product) => (
              <Pressable key={product.id} onPress={() => navigation.navigate('product', {id: product.id})} >
                <Card containerStyle={styles.card}>
                  <View>
                    {/* <Image
                      source={prod_example}
                      style={{ width: "100%", height: 200 }}
                    /> */}
                  </View>
                  <View>
                    <Text>{product.name}</Text>
                    <Text>{product?.desc}</Text>
                    <Text>{product.price}kr.</Text>
                  </View>
                </Card>
              </Pressable>
            ))}
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
  item: {
    aspectRatio: 1,
    width: '100%',
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
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
  },
});

export default MerchantScreen;
