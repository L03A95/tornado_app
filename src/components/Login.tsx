import { ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import logo from '../images/tornado_logo.png'
import LinearGradient from 'react-native-linear-gradient';

// Within your render function



export default function Login () : JSX.Element {
    return (
        <View style={styles.background}>
        <LinearGradient colors={['#e00', '#900', '#100']} style={styles.linearGradient}>
            <View style={styles.logo_container}>
                <Text style={styles.logo_title}>PARRILLA</Text>
                <Image source={logo} style={styles.logo}/>
                <Text style={styles.logo_title}>TORNADO</Text>
            </View>
            <TextInput style={styles.input} placeholder="Usuario"></TextInput>
            <TextInput style={styles.input} placeholder="Contraseña"></TextInput>
            <TouchableOpacity>
                <Text style={styles.buttonText}> Iniciar sesión </Text>
            </TouchableOpacity>
        </LinearGradient>
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
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,

      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      }
      })