import React, {Component} from 'react';
import { CheckBox } from 'react-native-elements'
import { StyleSheet, Text, View } from 'react-native';


class Preferences extends Component{

    state={
        checked1:false,
        checked2:false,
        checked3:false

    }

    render() {
        return(
            <View style={{flex:1}}>

            <CheckBox
                title='POLITICA'
                checked={this.state.checked1}
                onPress={() => this.setState({checked1: !this.state.checked1})}
            />
        <CheckBox
            title='SPORT'
            checked={this.state.checked2}
            onPress={() => this.setState({checked2: !this.state.checked2})}
        />
        <CheckBox
            title='LIFESTYLE'
            checked={this.state.checked3}
            onPress={() => this.setState({checked3: !this.state.checked3})}
        />
            </View>

        )
    }

}

export default Preferences;