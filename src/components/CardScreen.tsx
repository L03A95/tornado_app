import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import {useState, useEffect} from 'react'
import axios from "axios";
import logo from '../images/back_logo.png'


export default function CardScreen ({navigation} : {navigation: any}) {
    const route = useRoute();
    const menuId = route.name;

    const [menu, setMenu] = useState({
        name: '',
        description: '',
        image: 'https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-gray-solid-color-simple-background-image_557028.jpg',
        price: 0,
        category: '',
        active: false
    })

    useEffect(() => {
        axios.get('https://tornado-api.vercel.app/' + menuId)
        .then(res => setMenu(res.data[0]))
        .catch(err => console.log(err.message))
    },[])

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
                <Image source={logo} style={styles.image}/>
            </TouchableOpacity>
            <Text>{menu.name}</Text>
            <Text>{menu.description}</Text>
            <Image source={{uri: menu.image}} style={{height: 80, width: 140}}></Image>
            <Text></Text>
            <Text></Text>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 40,
        width: 40,
        margin: 5,
        backgroundColor: '#c00',
        borderRadius: 15,
        marginRight: 20
    },
    button: {
        
    },
    background: {

    }
})