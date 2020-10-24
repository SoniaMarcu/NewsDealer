import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import CustomHeader from "../shared/CustomHeader";
import Preferences from "../preferences/Preferences";
class PreferencesScreen extends Component{
    render(){
        return (
            <View style={{flex:1}} >
                <CustomHeader navigation={ this.props.navigation }/>

                        {/*<Ionicons name="md-menu" size={32} color="grey" onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}  style={{margin: 20}}/>*/}
                        <View >

                                    <StatusBar style="auto" />
                                    <Preferences/>
                                  </View>
                      </View>

          );
    }
    
 
}

export default PreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});