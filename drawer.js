import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { withNavigation } from 'react-navigation';

class DrawerComponent extends Component {
  // navigateToScreen = route => () => {
  //   const navigateAction = NavigationActions.navigate({
  //     routeName: route,
  //   });
  //   this.props.navigation.dispatch(navigateAction);
  // };

  render() {
    return (
      // <View style={{ flex: 1 }}>

        <View style={{height: 800, backgroundColor: 'white', alignItems:'center', justifyContent:'center'}}>
        <Image source={require('./assets/news-icon.png')} style={{height: 120, width: 120, borderRadius: 60}}/>
          <View/>
        <ScrollView>
       <TouchableOpacity
                   onPress={() => this.props.navigation.navigate('Home')}>
                   <Text style= {{fontSize: 25, padding: 20, backgroundColor: '#26A65B', color: "#fff"}}>Home</Text>
                 </TouchableOpacity>
                 <TouchableOpacity
                   onPress={() => this.props.navigation.navigate('Preferences')}>
                   <Text style= {{fontSize: 25, padding: 20, backgroundColor: '#26A65B', color: "#fff"}}>Preferences</Text>
                 </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Bookmarks')}>
                    <Text style= {{fontSize: 25, padding: 20, backgroundColor: '#26A65B', color:"#fff"}}>Bookmarks</Text>
                  </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(DrawerComponent);