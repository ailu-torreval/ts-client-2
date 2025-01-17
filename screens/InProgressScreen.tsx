import { Icon, ListItem, useTheme } from "@rneui/themed";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { format } from "date-fns";
import { Button, Card } from "@rneui/base";
import CustomHeader from "../components/CustomHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { changeOrderStatus, fetchMerchantByAdmin } from "../store/merchantSlice";
import OrderCard from "../components/OrderCard";

const InProgressScreen: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const merchant = useSelector((state: RootState) => state.merchant.merchant);
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();


    useEffect(() => {
    if (user && user.token) {
        console.log("user admin home");
        dispatch(fetchMerchantByAdmin(user.token));
    }
    }, [user]);

    useEffect(() => {
    console.log("merchant", merchant);
    console.log("merchant orders", merchant?.orders);
    }, [merchant]);

    function handleChangeStatus(status: "finished", order_id: number) {
    dispatch(changeOrderStatus({status, order_id}));
    }

  return (
    <SafeAreaView style={styles.container}>
    <CustomHeader title={merchant?.name ?? "Table Service App - Admin"} />
    <ScrollView>
      <View style={styles.wrapper}>
        {merchant && (
          <View>
            <Text style={styles.subtitle}>Orders In Progress</Text>
            {merchant.orders?.slice().reverse().map((order) => {
              if (order.order_status === "accepted") {
                return (
                    <OrderCard key={order.id} order={order} action1={() => handleChangeStatus("finished", order.id!)} action2={() => {}} />
                );
              }
            })}
          </View>
        )}
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      // paddingTop: 10,
      paddingLeft: 10,
    },
    text: {
      color: "black",
      fontSize: 20,
    },
    card: {
      backgroundColor: "white",
    },
    subtitle: {
      color: "#303030",
      fontSize: 18,
      paddingVertical: 15,
    },
    title: {
      color: "#45A47D",
      fontWeight: "bold",
      fontSize: 30,
      paddingTop: 30,
      textTransform: "capitalize",
    },
    header: {
      backgroundColor: "#fff",
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

export default InProgressScreen;
