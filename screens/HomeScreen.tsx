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


type Props = NativeStackScreenProps<RootStackParamList, "homescreen">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user.user);
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
    (async () => {
      // if (Platform.OS !== 'web') {
      //   const { status } = await Camera.requestCameraPermissionsAsync();
      //   setHasPermission(status === 'granted');
      // }
    })();
  }, []);

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
        <Text style={styles.title}>Hi {user?.firstname}!</Text>

        <Card containerStyle={styles.card}>
          <Icon name="qr-code-scanner" size={60} color="#F39200" />
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

        <Card containerStyle={styles.card}>
          <Card.Title
            style={{
              color: theme.colors.secondary,
              fontSize: 20,
              textAlign: "left",
            }}
          >
            1.
          </Card.Title>
          <Card.Divider />
          <Text style={styles.text}>order card example</Text>
        </Card>
        <Card containerStyle={styles.card}>
          <Card.Title
            style={{
              color: theme.colors.secondary,
              fontSize: 20,
              textAlign: "left",
            }}
          >
            2.
          </Card.Title>
          <Card.Divider />
          <Text style={styles.text}>order card example</Text>
        </Card>
        <Card containerStyle={styles.card}>
          <Card.Title
            style={{
              color: theme.colors.secondary,
              fontSize: 20,
              textAlign: "left",
            }}
          >
            3.
          </Card.Title>
          <Card.Divider />
          <Text style={styles.text}> order card example</Text>
        </Card>
        <Card containerStyle={styles.card}>
          <Card.Title
            style={{
              color: theme.colors.secondary,
              fontSize: 20,
              textAlign: "left",
            }}
          >
            4.
          </Card.Title>
          <Card.Divider />
          <Text style={styles.text}> order card example</Text>
        </Card>
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
