import { ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, StatusBar, ToastAndroid } from "react-native";
import logo from '../images/tornado_logo.png'
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react'
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



export default function Login ({navigation} : {navigation: any}) : JSX.Element {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleUserInput = (input : string, value: string) => {
        setUser({...user, [input]: value})
    }


    const loginHandler = () => {
        axios.post('https://tornado-api.vercel.app/verify', user)
        .then((res) => { navigation.navigate('Home')})
        .catch((err) => { ToastAndroid.show('Contraseña o usuario incorrecto', ToastAndroid.SHORT)})
    }

    return (
        <View style={styles.background}>
            <StatusBar backgroundColor={'#f00000'}></StatusBar>
        <LinearGradient colors={['#e00', '#900', '#100']} style={styles.linearGradient}>
            <View style={styles.logo_container}>
                <Text style={styles.logo_title}>PARRILLA</Text>
                <Image source={logo} style={styles.logo}/>
                <Text style={styles.logo_title}>TORNADO</Text>
            </View>
            <TextInput style={styles.input} placeholder="Usuario" onChangeText={(text) => handleUserInput('username', text)}></TextInput>
            <TextInput style={styles.input} placeholder="Contraseña" onChangeText={(text) => handleUserInput('password', text)}></TextInput>
            <TouchableOpacity style={styles.button} onPress={() => loginHandler()}>
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
      },
      button: {
        backgroundColor: '#f22',
        margin: 10,
        borderRadius: 5
      }
      })