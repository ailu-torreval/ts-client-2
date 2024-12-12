import { Icon, ListItem, useTheme } from "@rneui/themed";
import { View, Text, TouchableHighlight, Platform } from "react-native";
import { AuthContext } from "../store/AuthContext";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logout } from "../store/userSlice";
import * as SecureStore from "expo-secure-store";


const ProfileScreen: React.FC = () => {
    const { setIsLogged } = React.useContext(AuthContext);
    const user = useSelector((state: RootState) => state.user.user);
    const [expanded, setExpanded] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();


    async function handleLogout() {
        console.log("logout");
        if (Platform.OS === "web") {
            await localStorage.removeItem("token");
          } else {
             await SecureStore.deleteItemAsync("token");
          }
        await dispatch(logout())
        setIsLogged(false);
      }

    return (
        <View>
            <Text>Profile Screen</Text>
            <ListItem onPress={handleLogout}>
                <Icon
                    name="logout"
                    type="material-community"
                    size={25}
                    color={theme.colors.primary}
                />
                <ListItem.Content>
                    <ListItem.Title>Logout</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </View>
    );
};
export default ProfileScreen;