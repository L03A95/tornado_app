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
        active: ''
    })

    useEffect(() => {
        axios.get('https://tornado-api.vercel.app/' + menuId)
        .then(res => setMenu(res.data[0]))
        .catch(err => console.log(err.message))
    },[])

    return (
        <View style={styles.background}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} >
                <Image source={logo} style={styles.back_btn}/>
            </TouchableOpacity>
            <View style={styles.content_wrapper}>
                <View style={styles.text_wrapper}>
                    <Text>Nombre del Menú</Text>
                    <Text style={styles.text}>{menu.name}</Text>
                </View>

                <Text style={styles.text}>{menu.description}</Text>
                <Image source={{uri: menu.image}} style={{height: 180, width: 300}}></Image>
                <Text style={styles.text}>${menu.price}</Text>
                <Text>{menu.category}</Text>
                <Text>{menu.active ? 'Activo' : 'Inactivo'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fff0f0',
        flex: 1,
    },
    back_btn: {
        height: 40,
        width: 40,
        margin: 5,
        backgroundColor: '#c00',
        borderRadius: 15,
        marginRight: 20,

    },
    content_wrapper: {
        alignItems: 'center'
    },
    text: {
        backgroundColor: '#ecc',
        margin: 10,
        borderRadius: 5,
        paddingLeft: 15,
        fontSize: 16,
        width: '90%',
        color: '#800',
        padding: 14
    },
    text_wrapper: {
        width: '100%',
        marginVertical: 10
    }
})