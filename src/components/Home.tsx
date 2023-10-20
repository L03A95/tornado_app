import { StyleSheet, Text, ScrollView } from "react-native";
import Card from "./Card";
import { useState, useEffect } from 'react'
import axios from "axios";
import Header from "./Header";


export default function Home ({navigation} : {navigation: any}) : JSX.Element {

    const [menus, setMenus] = useState([])

    useEffect(() => {
        axios.get('https://tornado-api.vercel.app')
        .then(res => setMenus(res.data))
        .catch(err => console.log(err.message))
    })

    return (
        <ScrollView style={styles.background}>
            <Header navigation={navigation}/>
            {menus[0] ?
            menus?.map((m : any) => {
                return <Card name={m.name} description={m.description} image={m.image} price={m.price} category={m.category} active={m.active} _id={m._id} navigation={navigation} key={m._id}/>
            }) : <Text style={styles.text}>No se encontraron menús...</Text>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fff0f0',
        flex: 1,
    },
    text: {
        textAlign: 'center',
        marginTop: 50
    }
})