import { Image, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ok_logo from '../images/active_logo.png'
import no_logo from '../images/inactive_logo.png'

type CardProps = {
    name: string,
    description: string,
    image: string,
    price: number,
    category: string,
    active: boolean,
    _id: string,
    navigation: any
}

export default function Card({name, description, image, price, category, active, _id, navigation} : CardProps) {


    return (
        <TouchableOpacity style={styles.background} onPress={() => navigation.navigate(_id)}>
            <View style={styles.text_wrapper}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <View style={styles.info_wrapper}>
                    <Text style={styles.price}>${price}</Text>
                    <Text style={styles.category}>{category[0]?.toUpperCase() + category?.slice(1)}</Text>
                    {active 
                    ? <Image source={ok_logo} style={{width: 30, height: 30, backgroundColor: '#0a6', borderRadius: 20}}/>
                    : <Image source={no_logo} style={{width: 30, height: 30, backgroundColor: '#a06', borderRadius: 20}}/>}
                </View>
            </View>
            <Image source={{uri: image}} style={styles.image}></Image>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 80,
        width: 120
    },
    background: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#aaa',
        height: 180
    },
    text_wrapper: {
        width: 240,
        justifyContent: 'space-around',
        flexDirection: "column",
        height: '100%'
    },
    name: {
        fontSize: 20,
        color: '#222',
        fontWeight: '700'
    },
    description: {
        fontSize: 15,
        color: '#555'
    },
    info_wrapper: {
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    price: {
        fontSize: 18,
        color: '#222',
        fontWeight: '600'
    },
    category: {
        fontSize: 16,
        color: '#fff',
        backgroundColor: '#a00',
        paddingHorizontal: 10,
        borderRadius: 5,
        textAlign: "center",
        padding: 3,
        fontStyle: 'italic'
    },
    active: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: '#0d0',
        paddingHorizontal: 3,
        borderRadius: 5
    },
    inactive: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: '#d00',
        paddingHorizontal: 3,
        borderRadius: 5
    }
})