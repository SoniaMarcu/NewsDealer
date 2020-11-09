import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import {createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { StackNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './screens/HomeScreen';
import CategoryPreferencesScreen from './screens/CategoryPreferencesScreen';
import WebsitePreferencesScreen from './screens/WebsitePreferencesScreen';
import SideMenu from './drawer';
import {AppRegistry} from 'react-native';
import DrawerComponent from './drawer';
import {Header} from "react-native-elements";
import BookmarksScreen from "./screens/BookmarksScreen";
import WebsitePreferences from "./preferences/WebsitePreferences";


class App extends Component {
  render() {

    return (

          <MainNavigator/>

    );
  }

}

export  default App;


const MainNavigator = createAppContainer(createDrawerNavigator({

  Home: {screen: HomeScreen},
  CategoryPreferences:  {screen: CategoryPreferencesScreen },
  Bookmarks : {screen : BookmarksScreen},
  WebsitePreferences: {screen: WebsitePreferencesScreen }
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
