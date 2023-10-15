import { View, TextInput, Text, } from 'react-native'
import { Picker } from "@react-native-picker/picker";



export default function CreateForm() {

    return (
        <View>
            <TextInput placeholder='Nombre del plato'></TextInput>
            <TextInput placeholder='Descripción'></TextInput>

            <TextInput placeholder='Precio' keyboardType="numeric"></TextInput>
            <Picker>
                <Picker.Item label="Entrada" value='entrada'/>
                <Picker.Item label="Parrilla" value='parrilla'/>
                <Picker.Item label="Cafetería" value='cafetería'/>
                <Picker.Item label="Dulces" value='dulces'/>
                <Picker.Item label="Bebidas" value='Bebidas'/>
            </Picker>
        </View>
    )
}