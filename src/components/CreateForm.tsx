import { View, TextInput, Text, Button, Image } from 'react-native'
import { Picker } from "@react-native-picker/picker";
import { useState } from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';



export default function CreateForm() {


    const [newMenu, setNewMenu] = useState({
        name: '',
        description: '',
        price: 0,
        image: '',
        category: 'entrada',
        active: true
    })

    const handleInputChange = (type : string , value : string | number) => {
        setNewMenu({...newMenu, [type]: value})
    }

    const handleImageChange = async () => {
        launchImageLibrary({ mediaType: 'photo', maxWidth: 400, maxHeight: 400 }, (response) => {
          if (!response.didCancel && response.assets) {
            const image = response.assets[0];
            
            const formData = new FormData();
            formData.append('image', {
              uri: image.uri,
              type: image.type,
              name: image.fileName,
            });
      
            // Realiza una solicitud POST al servidor Node.js para enviar la imagen
            axios.post('URL_DEL_SERVIDOR/upload', formData)
              .then((response) => {
                // En este punto, el servidor Node.js ya ha cargado la imagen en Cloudinary
                // y ha respondido con la URL de la imagen. Puedes acceder a la URL en response.data.
      
                const imageUrl = response.data;
                
                // Almacena la URL de la imagen en el estado local
                setNewMenu({ ...newMenu, image: imageUrl });
              })
              .catch((error) => {
                console.error('Error al cargar la imagen en el servidor', error);
              });
          }
        });
      };

    const handleSubmitMenu = async () => {

    



    }

    return (
        <View>
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