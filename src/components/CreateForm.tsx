import { View, TextInput, Text, Button, Image, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import { Picker } from "@react-native-picker/picker";
import { useState } from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Crypto from 'crypto-js'
import logo from '../images/back_logo.png'
import blank_image from '../images/menu_blank.png'


export default function CreateForm({navigation} : {navigation: any}) {


    const [newMenu, setNewMenu] = useState({
        name: '',
        description: '',
        price: 0,
        image: 'https://res.cloudinary.com/dlaqpndlk/image/upload/v1697822906/cadi5vdi261hjereq5ma.png',
        category: 'entrada',
        active: true
    })

    const blankMenu = {
        name: '',
        description: '',
        price: 0,
        image: 'https://res.cloudinary.com/dlaqpndlk/image/upload/v1697822906/cadi5vdi261hjereq5ma.png',
        category: 'entrada',
        active: true
    }

    const handleInputChange = (type : string , value : string | number) => {
        setNewMenu({...newMenu, [type]: value})
    }

    const handleImageChange = async () => {
        launchImageLibrary({ mediaType: 'photo', maxWidth: 400, maxHeight: 400 }, (response) => {
          if (!response.didCancel && response.assets) {
            const image = response.assets[0];


            const ts = Math.round((new Date()).getTime() / 1000);
            const apiKey = '945541274585366'
            const apiSecret = 'ffMXS9C9-76dCwmWnEFQnc-aMZQ'
            const hash = `timestamp=${ts}${apiSecret}`
            const signature = Crypto.SHA1(hash).toString()
                  
            const formData = new FormData();
            formData.append('file', {
              uri: image.uri,
              type: image.type,
              name: image.fileName,
            });
            formData.append('timestamp',ts)
            formData.append('api_key',apiKey)
            formData.append('signature', signature)
      
            axios.post('https://api.cloudinary.com/v1_1/dlaqpndlk/image/upload', formData)
              .then((response) => {
                const imageUrl = response.data.secure_url; // La URL de la imagen en Cloudinary
                setNewMenu({ ...newMenu, image: imageUrl });
              })
              .catch((error) => {
                console.error('Error al cargar la imagen en el servidor', error);
              });
          }
        });
      };

    const handleSubmitMenu = async () => {
        axios.post('https://tornado-api.vercel.app/', newMenu)
        .then(res => {setNewMenu(blankMenu), ToastAndroid.show('Menú cargado exitósamente', ToastAndroid.SHORT) ,navigation.navigate('Home')})
        .catch(err => console.log(err))
    }

    return (
        <View style={styles.background}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
                <Image source={logo} style={styles.back_btn}/>
            </TouchableOpacity>
            <Text style={styles.title}>Añadir Menú</Text>
            <TextInput placeholder='Nombre' onChangeText={(text) => { handleInputChange('name', text)}} style={styles.input} placeholderTextColor='#caa'/>
            <TextInput placeholder='Descripción' onChangeText={(text) => { handleInputChange('description', text)}} style={styles.input} placeholderTextColor='#caa'/>
            <TextInput placeholder='Precio' keyboardType="numeric" onChangeText={(text) => { handleInputChange('price', text)}} style={styles.input} placeholderTextColor='#caa'/>
            <TouchableOpacity onPress={async () => handleImageChange()}>
                <Text style={styles.buttons}>SUBIR IMAGEN</Text>
            </TouchableOpacity>
            {newMenu.image ? <Image source={{ uri: newMenu.image }} style={{ width: 300, height: 180, margin: 10 }} /> : <Image source={blank_image} style={{ width: 300, height: 180, margin: 10 }}/>}
            <Picker selectedValue={newMenu.category} onValueChange={(value) => handleInputChange('category', value)} style={styles.input}>
                <Picker.Item label="Entrada" value='entrada'/>
                <Picker.Item label="Parrilla" value='parrilla'/>
                <Picker.Item label="Cafetería" value='cafeteria'/>
                <Picker.Item label="Dulces" value='dulces'/>
                <Picker.Item label="Bebidas" value='bebidas'/>
            </Picker>
            <TouchableOpacity onPress={() => handleSubmitMenu()} >
                <Text style={styles.buttons}>SUBIR</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    back_btn: {
        height: 50,
        width: 50,
        margin: 5,
        backgroundColor: '#c00',
        borderRadius: 30,
        marginRight: 20
    },
    button: {
        alignSelf: 'flex-start',
        backgroundColor: '#900',
        width: '100%'
    },
    background: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1
    },
    input: {
        backgroundColor: '#9f0000',
        margin: 10,
        borderRadius: 5,
        paddingLeft: 15,
        fontSize: 16,
        width: '90%',
        color: '#fff'
    },
    title: {
        fontSize: 30,
        color: '#900',
        fontWeight: '600',
        marginTop: 30
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