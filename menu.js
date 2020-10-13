import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import {createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';

class MenuHeader extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };
  render() {
    return (
      // <View style={{ flex: 1 }}>
       <View >

       <Ionicons name="md-menu" size={32} color="grey" onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} />

       </View>



    );
  }
}
export default MenuHeader;