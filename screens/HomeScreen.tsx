import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Card, FAB, Header, Icon, useTheme } from "@rneui/themed";
import { SafeAreaView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// type Props = NativeStackScreenProps<RootStackParamList, "homescreen">;

// const HomeScreen: React.FC<Props> = ({ navigation }) => {
const HomeScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { theme } = useTheme();

  return (
    <SafeAreaView>
      <View style={styles.container}>
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
        <FAB
          onPress={() => console.log("scan QR code")}
          title="Scan QR"
          placement="right"
          icon={{ name: "qr-code-scanner" }}
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    paddingLeft: 10,
    textTransform: "capitalize",
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
  title: { color: "#45A47D", fontWeight: "bold", fontSize: 30, paddingTop: 30 },
  header: {
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
