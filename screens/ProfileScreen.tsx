import { Icon, ListItem, useTheme } from "@rneui/themed";
import {
  View,
  Text,
  TouchableHighlight,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AuthContext } from "../store/AuthContext";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { logout } from "../store/userSlice";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { format } from "date-fns";
import { Button } from "@rneui/base";

const ProfileScreen: React.FC = () => {
  const { isLogged, setIsLogged, setIsGuest } = React.useContext(AuthContext);
  const user = useSelector((state: RootState) => state.user.user);
  const [expanded, setExpanded] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();

  async function handleLogout() {
    console.log("logout");
    await dispatch(logout());
    setIsLogged(false);
    setIsGuest(false);
}

async function handleLogin() {
    setIsGuest(false);
    await dispatch(logout());
    }

  return (
    <>
      {isLogged && user ? (
        <>
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
            </View>

            <View>
              {user && user.orders.length > 0 && (
                <ListItem.Accordion
                  icon={
                    <Icon name={"chevron-down"} type="material-community" />
                  }
                  content={
                    <>
                      <FontAwesome5 name="file-alt" size={25} color="#45A47D" />
                      <ListItem.Content style={styles.accordionClosed}>
                        <ListItem.Title>Orders</ListItem.Title>
                        <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
                      </ListItem.Content>
                      {/* <ListItem.Chevron /> */}
                    </>
                  }
                  isExpanded={expanded}
                  onPress={() => {
                    setExpanded(!expanded);
                  }}
                  //   Component={TouchableHighlight}
                >
                  {/* {user && user.invoices.map((invoice, i) => ( */}
                  <ScrollView style={styles.scrollView}>
                    {user &&
                      user.orders.slice().reverse().map((order, i) => (
                        <ListItem key={i}>
                          <ListItem.Content>
                            <ListItem.Title>
                              {order.date
                                ? format(new Date(order.date), "dd/MM HH:mm")
                                : "N/A"}
                            </ListItem.Title>
                            <ListItem.Subtitle
                              style={{
                                color: theme.colors.primary,
                                fontWeight: "bold",
                              }}
                            >
                              # {order.id}
                            </ListItem.Subtitle>
                          </ListItem.Content>
                          <ListItem.Content right>
                            <ListItem.Title
                              right
                              style={{ color: theme.colors.primary }}
                            >
                              {order?.total_amount} kr.
                            </ListItem.Title>
                          </ListItem.Content>
                        </ListItem>
                      ))}
                  </ScrollView>
                </ListItem.Accordion>
              )}

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
        </>
      ) : (
        <View style={styles.container}>
          <Text>You are not logged in.</Text>
          <Button onPress={handleLogin}>Login</Button>
        </View>
      )}
    </>
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

export default ProfileScreen;
