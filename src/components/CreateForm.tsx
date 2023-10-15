import { View, TextInput, Text, Button, Image } from 'react-native'
import { Picker } from "@react-native-picker/picker";
import { useState } from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


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

        launchImageLibrary({mediaType: 'photo', }, (response) => {
            if (!response.didCancel && response.assets) {
              setNewMenu({ ...newMenu, image: response.assets[0].uri ? response.assets[0].uri : 'undefined' });
            }
          });
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
        </View>
    )
}