import { Button, Icon, useTheme } from "@rneui/themed";
import { View, Text, Image } from "react-native";
import { AuthContext } from "../store/AuthContext";
import React, { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { io } from "socket.io-client";
import { RingLoader, RiseLoader } from "react-spinners";
import { resetOrder, updateOrder } from "../store/orderSlice";

// const socket = io('https://ts-server-production-1986.up.railway.app');
const socket = io("https://ts-server-production-1986.up.railway.app", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

type Props = NativeStackScreenProps<RootStackParamList, "proccessing">;

const ProccessingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { setIsLogged } = React.useContext(AuthContext);
  const order = useSelector((state: RootState) => state.order.order);
  const { theme } = useTheme();
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">(
    "pending"
  );
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    console.log("from line 31", order)
    if (order?.id) {
      socket.emit('joinOrderRoom', order.id);
    }

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('orderChanged', (data) => {
      console.log('Received orderChanged event', data);
      if (data.orderId == order?.id) {
        console.log('Order changed:', data);
        setStatus(data.status);
        dispatch(updateOrder({order_status: data.status}));
        // Handle the order accepted event (e.g., update UI)
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    return () => {
      socket.off('connect');
      socket.off('orderChanged');
      socket.off('disconnect');
    };
  }, [order]);


  useEffect(() => {
    console.log("order in proccessing", order);
  }, []);

  async function handleFinishOrder() {
    await dispatch(resetOrder());
    navigation.navigate("homescreen");
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {status === "pending" && (
          <>
            <View style={styles.centeredContent1}>
              <RiseLoader
                // style={{ marginTop: 50 }}
                color="#8fc8b1"
                loading={status === "pending"}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <Text style={[styles.text, {marginTop: 20}]}>Waiting for kitchen...</Text>
            </View>
          </>
        )}
        {status === "accepted" && (
          <>
            <View style={styles.centeredContent}>
              <Image
                source={{
                  uri: "https://ailu-torreval.github.io/imgs/assets/food-illustration.png",
                }}
                style={styles.productImage}
              />
              <Text style={styles.text}>Order Accepted!</Text>
              <Text style={styles.text2}>
                Just relax! We will bring your order soon!
              </Text>
              <Button
                style={{ marginTop: 50 }}
                onPress={handleFinishOrder}
              >
                <Icon
                  color="white"
                  style={{ paddingRight: 10, color: theme.colors.secondary }}
                  name="home"
                />
                Back to Home
              </Button>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
export default ProccessingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  productImage: {
    marginTop: 50,
    width: "70%",
    height: 250,
  },
  text: {
    marginTop: 50,
    color: "#F39200",
    textAlign: "center",
    fontSize: 29,
    fontWeight: "bold",
  },
  text2: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 20,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredContent1: {
    flex: 1,
    justifyContent: "center",
    gap: 35,
    alignItems: "center",
  },
});
