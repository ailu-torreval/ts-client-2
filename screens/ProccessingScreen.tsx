import { Icon, ListItem, useTheme } from "@rneui/themed";
import { View, Text, TouchableHighlight, Platform } from "react-native";
import { AuthContext } from "../store/AuthContext";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logout } from "../store/userSlice";
import * as SecureStore from "expo-secure-store";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";


type Props = NativeStackScreenProps<RootStackParamList, "proccessing">;

const ProccessingScreen: React.FC<Props> = ({ navigation, route }) => {
    const { setIsLogged } = React.useContext(AuthContext);
    const user = useSelector((state: RootState) => state.user.user);
    const order = useSelector((state: RootState) => state.order.order);
    const [expanded, setExpanded] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();

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
            <Text>Proccessing Screen</Text>
        </View>
      </SafeAreaView>
    );
};
export default ProccessingScreen;