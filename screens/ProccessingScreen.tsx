import { Icon, ListItem, useTheme } from "@rneui/themed";
import { View, Text, TouchableHighlight, Platform, Image } from "react-native";
import { AuthContext } from "../store/AuthContext";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logout } from "../store/userSlice";
import * as SecureStore from "expo-secure-store";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spinner } from "native-base";
import { StyleSheet } from "react-native";
import { io } from "socket.io-client";

// const socket = io('https://ts-server-production-1986.up.railway.app');
const socket = io('http://localhost:3000', {
  withCredentials: true,
  transports: ['websocket', 'polling'], // Use both websocket and polling transports
});

type Props = NativeStackScreenProps<RootStackParamList, "proccessing">;

const ProccessingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { setIsLogged } = React.useContext(AuthContext);
  const order = useSelector((state: RootState) => state.order.order);
  const { theme } = useTheme();
  const [status, setStatus] = useState<"pending" | "accepted" | "rejected">(
    "pending"
  );


  useEffect(() => {
    console.log("from line 31", order)
    if (order?.id) {
      socket.emit('joinOrderRoom', order.id);
    }

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('orderAccepted', (data) => {
      console.log('Received orderAccepted event', data);
      if (data.orderId == order?.id) {
        console.log('Order accepted:', data);
        setStatus('accepted');
        // Handle the order accepted event (e.g., update UI)
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    return () => {
      socket.off('connect');
      socket.off('orderAccepted');
      socket.off('disconnect');
    };
  }, [order]);

  // // Handle connection event
  // socket.on("connect", () => {
  //   console.log("Connected to the server");

  //   // Join a room for a specific order
  //   const orderId = "123"; // Replace with the actual order ID
  //   // socket.emit("joinOrderRoom", order?.id);
  //   socket.emit("joinOrderRoom", orderId);

  //   // Handle order accepted event
  //   socket.on("orderAccepted", (data) => {
  //     console.log("Order accepted:", data);
  //     // Handle the order accepted event (e.g., update UI)
  //   });
  // });

  // // Handle disconnection event
  // socket.on("disconnect", () => {
  //   console.log("Disconnected from the server");
  // });

  // useEffect(() => {
  //     const parent = navigation.getParent();

  //     if (parent) {
  //       parent.setOptions({
  //         tabBarStyle: { display: 'none'},
  //       });
  //     }

  //     return () => {
  //       if (parent) {
  //         parent.setOptions({
  //           tabBarStyle: { display: 'none'},
  //         });
  //       }
  //     };
  //   }, [navigation]);

  useEffect(() => {
    console.log("order in proccessing", order);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        {status === "pending" && (
          <>
            <Spinner size="lg" color="#45A47D" />
            <Text>Waiting for kitchen...</Text>
          </>
        )}
        {status === "accepted" && (
          <>
            <Image
              source={{
                uri: "https://ailu-torreval.github.io/imgs/assets/food-illustration.png",
              }}
              style={styles.productImage}
            />
            <Text>Your order is being prepared...</Text>
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
    width: "100%",
    height: 200,
  },
});
