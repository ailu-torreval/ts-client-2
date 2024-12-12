import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../App";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import { Icon } from "@rneui/themed";


const Tab = createBottomTabNavigator();

const MainNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "account";
          }
          return <Icon  name={iconName || "home"} size={size +8} color={color} />;
        },
        tabBarActiveTintColor: "#0DCC70",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 100 },
        tabBarItemStyle: { paddingBottom: 10 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigation;

// const HomeStack = createNativeStackNavigator<RootStackParamList>();

// const HomeStackNavigator = () => {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="homescreen" component={HomeScreen}   options={{
//     header: props => <CustomHeader screen="home" />,
//   }} />
//       <HomeStack.Screen name="chooseVenue" component={ChooseVenueScreen} options={{headerTitle: "1. Choose Venue", headerBackTitleVisible: false }} />
//       <HomeStack.Screen name="chooseWashType" component={WashTypeScreen} options={{headerTitle: "2. Choose Wash Type", headerBackTitleVisible: false }} />
//       <HomeStack.Screen name="chooseExtras" component={ExtrasScreen} options={{headerTitle: "3. Choose Extras", headerBackTitleVisible: false }} />
//       <HomeStack.Screen name="checkout" component={CheckoutScreen} options={{headerTitle: "4. Checkout", headerBackTitleVisible: false }} />
//     </HomeStack.Navigator>
//   );
// };
