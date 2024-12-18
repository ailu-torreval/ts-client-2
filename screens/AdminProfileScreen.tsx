import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Icon, ListItem, useTheme } from "@rneui/themed";
import { logout } from "../store/userSlice";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const AdminProfileScreen: React.FC = () => {
    const { isLogged, setIsLogged, setIsGuest } = React.useContext(AuthContext);
    const user = useSelector((state: RootState) => state.user.user);
    const merchant = useSelector((state: RootState) => state.merchant.merchant);
    const [expanded, setExpanded] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();
  
    async function handleLogout() {
      console.log("logout");
      await dispatch(logout());
      setIsLogged(false);
  }
    return (
        <View style={styles.container}>
        <View style={styles.profileHeader}>
          <FontAwesome5
            name="user-circle"
            size={50}
            color="#D9D9D9"
            style={styles.profileIcon}
          />
          <Text style={styles.title}>
            {user?.firstname} {user?.lastname}{" "}
          </Text>
          <Text style={styles.title}>
            Admin - {merchant?.name}
            </Text>
        </View>
        <View style={styles.footer}>
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
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      // alignItems: "center",
      padding: 15,
    },
    title: {
      fontWeight: "600",
      fontSize: 22,
      paddingVertical: 20,
      textTransform: "capitalize",
    },
    profileHeader: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      backgroundColor: "#fff", // Ensure the header has a background color
      zIndex: 1, // Ensure the header is above other content
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      zIndex: 1, // Ensure the header is above other content
    },
    profileIcon: {
      marginRight: 10,
    },
    accordionClosed: {
      marginLeft: 20,
      width: "100%",
    },
    scrollView: {
      maxHeight: 500,
    },
  });
  

export default AdminProfileScreen;