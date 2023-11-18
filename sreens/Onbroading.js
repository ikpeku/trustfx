import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';


const Onbroading = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.onbrodingContainer}>

      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }} >
        <Image source={require("../assets/splash_screen.jpg")} resizeMode='center' />
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <View>
          <Text style={[styles.onbroadingtitle, { paddingRight: 15 }]}>
            TrustFx Wallet
          </Text>

        </View>


        <View style={{ paddingVertical: 10 }}>
          <Text style={[styles.onbroadingtitle, { fontSize: 20, fontWeight: "bold", }]}>Easy Way to <Ionicons name="ios-return-down-forward-outline" size={24} color="white" style={{ fontSize: 30 }} /></Text>
          <Text style={[styles.onbroadingtitle, { fontSize: 20 }]}>Invest in Crypto</Text>
          <Text style={[styles.onbroadingtitle, { fontSize: 15 }]}>All your crypto easily and fastest. A new way to  manage and trade in the market</Text>
        </View>

        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Login')} style={{
          width: "90%",
          borderRadius: 50,
          paddingVertical: 10,
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "auto"
        }} >
          <Text
            style={{
              color: '#350460',
              fontFamily: 'Nunito-Black',
              marginRight: 20
            }}
          >
            Get Started
          </Text>
          <AntDesign name="rightcircleo" size={24} color="#350460" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default Onbroading

const styles = StyleSheet.create({
  onbrodingContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#350460',
    paddingBottom: 25
  },
  onbroadingtitle: {
    color: '#fff',
    fontFamily: 'Nunito-Black',
    fontWeight: 'bold',
    fontSize: 40,

    // transform: [{ rotate: '-5deg' }],
  },

  onbroadingButton: {
    backgroundColor: '#267bb5',
    // flex: 1,
    // flexDirection: 'row',
    // width: "80%",
    // justifyContent: 'space-between',
    // padding: 8,
    borderRadius: 10,
    // alignItems: 'center',
  },
})
