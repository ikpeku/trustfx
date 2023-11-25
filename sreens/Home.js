
import { StyleSheet } from "react-native"
import { Coinsection, Header } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";


const Home = ({ navigation }) => {


    return (
        <SafeAreaView style={styles.homeContainer}>
            <Header navigation={navigation} />
            <Coinsection navigation={navigation} />

        </SafeAreaView>
    )

}

export default Home


const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        // backgroundColor: "rgba(0, 0, 0, 0.9)"
    },
});
