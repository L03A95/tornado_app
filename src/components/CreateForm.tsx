import { View, TextInput, Text, Button, Image } from 'react-native'
import { Picker } from "@react-native-picker/picker";
import { useState } from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { UploadApiOptions, upload } from 'cloudinary-react-native';
import {Cloudinary, } from '@cloudinary/url-gen';

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

        launchImageLibrary({mediaType: 'photo', maxWidth: 400, maxHeight: 400 }, (response) => {
            if (!response.didCancel && response.assets) {
              setNewMenu({ ...newMenu, image: response.assets[0].uri ? response.assets[0].uri : 'undefined' });
            }
          });
    }

    const handleSubmitMenu = async () => {
        const cld = new Cloudinary({
            cloud: {
              cloudName: 'dlaqpndlk'
            },
            url: {
              secure: true
            }
          });
    
          const options: UploadApiOptions = {
            upload_preset: 'sample_preset',
            unsigned: true,
          }

        await upload(cld, {file: newMenu.image , options: options, callback: (error: any, response: any) => {
            //.. handle response
            try {
                console.log('Se logro ' + response.url)
            } catch (err) {
                console.log(error)
            }
        }})
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