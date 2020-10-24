import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import {createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { StackNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './screens/HomeScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import SideMenu from './drawer';
import {AppRegistry} from 'react-native';
import DrawerComponent from './drawer';
import {Header} from "react-native-elements";
import BookmarksScreen from "./screens/BookmarksScreen";


class App extends Component {
  render() {

    return (

          <MainNavigator/>

    );
  }

}

export  default App;


const MyApp = createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          header: {
            visible: true
          }
        }
      },
      Settings: {
        screen: PreferencesScreen,
        navigationOptions: {
          header: {
            visible: true
          }
        }
      },
        Bookmarks: {
        screen: BookmarksScreen,
        navigationOptions: {
          header: {
            visible: true
          }
        }
      }
    },
   {
     initialRouteName: "HomeScreen"
   })




//    },
//    {
//      initialRouteName: "HomeScreen"
//    }


const MainNavigator = createAppContainer(createDrawerNavigator({

  Home: {screen: HomeScreen},
  Preferences:  {screen: PreferencesScreen },
  Bookmarks : {screen : BookmarksScreen}
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
