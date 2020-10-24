import React , {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomHeader from "../shared/CustomHeader";

export default class BookmarksScreen extends Component{

    render() {
        return (
            <View style={{flex:1}}>
                <CustomHeader navigation={ this.props.navigation }/>
            </View>
        );
    }

}