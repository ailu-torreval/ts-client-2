import React from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../components/CustomHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchMerchant } from "../store/merchantSlice";
import { clearOrder, updateOrder } from "../store/orderSlice";
import { AuthContext } from "../store/AuthContext";
import { Button, useTheme } from "@rneui/themed";

type Props = NativeStackScreenProps<RootStackParamList, "landing">;

const LandingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { merchantId, tableId } = route.params;
  const merchant = useSelector((state: RootState) => state.merchant.merchant);
  const { isLogged, setIsLogged, isGuest, setIsGuest } = React.useContext(AuthContext);
  const order = useSelector((state: RootState) => state.order.order);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();


  useEffect(() => {
    const parent = navigation.getParent();
  
    if (parent) {
      parent.setOptions({
        tabBarStyle: { display: 'none'},
      });
    }
  
    return () => {
      if (parent) { 
        parent.setOptions({
          tabBarStyle: { display: 'none'},
        });
      }
    };
  }, [navigation]);

  useEffect(() => {
    if (merchantId && tableId) {
      dispatch(fetchMerchant(Number(merchantId)));
      dispatch(
        updateOrder({
          table_id: Number(tableId),
          merchant_id: Number(merchantId),
        })
      );
      navigation.setParams({ merchantId: undefined, tableId: undefined });
    }
  }, []);
  useEffect(() => {
    if(user && user.token){
      setIsLogged(true);
      setIsGuest(false);
    }
  }, [user]);

  function handleContinueBtn() {
  navigation.navigate("merchant");
  }

  function handleLoginBtn() {
    setIsGuest(false);
  }

  function handleBack() {
    navigation.navigate("homescreen");
    dispatch(clearOrder());
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Table Service App" />
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.title}>Place your order for</Text>
        </View>
        <View>
          <Text style={styles.number}>{tableId || order?.table_id}</Text>
          <Text style={styles.text}>Table</Text>
        <Text style={styles.name}>{merchant?.name}</Text>
        </View>

        <View>
          {isGuest && (
            <View>
            <Text style={styles.subtext}>You are not logged in</Text>
            <Button buttonStyle={{backgroundColor: theme.colors.secondary}}  size="lg"  onPress={handleLoginBtn} title="Login" />
            <Text style={styles.subtext}>or</Text>
          </View>
          )}
          <Button size="lg"
            onPress={handleContinueBtn}
            title={isLogged ? "Continue" : "Continue as Guest"}
          />
        </View>
          <Button size="lg"
            onPress={handleBack}
            type="clear"
            title="Back to Home"
          />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  text: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  subtext: {
    color: "black",
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 30,
    paddingTop: 10,
    textAlign: "center",
    textTransform: "capitalize",
  },
  name: {
    fontSize: 30,
    paddingTop: 10,
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  number: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 70,
    color: "#F39200",
    }
});

export default LandingScreen;
