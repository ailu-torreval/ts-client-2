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

type Props = NativeStackScreenProps<RootStackParamList, "basket">;

const BasketScreen: React.FC<Props> = ({ navigation, route }) => {
    const { setIsLogged } = React.useContext(AuthContext);
    const user = useSelector((state: RootState) => state.user.user);
    const [expanded, setExpanded] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();

    useEffect(() => {
        const parent = navigation.getParent();
        if (parent) {
          parent.setOptions({
            tabBarStyle: { display: 'none'},
          });
        }
        return () => {
          if (parent) { 
            parent.setOptions({
              tabBarStyle: { display: 'none'},
            });
          }
        };
      }, [navigation]);

    return (
        <View>
            <Text>Basket Screen</Text>
        </View>
    );
};
export default BasketScreen;