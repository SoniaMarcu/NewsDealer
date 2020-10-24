import {Header} from "react-native-elements";
import {DrawerActions} from "react-navigation-drawer";
import {View} from "react-native";
import React from "react";

const CustomHeader = (navigation)=>{

    return(
        <Header

            containerStyle={{
                backgroundColor: "#26A65B",
                justifyContent: "space-around"
            }}
            placement="left"
            leftComponent={{
                icon: 'menu',
                color: '#fff',
                onPress: () =>  navigation.navigation.dispatch(DrawerActions.openDrawer())
            }}

            // centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
            rightComponent={{icon: 'home', color: '#fff',
            onPress:()=>{navigation.navigation.navigate('Home')}}}
        />

    )
}

export  default CustomHeader;