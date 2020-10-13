import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
class SettingsScreen extends Component{
    render(){
        return (
            <View style={styles.header}>

                        <Ionicons name="md-menu" size={32} color="grey" onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}  style={{margin: 20}}/>
                        <View style={styles.container}>

                                    <Text>SettingsScreen</Text>
                                    <StatusBar style="auto" />
                                  </View>
                      </View>

          );
    }
    
 
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
