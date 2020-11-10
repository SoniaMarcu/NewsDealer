import React , {Component} from 'react';
import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomHeader from "../shared/CustomHeader";
import {Button, Card, Paragraph, Title} from "react-native-paper";
import NewsCard from "../news/NewsCard";
import AsyncStorage from '@react-native-community/async-storage';
import BookmarkCard from "../news/BookmarkCard";


export default class BookmarksScreen extends Component{


    state ={
        bookmarks: []
    }


    async componentDidMount() {
        let bookmarkList= await AsyncStorage.getItem("BOOKMARKS2");
        let bookmarkList2=JSON.parse(bookmarkList)
        console.log(bookmarkList2)
            const bookmarksCards= bookmarkList2.map(bookmark => {
                return (
                    // <Card style={{flex:1, backgroundColor:'#ebe6e6', margin: 20, shadowColor: "#000",
                    //     shadowOffset: {width: 1, height: 2},
                    //     shadowOpacity: 0.3 }} key={bookmark.id}>
                    //     <Card.Title subtitle={bookmark.website} style={{minHeight: 10, marginTop: 10}}/>
                    //     {/*<Card.Title title={n.title}/>*/}
                    //     <Card.Content>
                    //         <Title>{bookmark.name}</Title>
                    //         {/*<Paragraph numberOfLines={4}>{props.news.description}</Paragraph>*/}
                    //     </Card.Content>
                    //     <Card.Actions>
                    //         <Button onPress={()=>{
                    //             Linking.openURL(bookmark.url);
                    //         }}>READ NEWS</Button>
                    //         <Button icon="star" style={{marginLeft: 120 }}onPress={()=>{}}></Button>
                    //     </Card.Actions>
                    // </Card>
                    //
                    <BookmarkCard news={bookmark} key={bookmark.id}></BookmarkCard>
                )
            })

            this.setState({bookmarks:bookmarksCards});



    }

    render() {
        return (
            <View style={{flex:1}}>
                <CustomHeader navigation={ this.props.navigation }/>
                <ScrollView style={{flex:1, width: '100%'}}>
                <View>
                    {this.state["bookmarks"]}
                </View>
                    </ScrollView>
            </View>
        );
    }

}