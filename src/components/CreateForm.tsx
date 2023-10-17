import { View, TextInput, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from "@react-native-picker/picker";
import { useState } from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Crypto from 'crypto-js'
import logo from '../images/back_logo.png'


export default function CreateForm({navigation} : {navigation: any}) {


    const [newMenu, setNewMenu] = useState({
        name: '',
        description: '',
        price: 0,
        image: '',
        category: 'entrada',
        active: true
    })

    const blankMenu = {
        name: '',
        description: '',
        price: 0,
        image: '',
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
        .then(res => setNewMenu(blankMenu))
        .catch(err => console.log(err))
    }

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
                <Image source={logo} style={styles.image}/>
            </TouchableOpacity>
            <Text>Añadir Menú</Text>
            <TextInput placeholder='Nombre' onChangeText={(text) => { handleInputChange('name', text)}}></TextInput>
            <TextInput placeholder='Descripción' onChangeText={(text) => { handleInputChange('description', text)}}></TextInput>
            <TextInput placeholder='Precio' keyboardType="numeric" onChangeText={(text) => { handleInputChange('price', text)}}></TextInput>
            <Button title='Lunch camera' onPress={async () => handleImageChange()}></Button>
            <Picker selectedValue={newMenu.category} onValueChange={(value) => handleInputChange('category', value)}>
                <Picker.Item label="Entrada" value='entrada'/>
                <Picker.Item label="Parrilla" value='parrilla'/>
                <Picker.Item label="Cafetería" value='cafetería'/>
                <Picker.Item label="Dulces" value='dulces'/>
                <Picker.Item label="Bebidas" value='Bebidas'/>
            </Picker>
            {newMenu.image && <Image source={{ uri: newMenu.image }} style={{ width: 200, height: 200 }} />}
            <Button onPress={() => console.log(newMenu)} title='Consologear'></Button>
            <Button title='subir' onPress={() => handleSubmitMenu()}></Button>
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