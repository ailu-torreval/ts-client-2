import { Icon, ListItem, useTheme } from "@rneui/themed";
import { View, Text, TouchableHighlight, Platform } from "react-native";
import { AuthContext } from "../store/AuthContext";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logout } from "../store/userSlice";
import * as SecureStore from "expo-secure-store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "merchant">;

const MerchantScreen: React.FC<Props> = ({ navigation }) => {
    const { setIsLogged } = React.useContext(AuthContext);
    const user = useSelector((state: RootState) => state.user.user);
    const [expanded, setExpanded] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();

    useEffect(() => {
        navigation.setOptions({ headerTitle: 'New Merchant Title' });
      }, [navigation]);

    return (
        <View>
            <Text>Merchant Screen</Text>
        </View>
    );
};
export default MerchantScreen;