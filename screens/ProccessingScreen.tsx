import { Icon, ListItem, useTheme } from "@rneui/themed";
import { View, Text, TouchableHighlight, Platform } from "react-native";
import { AuthContext } from "../store/AuthContext";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logout } from "../store/userSlice";
import * as SecureStore from "expo-secure-store";


const ProccessingScreen: React.FC = () => {
    const { setIsLogged } = React.useContext(AuthContext);
    const user = useSelector((state: RootState) => state.user.user);
    const [expanded, setExpanded] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();

    return (
        <View>
            <Text>Proccessing Screen</Text>
        </View>
    );
};
export default ProccessingScreen;