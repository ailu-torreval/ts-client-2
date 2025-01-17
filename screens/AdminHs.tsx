import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Button, Card, useTheme } from "@rneui/themed";
import CustomHeader from "../components/CustomHeader";
import { useEffect } from "react";
import { changeOrderStatus, fetchMerchantByAdmin, fetchOrder } from "../store/merchantSlice";
import React from "react";
import { Order } from "../entities/Order";
import { format } from "date-fns";
import { ScrollView } from "native-base";
import { io } from "socket.io-client";
import OrderCard from "../components/OrderCard";

// const socket = io("http://localhost:3000", {
const socket = io("https://ts-server-production-1986.up.railway.app", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});


const AdminHs: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const merchant = useSelector((state: RootState) => state.merchant.merchant);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const [pendingOrders, setPendingOrders] = React.useState<Order[]>([]);

  useEffect(() => {
    if (merchant?.id) {
      socket.emit('joinMerchantRoom', merchant.id);
    }
    socket.on('connect', () => {
      console.log('Connected to the merchant server');
    });
    socket.on('orderCreated', (data) => {
      console.log('Received orderCreated event', data);
      dispatch(fetchOrder(data.orderId));
    });
  }, [merchant]);

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

  function handleChangeStatus(status: "accepted" | "declined", order_id: number) {
    dispatch(changeOrderStatus({status, order_id}));
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={merchant?.name ?? "Table Service App - Admin"} />
      <ScrollView>
        <View style={styles.wrapper}>
          {merchant && (
            <View>
              <Text style={styles.subtitle}>Pending Orders</Text>
              {merchant.orders?.slice().reverse().map((order) => {
                if (order.order_status === "pending") {
                  return (
                    <OrderCard key={order.id} order={order} action1={() => handleChangeStatus("accepted", order.id!)} action2={() => handleChangeStatus("declined", order.id!)} />
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

export default AdminHs;
