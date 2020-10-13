import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import {createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { StackNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import SideMenu from './drawer';
import {AppRegistry} from 'react-native';
import DrawerComponent from './drawer';


export default function App() {
  return (
    <MainNavigator/>
  );
}
  const MyApp = createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          header: {
            visible: false
          }
        }
      },
      Settings: {
        screen: SettingsScreen,
        navigationOptions: {
          header: {
            visible: false
          }
        }
      }
      }
//    },
//    {
//      initialRouteName: "HomeScreen"
//    }
  );

const MainNavigator = createAppContainer(createDrawerNavigator({

  Home: {screen: HomeScreen},
  Settings:  {screen: SettingsScreen }
},{
  drawerWidth: 300,
  contentComponent: DrawerComponent,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
}));


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
