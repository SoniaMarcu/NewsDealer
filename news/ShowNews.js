import React, {Component} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import NewsCard from './NewsCard';

class ShowNews extends Component {


    state={
        news:[]
    }
    async componentDidMount() {
        let categoryPreferences=[];
        let websitePeferences=[];
        try{
            try{
                categoryPreferences = await AsyncStorage.getItem("CATEGORY_PREFERENCES");
                categoryPreferences= JSON.parse(categoryPreferences);
            }catch (e) {
                console.log(e);
                AsyncStorage.setItem("CATEGORY_PREFERENCES", JSON.stringify([]));
            }
            try{
                    websitePeferences= await AsyncStorage.getItem("WEBSITE_PREFERENCES");
                    websitePeferences=JSON.parse(websitePeferences);
            }catch (e) {
                console.log(e);
                AsyncStorage.setItem("WEBSITE_PREFERENCES", JSON.stringify([]));
            }

            let jsonCategoriesDict={"categories": categoryPreferences}
            let jsonWebsitesDict={ "websites": websitePeferences }
            axios.post('http://127.0.0.1:5000/getFilteredArticles', {
                'categories': categoryPreferences,
                'websites': websitePeferences
            })
                .then(response=> {
                    console.log(response)
                    this.setState({
                        news: response.data.articles.slice(0, 10)
                    })
                    console.log(this.getState)
                }).catch(function (error) {
                console.log(error);
            });
        }catch (e) {
            return
        }
        
    }





render() {

        const {news} = this.state;
        if(news.length===0){
            return(
                <View></View>
            )
        }

        const newsList=news.map(n=> {
            return (
                <NewsCard news={n} key={n.id}></NewsCard>
            )
        })

    return (
            <ScrollView style={{flex:1, width: '100%',
                minHeight: '100%'}}>
                <View style={{flex:1, width: '100%',
                    minHeight: '100%'}}>
                    {newsList}
                </View>
            </ScrollView>
    )


}

}

export default ShowNews;


