import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "@rneui/themed";
import React from "react";
import AdminProfileScreen from "../screens/AdminProfileScreen";
import AdminHs from "../screens/AdminHs";
import InProgressScreen from "../screens/InProgressScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import TableScreen from "../screens/TableScreen";


const Tab = createBottomTabNavigator();

const AdminNavigation: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Orders") {
            iconName = "home";
          } else if (route.name === "Settings") {
            iconName = "settings";
          } else if (route.name === "In Progress") {
            iconName = "food-bank";
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
      <Tab.Screen name="Orders" component={AdminHs} />
      <Tab.Screen name="In Progress" component={InProgressScreen} />
      <Tab.Screen name="Settings"  component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
};

export default AdminNavigation;

const SettingsStack = createNativeStackNavigator<RootStackParamList>();



const SettingsStackNavigator: React.FC = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="adminProfile"
        component={AdminProfileScreen}
        options={{
          headerBackVisible: false,
          headerShown: false,
          // header: props => <CustomHeader screen="home" />,
        }}
      />
      <SettingsStack.Screen
        name="tables"
        component={TableScreen}
        options={{
          headerTitle: "Manage Tables",

        }}
      />
    </SettingsStack.Navigator>
  );
};
