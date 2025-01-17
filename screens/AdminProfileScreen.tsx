import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Icon, ListItem, useTheme } from "@rneui/themed";
import { logout } from "../store/userSlice";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "adminProfile">;

const AdminProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { isLogged, setIsLogged, setIsAdmin } = React.useContext(AuthContext);
  const user = useSelector((state: RootState) => state.user.user);
  const merchant = useSelector((state: RootState) => state.merchant.merchant);
  const [expanded, setExpanded] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();

  async function handleLogout() {
    console.log("logout");
    await dispatch(logout());
    setIsLogged(false);
    setIsAdmin(false);
  }

  function navigateToTables() {
    navigation.navigate("tables");
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
        <Text style={styles.title}>Admin - {merchant?.name}</Text>
      </View>
      <ScrollView style={styles.scrollViewContent}>
        <ListItem bottomDivider>
          <Icon color={theme.colors.primary} name="schedule" />
          <ListItem.Content>
            <ListItem.Title>Order History</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <TouchableOpacity onPress={navigateToTables}>
        <ListItem bottomDivider>
          <Icon color={theme.colors.primary} name="table-bar" />
          <ListItem.Content>
            <ListItem.Title>Manage Tables</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
          </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <ListItem
          style={{
            flex: 1,
            width: "100%",
          }}
          onPress={handleLogout}
        >
          <Icon
            name="logout"
            type="material-community"
            size={25}
            color={theme.colors.primary}
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontSize: 20 }}>Logout</ListItem.Title>
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
    backgroundColor: "#fff",
    zIndex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  profileIcon: {
    marginRight: 10,
  },
  accordionClosed: {
    marginLeft: 20,
    width: "100%",
  },
  scrollViewContent: {
    paddingTop: 120,
    paddingBottom: 60,
  },
});

export default AdminProfileScreen;
