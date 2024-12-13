import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { RootStackParamList } from "../App";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../components/CustomHeader";


type Props = NativeStackScreenProps<RootStackParamList, "landing">;

const LandingScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView>
            <CustomHeader screen="landing" />
            <View>
                <Text>Landing Screen</Text>
            </View>
        </SafeAreaView>
    );
};
export default LandingScreen;