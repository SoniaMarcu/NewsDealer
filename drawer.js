import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { withNavigation } from 'react-navigation';

class DrawerComponent extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      // <View style={{ flex: 1 }}>

        <View style={{height: 800, backgroundColor: 'white', alignItems:'center', justifyContent:'center'}}>
        <Image source={require('./assets/news-icon.png')} style={{height: 120, width: 120, borderRadius: 60}}/>
          <View/>
        <ScrollView>
       <TouchableOpacity
                   onPress={() => this.props.navigation.navigate('Home')}>
                   <Text style= {{fontSize: 25, padding: 20, backgroundColor: '#b7ddb0'}}>Home</Text>
                 </TouchableOpacity>
                 <TouchableOpacity
                   onPress={() => this.props.navigation.navigate('Settings')}>
                   <Text style= {{fontSize: 25, padding: 20, backgroundColor: '#b7ddb0'}}>Preferences</Text>
                 </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Settings')}>
                    <Text style= {{fontSize: 25, padding: 20, backgroundColor: '#b7ddb0'}}>Bookmarks</Text>
                  </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(DrawerComponent);