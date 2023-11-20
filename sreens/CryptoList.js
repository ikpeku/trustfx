import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Plans } from '../components'



const CryptoList = ({ navigation, route }) => {
  const [text, setText] = React.useState('')

  // console.log("Deposit : ",route.params.deposit)

  return (
    <SafeAreaView style={styles.cryptoContainer}>

      <Text style={styles.title}>Choose a plan that works best for your pocket.</Text>

      <View>
        <Plans textInput={text} navigation={navigation} discover={route.params?.deposit} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cryptoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    paddingBottom: 60,
  },
  title: {
    // fontFamily: "Nunito-Black",
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center"

  }
})

export default CryptoList
