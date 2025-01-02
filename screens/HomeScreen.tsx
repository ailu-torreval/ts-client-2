import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Card, FAB, Icon, useTheme } from "@rneui/themed";
import { Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Toast } from "native-base";
import React, { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";
import { Camera, CameraView } from "expo-camera";
import QrScanner from "react-qr-scanner";
import { RNCamera } from 'react-native-camera';

type Props = NativeStackScreenProps<RootStackParamList, "homescreen">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user);
  const { theme } = useTheme();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraVisible, setCameraVisible] = useState<boolean>(false);
  const [scanned, setScanned] = useState(false);
  const order = useSelector((state: RootState) => state.order.order);

  useEffect(() => {
    const getCameraPermissions = async () => {
      if (Platform.OS === 'web') {
        try {
          await navigator.mediaDevices.getUserMedia({ video: true });
          setHasPermission(true);
        } catch (error) {
          setHasPermission(false);
        }
      } else {
        // Handle native permissions
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      }
    };

    getCameraPermissions();
  }, []);

  useEffect(() => {
    console.log("home navigation", order);
    if (order?.merchant_id && order?.table_id) {
      const state = navigation.getState();
      const currentRoute = state.routes[state.index];
      if (currentRoute?.name === "homescreen") {
        console.log("Navigating to landing screen");
        // Navigate to LandingScreen with the provided data
        const merchantId = order?.merchant_id.toString();
        const tableId = order?.table_id.toString();
        navigation.navigate("landing", { merchantId, tableId });
      }
    }
  }, [order]);

  useEffect(() => {
    const parent = navigation.getParent();

    if (parent) {
      parent.setOptions({
        tabBarStyle: { display: "flex", height: 70 },
      });
    }

    return () => {
      if (parent) {
        parent.setOptions({
          tabBarStyle: { display: "flex", height: 70 },
        });
      }
    };
  }, [navigation]);

  useEffect(() => {
    console.log("line 42", user.activeOrders);
  }, [user]);

  async function handleFabPress() {
    setScanned(false);
    setCameraVisible(true);
  }

  function handleBarCodeScanned(scanningResults: { type: any; data: any }) {
    setScanned(true);
    setCameraVisible(false);
    const url = new URL(scanningResults.data);
    const merchantId = url.searchParams.get("merchantId");
    const tableId = url.searchParams.get("tableId");
    
    if (merchantId && tableId) {
      navigation.navigate("landing", { merchantId, tableId });
    } else {
      alert("Invalid QR code data");
    }
  }

  function handleQrReaderScanned(data: any) {
    if (data) {
      console.log(data);
      setScanned(true);
      setCameraVisible(false);  
      try {
        const url = new URL(data.text);
        const merchantId = url.searchParams.get("merchantId");
        const tableId = url.searchParams.get("tableId");
  
        if (merchantId && tableId) {
          navigation.navigate("landing", { merchantId, tableId });
        } else {
          alert("Invalid QR code data");
        }
      } catch (error) {
        alert("Error reading QR code data");
      }
    }
  }

  async function handleFakePress() {
      const merchantId = '1';
      const tableId = '1';
      navigation.navigate("landing",{ merchantId, tableId });
    }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Table Service App" />

      <View style={styles.wrapper}>
        <Text style={styles.title}>Hi {user.user?.firstname}!</Text>

        <Card containerStyle={styles.card}>
          <Pressable onPress={() => handleFakePress()}>
          <Icon
            name="qr-code-scanner"
            size={60}
            color={theme.colors.secondary}
          />
          </Pressable>
          <Text
            style={{
              color: theme.colors.black,
              fontSize: 20,
              textAlign: "center",
              paddingTop: 20,
            }}
          >
            Scan table's QR Code to continue
          </Text>
        </Card>

        <Text style={styles.subtitle}>Active Orders</Text>

        {user.activeOrders.length > 0 ? (
          <>
            {user.activeOrders.map((order, index) => (
              <Card containerStyle={styles.card} key={index}>
                <Card.Title
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.secondary,
                      fontSize: 20,
                      textAlign: "left",
                    }}
                  >
                    Table #{order.table_id}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: "right",
                    }}
                  >
                    Table #{order.table_id}
                  </Text>
                </Card.Title>
                <Card.Divider />
                {order.products?.map((item, index) => (
                  <Text key={index}>1 x {item.name}</Text>
                ))}
                <Text style={{ fontWeight: 400 }}>
                  Total {order.total_amount} kr.
                </Text>
              </Card>
            ))}
          </>
        ) : (
          <>
            <Card containerStyle={styles.card}>
              <Icon name="no-food" size={30} color={theme.colors.primary} />
              <Text
                style={{
                  color: theme.colors.secondary,
                  fontSize: 20,
                  paddingTop: 20,
                  textAlign: "center",
                }}
              >
                No Active Orders
              </Text>
            </Card>
          </>
        )}
      </View>
      <View style={styles.scannerContainer}>
                {cameraVisible && (
          Platform.OS === 'web' ? (
            <QrScanner
              delay={300}
              onError={(err) => console.error(err)}
              onScan={handleQrReaderScanned}
              style={{height: 300, width: 300}}
              facingMode="environment"
            />
          ) : (
            <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={StyleSheet.absoluteFillObject}
          />
          )
        )}
      </View>
      <FAB
        onPress={() => handleFabPress()}
        title="Scan"
        placement="right"
        icon={{ name: "qr-code-scanner", color: "#fff" }}
        size="large"
      />
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
  previewStyle:{
    height: 240,
    width: 320,
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
  scannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
