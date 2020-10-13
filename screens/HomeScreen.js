import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import { Icon } from 'react-native-elements';
class HomeScreen extends Component{
    render(){
        return (
            <View style={styles.container}>
            <Header>
//                <Icon
//                            name='three-bars'
//                            size={30}
//                            color='black'
//                            onPress={() => this.props.navigation.navigate('DrawerOpen')} />
                    </Header>

              <Text>HomeScreen</Text>
              <StatusBar style="auto" />
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
  },
});
