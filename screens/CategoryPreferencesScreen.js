import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View , ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import CustomHeader from "../shared/CustomHeader";
import CategoryPreferences from "../preferences/CategoryPreferences";
class CategoryPreferencesScreen extends Component{
    render(){
        return (
            <View style={{flex:1}} >
                <CustomHeader navigation={ this.props.navigation }/>

                        {/*<Ionicons name="md-menu" size={32} color="grey" onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}  style={{margin: 20}}/>*/}
                        <ScrollView style={{flex:1, width: '100%'}} >

                                    <StatusBar style="auto" />
                                    <CategoryPreferences/>
                                  </ScrollView>
                      </View>

          );
    }
    
 
}

export default CategoryPreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
