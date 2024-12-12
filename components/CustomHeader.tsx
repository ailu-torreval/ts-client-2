import { Header, useTheme, Icon, Text } from '@rneui/themed';
import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Image } from "react-native";

const logo = require("../assets/logo.png");


type Props = {
    screen: string
}

const CustomHeader: React.FC<Props> = ({screen}) => {
    const { theme } = useTheme();
    const statusBarHeight = StatusBar.currentHeight;

    return (
        <>
        {/* <Header ComponentStyle={{
          backgroundColor: "#F9F9F9",
          height: 30,
          paddingTop: 0,
          display: "flex",
          flexDirection: "row",
        }}>
        <View

      >
        <Image
          source={logo}
          style={{ width: "20%", alignSelf: "center", paddingRight: 20 }}
          resizeMode="contain"
        />
        <Text
          style={{
            color: theme.colors.primary,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Table Service App
        </Text>
      </View>
        </Header> */}
        <Header  
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#397af8',
            height:30,
            width: '100%',
          }}
         barStyle="default"
         centerComponent={{
           text: "Table Service App",
           style: { color: "#fff" }
         }}
         leftComponent={<Image
            source={logo}
            style={{ width: "20%", alignSelf: "center", paddingRight: 20 }}
            resizeMode="contain"
          />}
          leftContainerStyle={{}}
         />

      
        </>
    );
};

export default CustomHeader;



// import * as React from "react";
// import { Header, Icon } from "@rneui/base";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// export default () => {
//   return (
//     <Header
//       backgroundImageStyle={{}}
     
//       centerContainerStyle={{}}
//       containerStyle={{ width: 350 }}
//       leftComponent={{ icon: "menu", color: "#fff" }}
//       leftContainerStyle={{}}
//       linearGradientProps={{}}
//       placement="left"
//       rightContainerStyle={{}}
//       statusBarProps={{}}
//     />
//   );
// }