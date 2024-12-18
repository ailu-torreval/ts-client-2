import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "@rneui/themed";
import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AdminProfileScreen from "../screens/AdminProfileScreen";
import AdminHomeScreen from "../screens/AdminHomescreen";


const Tab = createBottomTabNavigator();

const AdminNavigation: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "person";
          }
          // You can return any component that you like here!
          return   <Icon name={iconName || "home"} size={size + 8} color={color} />
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 70        
        },
        tabBarItemStyle: { paddingBottom: 10, paddingTop: 10 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="home" component={AdminHomeScreen} />
      <Tab.Screen name="Profile" component={AdminProfileScreen} />
    </Tab.Navigator>
  );
};

export default AdminNavigation;
