import React, {Component} from 'react';
import { CheckBox } from 'react-native-elements'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class CategoryPreferences extends Component {

    state = {

        categories: {
            world: {name: "World", value: false},
            politics: {name: "Politics", value: false},
            business: {name: "Business", value: false},
            health: {name: "Health", value: false},
            technology: {name: "Technology", value: false},
            sports: {name: "Sports", value: false},
            entertainment: {name: "Entertainment", value: false},
            innovation: {name: "Innovation", value: false},
            reel: {name: "Reel", value: false},
            style: {name: "Style", value: false},
            weather: {name: "Weather", value: false},
            travel: {name: "Travel", value: false}
        }


    }


    async componentDidMount() {
        let categoryPreferences;
        try {
            var categoriesList = await AsyncStorage.getItem("CATEGORY_PREFERENCES")
            if (categoriesList !== null) {
                console.log(
                    categoriesList
                )
                let categs = {...this.state.categories}
                categoriesList= JSON.parse(categoriesList)
                categoriesList.map(c => {
                        console.log(c);
                        Object.values(categs).map((cat, index) => {
                            if (cat.name === c) {
                                console.log("true")
                                cat.value = true;
                            }
                        })
                    }
                )
                this.setState({categories: categs})
                this.render()

            } else {
                categoryPreferences = AsyncStorage.set("CATEGORY_PREFERENCES");
                AsyncStorage.setItem("CATEGORY_PREFERENCES", JSON.stringify([]));
            }

        } catch (e) {
            console.log(e)
            AsyncStorage.setItem("CATEGORY_PREFERENCES", JSON.stringify([]));

        }

        console.log(this.state);

    }

    async componentDidUpdate() {

        this.render()
    }

    setup(){
        let categoryPreferences= {...this.state.categories}
        let res= Object.values(categoryPreferences).map((cat, index)=>{
            return(<CheckBox key={cat.name}
                             title={cat.name}
                             checked={cat.value}
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
        let categoryPreferences= {...this.state.categories};
        let res= Object.values(this.state.categories).map((cat, ind)=>{
           if(index===ind){
               cat.value=!cat.value;
               this.setCategoryPreferences(cat.name, cat.value);
           }
           return cat;

        })
        this.setState({categories: res})
        console.log(this.state.categories)

    }


   async setCategoryPreferences(categoryName, added){
        if(added==true){
           let categoryPreferences= await AsyncStorage.getItem("CATEGORY_PREFERENCES");
           categoryPreferences=JSON.parse(categoryPreferences);
           categoryPreferences.push(categoryName);
           await AsyncStorage.setItem("CATEGORY_PREFERENCES", JSON.stringify(categoryPreferences))
            console.log("i ADDED IN ASYNC ", categoryPreferences)
        }else{
            let categoryPreferences= await AsyncStorage.getItem("CATEGORY_PREFERENCES");
            categoryPreferences=JSON.parse(categoryPreferences);
            categoryPreferences= categoryPreferences.filter(cat=> cat!=categoryName)
            await AsyncStorage.setItem("CATEGORY_PREFERENCES", JSON.stringify(categoryPreferences))
            console.log("i DELETED  FROM ASYNC ", categoryPreferences)

        }
    }

}


export default CategoryPreferences;






















































































































































































































