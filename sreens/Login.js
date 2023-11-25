import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome, } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

import axios from 'axios';
import { ROOT_URL } from '../constant/URL';
import useStore from '../store/store';



const Login = ({ navigation }) => {
  const { handleLogin: setLogin } = useStore((state) => state)

  const [email, setEmail] = useState({
    email: "",
    error: false
  })
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validate = (text) => {
    setError("")
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(text) === false) {
      setEmail({ email: text, error: true })
      return false;
    } else if (reg.test(text) === true) {
      setEmail({ email: text, error: false })
    }
  }


  const handleLogin = async () => {
    setError("")
    setIsLoading(v => !v)
    if (!password && !email.email || email.error) return

    try {
      const response = await axios.post(`${ROOT_URL}/auth/login`, { email: email.email, password })

      const data = {
        isLoggedin: response?.data?.status === "success" ? true : false,
        userToken: response?.data?.token,
        _id: response.data?.user?._id,
        email: response?.data?.user?.email,
        firstName: response?.data?.user?.firstName,
        lastname: response?.data?.user?.lastname,
        userName: response?.data?.user?.username,
        phone: response?.data?.user?.phone,
        role: response?.data?.user?.role,

      }

      await setLogin(data)

    } catch (error) {
      setError(error.response.data.message)
    }

    setIsLoading(false)
  }



  const [showPassword, setShowPassword] = useState(true)

  const handleNav = () => {
    navigation.navigate("Register")
  }




  return (
    <SafeAreaView style={styles.logincontainer}>
      {isLoading && <View style={{ position: "absolute", flex: 1, justifyContent: "center", alignItems: "center", zIndex: 100 }}>
        <ActivityIndicator animating={true} size={100} color={"#000080"} />
      </View>}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>

          <View style={{ flex: 1, alignItems: "center", marginVertical: 30 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold", fontFamily: "Nunito-Medium", color: "#350460" }}>Login</Text>
          </View>
          <View style={{ flex: 3, width: "100%", marginVertical: 50 }}>
            <View style={{ backgroundColor: "#350460", padding: 20, marginHorizontal: 20, borderRadius: 10 }}>
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "Nunito-Regular", }}>Email</Text>
              {/* <View style={{ backgroundColor: "#fff", borderRadius: 6, marginBottom: 10 }}> */}
              <View style={[{ backgroundColor: "#fff", borderRadius: 6, marginBottom: 10 }, email.error ? { borderWidth: 2, borderColor: "#ff0000" } : {}]}>
                <TextInput placeholder="example.com" style={{ width: "100%", padding: 4 }} autoCorrect inputMode="email" keyboardType="email-address" value={email.email} onChangeText={(text) => validate(text)} />
              </View>
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "Nunito-Regular", }}>Password</Text>
              <View style={{ backgroundColor: "#fff", borderRadius: 6, flexDirection: "row", alignItems: "center" }}>
                <TextInput placeholder="*********" style={{ width: "85%", padding: 4 }} secureTextEntry={showPassword} value={password} onChangeText={(text) => setPassword(text)} />
                <FontAwesome name="eye" size={24} color="#350460" onPress={() => setShowPassword((pass) => !pass)} />
              </View>

              <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => navigation.navigate("Reset")}>
                <Text style={{ textAlign: "right", color: "#fff", fontSize: 15, fontWeight: "bold", fontFamily: "Nunito-Regular", }}>Forgot password?</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={{ marginVertical: 5, padding: 10, backgroundColor: "#fff", borderRadius: 5 }} onPress={handleLogin}>
                <Text style={{ textAlign: "center", color: "#350460", fontSize: 20, fontWeight: "bold", fontFamily: "Nunito-Medium", }}>Log In</Text>
              </TouchableOpacity>

              {error && <Text style={{ color: "red" }}>{error}</Text>}

            </View>
          </View>


          <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "center", width: "100%", marginTop: 40 }}>
            <Text style={{ fontSize: 15, fontFamily: "Nunito-Regular", }}>Don't have an account? </Text>
            <TouchableOpacity activeOpacity={0.6} onPress={handleNav}>
              <Text style={{ fontSize: 15, fontFamily: "Nunito-Regular", color: "#350460", fontWeight: "bold" }}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView >
    </SafeAreaView >
  )
}

export default Login


const styles = StyleSheet.create({
  logincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10
  },
})
