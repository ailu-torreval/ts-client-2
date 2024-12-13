import {
  Appearance,
  LogBox,
  StyleSheet,
  View,
  Text,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "./store/store";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./store/AuthContext";
import { Role } from "./entities/User";
import { getProfile, setToken } from "./store/userSlice";
import LoginNavigation from "./navigation/LoginNavigation";
// import { NativeBaseProvider } from 'native-base';
import MainNavigation from "./navigation/MainNavigation";
import { createTheme, ThemeProvider, useTheme } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import { NativeBaseProvider } from "native-base";
import queryString from "query-string";

const theme = createTheme({
  lightColors: {
    primary: "#45A47D",
    secondary: "#F39200",
    success: "#0DCC70",
    warning: "#FFA726",
    background: "#F9F9F9",
    white: "#ffffff",
    black: "#000000",
  },
  darkColors: {
    primary: "#45A47D",
    secondary: "#F39200",
    success: "#0DCC70",
    warning: "#FFA726",
    white: "#ffffff",
    black: "#000000",
  },
  mode: "light", // or "dark"
});

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  main: undefined;
  login: undefined;
  signup: undefined;
  landing: undefined;
  home: undefined;
  merchant: undefined;
  product: undefined;
  basket: undefined;
  checkout: undefined;
  proccessing: undefined;
  profile: undefined;
  mainNav: undefined;
  homescreen: undefined;
  tables: undefined;
  products: undefined;
  // adminHome:undefined;
  // adminProfile: undefined;
  // services: undefined;
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NativeBaseProvider> 
        <AppContent />
       </NativeBaseProvider>
      </ThemeProvider>
    </Provider>
  );
}

function AppContent() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user);
  const [merchantId, setMerchantId] = useState<any>(null);
  const [tableId, setTableId] = useState<any>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();

  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
    async function readFromSecureStore() {
      let token: string | null = null;
      if (Platform.OS === "web") {
        // await localStorage.deleteItem("token");
        token = await localStorage.getItem("token");
      } else {
        //  await SecureStore.deleteItemAsync("token");
        token = await SecureStore.getItemAsync("token");
      }
      
      console.log(token)
      if (token) {
        await dispatch(setToken(token));
        await dispatch(getProfile(token));
      }
    }
    console.log(user);
    readFromSecureStore();
  }, []);

  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);
    if (urlParams.merchantId && urlParams.tableId) {
      console.log(urlParams);
      setIsGuest(true);
      setMerchantId(urlParams.merchantId);
      setTableId(urlParams.tableId);
    }
  }, []);

  useEffect(() => {
    if (user) {
      user.role === Role.Merchant_admin && setIsAdmin(true);
      console.log(user);
      setIsLogged(true);
      //setIsAdmin(true);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, isAdmin, setIsAdmin, isGuest, setIsGuest }}
    >
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: theme.colors.primary,
            background: theme.colors.background,
            card: theme.colors.white,
            text: theme.colors.black,
          },
          dark: theme.mode === "dark",
        }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {(isLogged && user !== null) || isGuest ? (
            isAdmin ? (
              <Stack.Group>
                <Stack.Screen name="AdminNav" component={AdminNavigation} />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen name="mainNav" component={MainNavigation} />
              </Stack.Group>
            )
          ) : (
            <Stack.Group>
              <Stack.Screen name="LoginNav" component={LoginNavigation} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
