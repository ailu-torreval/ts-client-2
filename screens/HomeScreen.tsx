import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Card, FAB, Header, Icon, useTheme } from "@rneui/themed";
import { Platform, SafeAreaView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Toast } from "native-base";
import { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";
import { format } from "date-fns";

type Props = NativeStackScreenProps<RootStackParamList, "homescreen">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user);
  const { theme } = useTheme();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraVisible, setCameraVisible] = useState<boolean>(false);
  

  useEffect(() => {
    const parent = navigation.getParent();
  
    if (parent) {
      parent.setOptions({
        tabBarStyle: { display: 'flex',height: 70      },
      });
    }
  
    return () => {
      if (parent) { 
        parent.setOptions({
          tabBarStyle: { display: 'flex',height: 70      },
        });
      }
    };
  }, [navigation]);


  useEffect(() => {
    console.log("line 42",user.activeOrders)
  }, [user]);

  function handleFabPress() {
    if (Platform.OS === 'web') {
      const merchantId = '1';
      const tableId = '1';
      navigation.navigate("landing",{ merchantId, tableId });
      // Toast.show({
      //   description: 'Camera access is not available on web.',
      // });
    } else {
      // Open the camera
      setCameraVisible(true);
      console.log('Open camera');

    }  }

  return (
    <SafeAreaView style={styles.container}>
<CustomHeader screen="Home" />

  <View style={styles.wrapper}>
        <Text style={styles.title}>Hi {user.user?.firstname}!</Text>

        <Card containerStyle={styles.card}>
          <Icon name="qr-code-scanner" size={60} color={theme.colors.secondary} />
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

{
  user.activeOrders.length > 0 ? (
    <>
    {user.activeOrders.map((order, index) => (
        <Card containerStyle={styles.card} key={index}>
          <Card.Title
          style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}  
          >
            <Text style={{
              color: theme.colors.secondary,
              fontSize: 20,
              textAlign: "left",
            }}>Table #{order.table_id}</Text>
            <Text style={{
              fontSize: 18,
              textAlign: "right",
            }}>Table #{order.table_id}</Text>
          
          </Card.Title>
          <Card.Divider />
          {order.products?.map((item, index) => (
            <Text key={index}>
              1 x {item.name}
            </Text>
          ))}
          <Text style={{fontWeight: 400}} >Total {order.total_amount} kr.</Text>
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
              paddingTop:20,
              textAlign: "center",
            }}
          >
          No Active Orders
          </Text>
        </Card>
    </>
  )
}
      </View>
        <FAB
          onPress={() => handleFabPress()}
          title="Scan"
          placement="right"
          icon={{ name: "qr-code-scanner", color:"#fff" }}
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
  card: {
    backgroundColor: "white",
  },
  subtitle: {
    color: "#303030",
    fontSize: 18,
    paddingVertical: 15,
  },
  title: { color: "#45A47D", fontWeight: "bold", fontSize: 30, paddingTop: 30, textTransform: 'capitalize' }, 
  header: {
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
