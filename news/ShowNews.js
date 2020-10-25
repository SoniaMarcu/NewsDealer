import React, {Component} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
// import { Card, Button } from 'react-native-material-design';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


class ShowNews extends Component {


    state={
        news:[]
    }
    componentDidMount() {
        // no need to put an async/await, you can still use promises
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response=> {
                console.log(response)
                this.setState({
                    news: response.data.slice(0, 10)
                })

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
                <Card style={{flex:1, backgroundColor:'#ebe6e6', margin: 20, shadowColor: "#000",
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 0.3 }} key={n.id}>
                    <Card.Title subtitle={"card subtitle"} style={{minHeight: 10, marginTop: 10}}/>
                    {/*<Card.Title title={n.title}/>*/}
                    <Card.Content>
                        <Title>{n.title}</Title>
                        <Paragraph numberOfLines={4}>{n.body}</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                       <Button>READ NEWS</Button>
                        <Button icon="star" style={{marginLeft: 190 }}onPress={()=>console.log("am apasat")}></Button>
                    </Card.Actions>
                    </Card>

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
//
// const styles = StyleSheet.create({
//     paragraph: {
//         margin: 24,
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     scrollView: {
//         height: '20%',
//         width: '80%',
//         margin: 20,
//         alignSelf: 'center',
//         padding: 20,
//         borderWidth: 5,
//         borderRadius: 5,
//         borderColor: 'black',
//         backgroundColor: 'lightblue'
//     },
//     contentContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'lightgrey',
//         paddingBottom: 50
//     }
// });
export default ShowNews;


