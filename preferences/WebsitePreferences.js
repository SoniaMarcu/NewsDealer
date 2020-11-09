import React, {Component} from 'react';
import { CheckBox } from 'react-native-elements'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class WebsitePreferences extends Component {

    state = {

        websites: {
            cnn:{name: "edition.cnn.com", value:false} ,
            bbc:{name: "bbc.com", value:false} ,
            the_atlantic: {name: "theatlantic.com", value:false},
            the_verge: {name: "theverge.com", value:false}
        }


    }


    async componentDidMount() {
        try {
            var favouriteWebsites = await AsyncStorage.getItem("WEBSITE_PREFERENCES")
            if (favouriteWebsites !== null) {
                console.log("not null",
                    favouriteWebsites
                )
                let websites = {...this.state.websites}
                favouriteWebsites= JSON.parse(favouriteWebsites)
                favouriteWebsites.map(w => {
                        console.log(w);
                        Object.values(websites).map((web, index) => {
                            if (web.name === w) {
                                console.log("true")
                                web.value = true;
                            }
                        })
                    }
                )
                this.setState({categories: websites})
                this.render()

            } else {
                AsyncStorage.set("WEBSITE_PREFERENCES");
                AsyncStorage.setItem("WEBSITE_PREFERENCES", JSON.stringify([]));
            }

        } catch (e) {
            console.log(e)
            AsyncStorage.setItem("WEBSITE_PREFERENCES", JSON.stringify([]));
        }

        console.log(this.state);

    }

    async componentDidUpdate() {

        this.render()
    }

    setup(){
        let websitePreferences= {...this.state.websites}
        let res= Object.values(websitePreferences).map((web, index)=>{
            return(<CheckBox key={web.name}
                             title={web.name}
                             checked={web.value}
                             onPress={() => {
                                 this.setNewPreferences(index);
                             }
                             }
            />)

        })
        return res;
    }

    render(){
        let result= this.setup();

        return(
            <View  style={{flex: 1}}>
                {result}
            </View>
        )
    }

    setNewPreferences(index){
        console.log(index)
        let websitePref= {...this.state.websites};
        let res= Object.values(this.state.websites).map((web, ind)=>{
            if(index===ind){
                web.value=!web.value;
                this.setCategoryPreferences(web.name, web.value);
            }
            return web;

        })
        this.setState({websites: res})
        console.log(this.state.websites)

    }


    async setCategoryPreferences(websiteName, added){
        if(added==true){
            let websitePreferences= await AsyncStorage.getItem("WEBSITE_PREFERENCES");
            websitePreferences=JSON.parse(websitePreferences);
            websitePreferences.push(websiteName);
            await AsyncStorage.setItem("WEBSITE_PREFERENCES", JSON.stringify(websitePreferences))
            console.log("i ADDED IN ASYNC ", websitePreferences)
        }else{
            let websitePreferences= await AsyncStorage.getItem("WEBSITE_PREFERENCES");
            websitePreferences=JSON.parse(websitePreferences);
            websitePreferences= websitePreferences.filter(cat=> cat!=websiteName)
            await AsyncStorage.setItem("WEBSITE_PREFERENCES", JSON.stringify(websitePreferences))
            console.log("i DELETED  FROM ASYNC ", websitePreferences)

        }
    }

}


export default WebsitePreferences;






















































































































































































































