import {Button, Card, Paragraph, Title} from "react-native-paper";
import React from "react";
import {Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

async function addBookmark(news) {
    console.log("this is the news that I want to bookmark ", news);
    if(!AsyncStorage.getItem('BOOKMARKS2')){
        let bookmarks=[]
        bookmarks.push(news)
        AsyncStorage.setItem('BOOKMARKS2', JSON.stringify(bookmarks)).then(console.log("SUCCESSFULLY ADDED BOOKMARK"))

    }else{
        let bookmarks= await AsyncStorage.getItem('BOOKMARKS2');
        bookmarks=JSON.parse(bookmarks)
        if(!bookmarks){
            bookmarks=[]
            bookmarks.push(news)
            await AsyncStorage.setItem('BOOKMARKS2', JSON.stringify(bookmarks))
            return
        }
        let filteredBookmarks = bookmarks.filter(b=> b.id !== news.id)
        filteredBookmarks.push(news)


        AsyncStorage.setItem('BOOKMARKS2', JSON.stringify(filteredBookmarks)).then(console.log("SUCCESSFULLY ADDED BOOKMARK"))
    }

        // let bl=[]
        // bl.push(news)
        // AsyncStorage.setItem('BOOKMARKS2', JSON.stringify(bl)).then(async ()=>{
        //     const a= await AsyncStorage.getItem('BOOKMARKS2');
        //     console.log(a);
        //     console.log(JSON.parse(a))
        //
        // })

}

const NewsCard = (props)=>{

    return(
        <Card style={{flex:1, backgroundColor:'#ebe6e6', margin: 20, shadowColor: "#000",
            shadowOffset: {width: 1, height: 2},
            shadowOpacity: 0.3 }} key={props.news.id}>
            <Card.Title subtitle={props.news.website} style={{minHeight: 10, marginTop: 10}}/>
            {/*<Card.Title title={n.title}/>*/}
            <Card.Content>
                <Title>{props.news.name}</Title>
                <Paragraph numberOfLines={4}>{props.news.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button onPress={()=>{
                    Linking.openURL(props.news.url);
                }}>READ NEWS</Button>
                <Button icon="star" style={{marginLeft: 120 }}onPress={()=>addBookmark(props.news)}></Button>
            </Card.Actions>
        </Card>
    )


}

export default NewsCard;