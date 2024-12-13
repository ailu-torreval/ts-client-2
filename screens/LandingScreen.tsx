import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { RootStackParamList } from "../App";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../components/CustomHeader";

type Props = NativeStackScreenProps<RootStackParamList, "landing">;

const LandingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { merchantId, tableId } = route.params;

  return (
    <SafeAreaView>
      <CustomHeader screen="landing" />
      <View>
        <Text>Landing Screen</Text>
        <Text>Merchant ID: {merchantId}</Text>
        <Text>Table ID: {tableId}</Text>{" "}
      </View>
    </SafeAreaView>
  );
};
export default LandingScreen;
