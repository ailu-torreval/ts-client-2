import { Header, useTheme, Icon, Text } from '@rneui/themed';
import React from 'react';
import { Image } from "react-native";

const logo = require("../assets/logo-yellow.png");

type Props = {
    title: string
}

const CustomHeader: React.FC<Props> = ({title}) => {
    const { theme } = useTheme();

    return (
        <Header
        leftComponent={
          <Image
          source={logo}
          style={{ width: "150%", height:"150%", alignSelf: "center", justifyContent: 'center' }}
          resizeMode="contain"
          /> }
        centerComponent={
            <Text style={{ color: "#fff", fontWeight: 'bold', marginTop: 5,  fontSize: 18 }}>{title}</Text>
        }
        containerStyle={{
          backgroundColor: theme.colors.primary,
          justifyContent: 'space-around',
          paddingTop: 10,
          paddingBottom:25,
          alignItems: 'center',
        }}
      />
    );
};

export default CustomHeader;