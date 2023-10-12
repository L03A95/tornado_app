import { StyleSheet, Text, View } from "react-native";
import Card from "./Card";



export default function Home ({navigation} : {navigation: any}) : JSX.Element {

    return (
        <View style={styles.background}>
            <Card name="Mojarrita Frita" description="La mejor de la isla, especialidad de la casa" price={3000} image="https://boquisabroso.com.co/wp-content/uploads/2023/03/Receta-de-Mojarra-Frita.jpeg" category="entrada" active={true} navigation={navigation} _id='asdad'></Card>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fff0f0',
        flex: 1
    }
})