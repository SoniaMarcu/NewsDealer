import {Button, Card, Paragraph, Title} from "react-native-paper";
import React from "react";
import {Linking} from 'react-native';
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
                <Button icon="star" style={{marginLeft: 120 }}onPress={()=>console.log("am apasat")}></Button>
            </Card.Actions>
        </Card>
    )


}

export default NewsCard;