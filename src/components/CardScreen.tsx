import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput, Switch, ToastAndroid  } from "react-native";
import { useRoute } from '@react-navigation/native';
import {useState, useEffect} from 'react'
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import logo from '../images/back_logo.png'
import ok_logo from '../images/active_logo.png'
import no_logo from '../images/inactive_logo.png'
import write_logo from '../images/escritura.png'
import delete_logo from '../images/delete.png'
import save_logo from '../images/save.png'

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
        .then(res => {navigation.navigate('Home'), ToastAndroid.show('Menú eliminado exitósamente', ToastAndroid.SHORT)})
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
        .then((res) => {setEdit(false), ToastAndroid.show('Menú editado exitósamente', ToastAndroid.SHORT)})
        .catch(err => console.log(err))
    }

    return (
        <View style={styles.background}>
            <View style={styles.header_wrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={logo} style={styles.back_btn}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteMenu()} >
                    <Image source={delete_logo} style={styles.buttons}/>
                </TouchableOpacity>
                    {edit 
                    ? <TouchableOpacity onPress={() => handleEditSubmit()} >
                        <Image source={save_logo} style={styles.buttons}/>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={() => editMenu()} >
                        <Image source={write_logo} style={styles.buttons}/>
                    </TouchableOpacity>}
            </View>
            <View style={styles.content_wrapper}>
                <Image source={{uri: menu.image}} style={{height: 180, width: 300}}></Image>
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

                    
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fff',
        flex: 1,
    },
    header_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#900'
    },
    back_btn: {
        height: 50,
        width: 50,
        margin: 5,
        backgroundColor: '#c00',
        borderRadius: 30,
        marginRight: 20,

    },
    buttons: {
        height: 50,
        width: 50,
        margin: 5,
        backgroundColor: '#c00',
        borderRadius: 10,
        marginRight: 20,

    },
    content_wrapper: {
        alignItems: 'center',
        marginTop: 30
    },
    text: {
        backgroundColor: '#900',
        margin: 10,
        borderRadius: 5,
        paddingLeft: 15,
        fontSize: 16,
        width: '90%',
        color: '#fff',
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
        backgroundColor: '#900',
        margin: 10,
        borderRadius: 5,
        paddingLeft: 15,
        fontSize: 16,
        color: '#fff',
        padding: 14,
    },
    text_short2: {
        backgroundColor: '#900',
        margin: 10,
        borderRadius: 5,
        fontSize: 14,
        color: '#fff',
        padding: 0,
        width: 130
    }
})