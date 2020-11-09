import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomHeader from "../shared/CustomHeader";
import ShowNews from "../news/ShowNews"; // 0.16.0

class HomeScreen extends Component{




    render(){
        return (
            <View style={{flex:1}} >

            <CustomHeader navigation={ this.props.navigation }/>
{/*//              <Ionicons name="md-menu" size={32} color="grey" onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}  style={{margin: 20}}/>*/}
              <View style={styles.container} >
                          <StatusBar style="auto" />
                          <ShowNews/>
                        </View>
            </View>


          );
    }
    
 
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
      width: '100%',
      minHeight: '100%'
  },
});
