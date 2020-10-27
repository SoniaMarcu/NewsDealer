import React, {Component} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import NewsCard from './NewsCard';

class ShowNews extends Component {


    state={
        news:[]
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:5000/getUnfilteredArticles')
            .then(response=> {
                console.log(response)
                this.setState({
                    news: response.data.articles.slice(0, 10)
                })
                console.log(this.getState)

            }).catch(function (error) {
            console.log(error);
        });
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
                // <Card style={{flex:1, backgroundColor:'#ebe6e6', margin: 20, shadowColor: "#000",
                //     shadowOffset: {width: 1, height: 2},
                //     shadowOpacity: 0.3 }} key={n.id}>
                //     <Card.Title subtitle={n.website} style={{minHeight: 10, marginTop: 10}}/>
                //     {/*<Card.Title title={n.title}/>*/}
                //     <Card.Content>
                //         <Title>{n.name}</Title>
                //         <Paragraph numberOfLines={4}>{n.description}</Paragraph>
                //     </Card.Content>
                //     <Card.Actions>
                //        <Button>READ NEWS</Button>
                //         <Button icon="star" style={{marginLeft: 190 }}onPress={()=>console.log("am apasat")}></Button>
                //     </Card.Actions>
                //     </Card>
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


