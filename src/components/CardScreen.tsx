import { StyleSheet, Text, View, Image } from "react-native";
import { useRoute } from '@react-navigation/native';
import {useState, useEffect} from 'react'
import axios from "axios";


export default function CardScreen () {
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
            <Text>{menu.name}</Text>
            <Text>{menu.description}</Text>
            <Image source={{uri: menu.image}} style={{height: 80, width: 140}}></Image>
            <Text></Text>
            <Text></Text>
            <Text></Text>
        </View>
    )
}