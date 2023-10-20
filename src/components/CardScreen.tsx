import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from "react-native";
import { useRoute } from '@react-navigation/native';
import {useState, useEffect} from 'react'
import axios from "axios";
import logo from '../images/back_logo.png'
import ok_logo from '../images/active_logo.png'
import no_logo from '../images/inactive_logo.png'


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

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        axios.get('https://tornado-api.vercel.app/' + menuId)
        .then(res => setMenu(res.data[0]))
        .catch(err => console.log(err.message))
    },[])

    const deleteMenu = () => {
        axios.delete('https://tornado-api.vercel.app/' + menuId)
        .then(res => console.log('Eliminado'))
        .catch(err => console.log(err))
    }

    const editMenu = () => {
        setEdit(true)
    }

    const handleEditSubmit = () => {
        setEdit(false)
    }

    return (
        <View style={styles.background}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} >
                <Image source={logo} style={styles.back_btn}/>
            </TouchableOpacity>
            <View style={styles.content_wrapper}>
                <View style={styles.text_wrapper}>
                    <Text style={styles.text_title}>Nombre del Menú:</Text>
                    {edit 
                    ? null
                    : <Text style={styles.text}>{menu.name}</Text>}
                    
                </View>

                <View style={styles.text_wrapper}>
                    <Text style={styles.text_title}>Descripción:</Text>
                    {edit 
                    ? null 
                    : <Text style={styles.text}>{menu.description}</Text>}
                </View>
                <Image source={{uri: menu.image}} style={{height: 180, width: 300}}></Image>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%'}}>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.text_title}>Precio:</Text>
                        {edit 
                        ? null
                        :<Text style={styles.text_short}>${menu.price}</Text>}
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.text_title}>Activo:</Text>
                        {edit 
                        ? null
                        : menu.active 
                        ? <Image source={ok_logo} style={{height: 60, width: 60, marginLeft: '4%', backgroundColor:'#0a6', borderRadius: 40}}/> 
                        : <Image source={no_logo} style={{height: 60, width: 60, marginLeft: '4%', backgroundColor:'#a06', borderRadius: 40}}/>}
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.text_title}>Categoría:</Text>
                        {edit 
                        ? null 
                        :<Text style={styles.text_short}>{menu.category[0]?.toUpperCase() + menu.category?.slice(1)}</Text>
                        }
                    </View>
                </View>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={() => deleteMenu()} >
                        <Text style={styles.buttons}>ELIMINAR</Text>
                    </TouchableOpacity>
                    {edit 
                    ? <TouchableOpacity onPress={() => handleEditSubmit()} >
                        <Text style={styles.buttons}>GUARDAR</Text>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={() => editMenu()} >
                        <Text style={styles.buttons}>EDITAR</Text>
                    </TouchableOpacity>}
                    
                </View>

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
        padding: 14,
        alignSelf: "center"
    },
    text_wrapper: {
        width: '100%',
        marginVertical: 10,
    },
    text_title: {
        fontSize: 16,
        marginLeft: '5%',
        color: '#400',
        fontWeight: '600',
    },
    text_short: {
        backgroundColor: '#ecc',
        margin: 10,
        borderRadius: 5,
        paddingLeft: 15,
        fontSize: 16,
        color: '#800',
        padding: 14,
    },
    buttons: {
        backgroundColor: '#900',
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 3,
        color: '#fff',
        fontSize: 16,
        margin: 5
    }
})