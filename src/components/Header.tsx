import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import logo from '../images/create_logo.png'

export default function Header({navigation} : {navigation: any}) {

    return (
        <View style={styles.background}>
            <TouchableOpacity onPress={() => navigation.navigate('CreateForm')} style={styles.button}>
                <Image source={logo} style={styles.image}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,
        margin: 5,
        backgroundColor: '#c00',
        borderRadius: 30,
        marginRight: 20
    },
    button: {
        alignItems: 'flex-end'
    },
    background: {
        backgroundColor: '#900'
    }
})