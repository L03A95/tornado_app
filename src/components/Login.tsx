import { ScrollView, StyleSheet, Text, TextInput, View, Image } from "react-native";
import logo from '../images/tornado_logo.png'



export default function Login () : JSX.Element {
    return (
        <View style={styles.background}>
            <View style={styles.logo_container}>
                <Text style={styles.logo_title}>PARRILLA</Text>
                <Image source={logo} style={styles.logo}/>
                <Text style={styles.logo_title}>TORNADO</Text>
            </View>
            <Text style={styles.title}>Iniciar sesión</Text>
            <TextInput style={styles.input} placeholder="Usuario"></TextInput>
            <TextInput style={styles.input} placeholder="Contraseña"></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        flex: 1
    },
    input: {
        backgroundColor: '#c00',
        margin: 10,
        width: 360,
        borderRadius: 5,
        color: '#fff'
    },
    title: {
        fontSize: 18
    },
    logo:{
        width: 200,
        height: 175,
        margin: 40
    },
    logo_title: {
        fontFamily: 'Lora-VariableFont_wght',
        fontSize: 32,
    },
    logo_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 70
    }
})