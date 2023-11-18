import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Plans } from '../components'



const CryptoList = ({ navigation, route }) => {
  const [text, setText] = React.useState('')

  // console.log("Deposit : ",route.params.deposit)

  return (
    <SafeAreaView style={styles.cryptoContainer}>

      {/* <View style={styles.inputContainer}>
        <Ionicons name="search" size={20} color="#C6C6C6" />
        <TextInput
          style={styles.input}
          onChangeText={(e) => setText(e)}
          value={text}
          placeholder="Search"
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        {route.params?.deposit === undefined && <Text style={styles.title}>Choose Asset</Text>}
        {route.params?.deposit && <Text style={styles.title}>Choose Asset to buy</Text>}
        {route.params?.deposit === false && }
      </View>

      <View>
        <Crypto textInput={text} navigation={navigation} discover={route.params?.deposit} />
      </View> */}


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

  // input: {
  //   width: "100%",
  //   paddingHorizontal: 4,

  // },

  // inputContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   borderWidth: 1,
  //   paddingHorizontal: 4,
  //   paddingVertical: 4,
  //   marginVertical: 10,
  //   borderColor: "#C6C6C6",
  //   borderRadius: 10

  // },
  title: {
    // fontFamily: "Nunito-Black",
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center"

  }
})

export default CryptoList
