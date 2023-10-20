import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput, Switch  } from "react-native";
import { useRoute } from '@react-navigation/native';
import {useState, useEffect} from 'react'
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
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
        active: false
    })

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        axios.get('https://tornado-api.vercel.app/' + menuId)
        .then(res => setMenu(res.data[0]))
        .catch(err => console.log(err.message))
    },[])

    const deleteMenu = () => {
        axios.delete('https://tornado-api.vercel.app/' + menuId)
        .then(res => navigation.navigate('Home'))
        .catch(err => console.log(err))
    }

    const editMenu = () => {
        setEdit(true)
    }

    const handleInputChange = (type : string , value : string | number) => {
        setMenu({...menu, [type]: value})
    }

    const handleEditSubmit = () => {
        axios.put('https://tornado-api.vercel.app/' + menuId, menu)
        .then((res) => setEdit(false))
        .catch(err => console.log(err))
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
                    ? <TextInput placeholder='Nombre' onChangeText={(text) => { handleInputChange('name', text)}} style={styles.text} value={menu.name}/>
                    : <Text style={styles.text}>{menu.name}</Text>}
                    
                </View>

                <View style={styles.text_wrapper}>
                    <Text style={styles.text_title}>Descripción:</Text>
                    {edit 
                    ? <TextInput placeholder='Descripción' onChangeText={(text) => { handleInputChange('description', text)}} style={styles.text} value={menu.description}/>
                    : <Text style={styles.text}>{menu.description}</Text>}
                </View>
                <Image source={{uri: menu.image}} style={{height: 180, width: 300}}></Image>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%'}}>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.text_title}>Precio:</Text>
                        {edit 
                        ? <TextInput placeholder='Precio' keyboardType="numeric" onChangeText={(text) => { handleInputChange('price', text)}} style={styles.text_short} value={`${menu.price}`}/>
                        :<Text style={styles.text_short}>${menu.price}</Text>}
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.text_title}>Activo:</Text>
                        {edit 
                        ? <Switch value={menu.active} onChange={(v) => setMenu({...menu, active: !menu.active})} trackColor={{false: '#a06', true: '#0a6'}} thumbColor={'#fff'} style={{width: 50, height: 50}}/>
                        : menu.active 
                        ? <Image source={ok_logo} style={{height: 60, width: 60, marginLeft: '4%', backgroundColor:'#0a6', borderRadius: 40}}/> 
                        : <Image source={no_logo} style={{height: 60, width: 60, marginLeft: '4%', backgroundColor:'#a06', borderRadius: 40}}/>}
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.text_title}>Categoría:</Text>
                        {edit 
                        ? <Picker selectedValue={menu.category} onValueChange={(value) => handleInputChange('category', value)} style={styles.text_short2}>
                            <Picker.Item label="Entrada" value='entrada'/>
                            <Picker.Item label="Parrilla" value='parrilla'/>
                            <Picker.Item label="Cafetería" value='cafeteria'/>
                            <Picker.Item label="Dulces" value='dulces'/>
                            <Picker.Item label="Bebidas" value='bebidas'/>
                        </Picker>
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
    },
    text_short2: {
        backgroundColor: '#ecc',
        margin: 10,
        borderRadius: 5,
        fontSize: 14,
        color: '#800',
        padding: 0,
        width: 130
    }
})