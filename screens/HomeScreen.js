import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomHeader from "../shared/CustomHeader";
import ShowNews from "../news/ShowNews"; // 0.16.0

class HomeScreen extends Component{


    componentDidMount(){
        console.log("I print from mount")

        this.render();
    }


    render(){
        console.log("I print from render")
        return (
            <View style={{flex:1}} >

            <CustomHeader navigation={ this.props.navigation }/>
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
      width: '100%'
      // minHeight: '100%'
  },
});
