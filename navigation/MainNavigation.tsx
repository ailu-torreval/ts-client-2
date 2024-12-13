import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { RootStackParamList } from "../App";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import { Icon, useTheme } from "@rneui/themed";
import CheckoutScreen from "../screens/CheckoutScreen";
import MerchantScreen from "../screens/MerchantScreen";
import ProductScreen from "../screens/ProductScreen";
import BasketScreen from "../screens/BasketScreen";
import ProccessingScreen from "../screens/ProccessingScreen";
import LandingScreen from "../screens/LandingScreen";
import { NavigationProp } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

type MainNavigationProps = {
  merchantId?: string;
  tableId?: string;
};

const MainNavigation: React.FC<MainNavigationProps> = ({
  merchantId,
  tableId,
}) => {
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
          return (
            <Icon name={iconName || "home"} size={size + 8} color={color} />
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 70 },
        tabBarItemStyle: { paddingBottom: 10, paddingTop: 10 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <HomeStackNavigator
            {...props}
            merchantId={merchantId}
            tableId={tableId}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigation;

const HomeStack = createNativeStackNavigator<RootStackParamList>();

type HomeStackNavigatorProps = {
  merchantId?: string;
  tableId?: string;
  navigation: NavigationProp<RootStackParamList>;
};

const HomeStackNavigator: React.FC<HomeStackNavigatorProps> = ({
  merchantId,
  tableId,
  navigation
}) => {
  useEffect(() => {
    if (merchantId && tableId) {
      // Navigate to LandingScreen with the provided data
      navigation.navigate("landing", { merchantId, tableId });
    }
  }, [merchantId, tableId]);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="homescreen"
        component={HomeScreen}
        options={{
          headerBackVisible: false,
          headerShown: false,
          // header: props => <CustomHeader screen="home" />,
        }}
      />
      <HomeStack.Screen
        name="landing"
        component={LandingScreen}
        options={{
          headerBackVisible: false,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="merchant"
        component={MerchantScreen}
        options={{
          headerBackVisible: false,
        }}
      />
      <HomeStack.Screen
        name="product"
        component={ProductScreen}
        options={{
          headerTitle: "Product Details",
          headerBackVisible: false,
        }}
      />
      <HomeStack.Screen
        name="basket"
        component={BasketScreen}
        options={{
          headerTitle: "Basket Details",
          headerBackVisible: false,
        }}
      />
      <HomeStack.Screen
        name="checkout"
        component={CheckoutScreen}
        options={{
          headerTitle: "Checkout Details",
          headerBackVisible: false,
        }}
      />
      <HomeStack.Screen
        name="proccessing"
        component={ProccessingScreen}
        options={{
          headerBackVisible: false,
        }}
      />
    </HomeStack.Navigator>
  );
};
