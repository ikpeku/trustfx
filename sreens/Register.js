import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';
import { ROOT_URL } from '../constant/URL';
import useStore from '../store/store';

const RegisterScreen = ({ navigation }) => {

  const { handleLogin: setLogin } = useStore((state) => state)

  const [showPassword, setShowPassword] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userName, setUserName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const [email, setEmail] = useState({
    email: "",
    error: false
  })
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")



  const handleRegisterUser = async () => {
    setError("")
    setIsLoading(v => !v)
    if (!password && !email.email && !firstName && !lastName && !userName && !phoneNumber || email.error) return

    try {
      const response = await axios.post(`${ROOT_URL}/auth/register`, {
        email: email.email,
        password,
        firstName,
        lastName,
        username: userName,
        phone: phoneNumber,
      })

      // console.log(response.data)

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
      console.log(error)
      setError(error.response.data.message)

    }

    setIsLoading(false)
  }



  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(text) === false) {
      setEmail({ email: text, error: true })
      return false;
    } else if (reg.test(text) === true) {
      setEmail({ email: text, error: false })
    }
  }

  // Navigate
  const handleNav = () => {
    navigation.goBack()
  }


  return (
    <SafeAreaView style={styles.logincontainer}>
      {isLoading && <View style={{ position: "absolute", zIndex: 100, width: "100%", height: "100%", flex: 1, justifyContent: "center", alignItems: "center", }}>
        <ActivityIndicator animating={true} size={100} color={"#000080"} />
      </View>}

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ flex: 1 }}>

          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%", marginVertical: 20 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold", fontFamily: "Nunito-Medium", color: "#350460", textAlign: "center" }}>Create New Account</Text>
          </View>


          <View style={{ flex: 1, width: "100%" }}>

            <View style={{ backgroundColor: "#350460", padding: 20, marginHorizontal: 20, borderRadius: 10 }}>
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "Nunito-Regular", }}>First Name</Text>
              <View style={{ backgroundColor: "#fff", borderRadius: 6, marginBottom: 10, flexDirection: "row", alignItems: "center" }}>
                <TextInput placeholder="John Doe" style={{ width: "100%", padding: 4 }} autoCorrect inputMode="text" value={firstName} onChangeText={(text) => setFirstName(text)} />
              </View>

              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "Nunito-Regular", }}>Last Name</Text>
              <View style={{ backgroundColor: "#fff", borderRadius: 6, marginBottom: 10, flexDirection: "row", alignItems: "center" }}>
                <TextInput placeholder="John Doe" style={{ width: "100%", padding: 4 }} autoCorrect inputMode="text" value={lastName} onChangeText={(text) => setLastName(text)} />
              </View>

              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "Nunito-Regular", }}>User Name</Text>
              <View style={{ backgroundColor: "#fff", borderRadius: 6, marginBottom: 10, flexDirection: "row", alignItems: "center" }}>
                <TextInput placeholder="John Doe" style={{ width: "100%", padding: 4 }} autoCorrect inputMode="text" value={userName} onChangeText={(text) => setUserName(text)} />
              </View>

              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "Nunito-Regular", }}>Phone Number</Text>
              <View style={{ backgroundColor: "#fff", borderRadius: 6, marginBottom: 10, flexDirection: "row", alignItems: "center" }}>
                <TextInput placeholder="John Doe" style={{ width: "100%", padding: 4 }} autoCorrect keyboardType='numeric' inputMode="numeric" value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} />
              </View>

              {/* Email start */}
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "Nunito-Regular", }}>Email</Text>
              <View style={[{ backgroundColor: "#fff", borderRadius: 6, marginBottom: 10 }, email.error ? { borderWidth: 2, borderColor: "#ff0000" } : {}]}>
                <TextInput placeholder="example.com" style={[{ width: "100%", padding: 4 }]} autoCorrect inputMode="email" keyboardType="email-address" value={email.email} onChangeText={(text) => validate(text)} />
              </View>

              {/* Password start */}
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", fontFamily: "Nunito-Regular", }}>Password</Text>
              <View style={{ backgroundColor: "#fff", borderRadius: 6, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <TextInput placeholder="*********" style={{ width: "85%", padding: 4 }} secureTextEntry={showPassword} value={password} onChangeText={(text) => setPassword(text)} />
                <FontAwesome name="eye" size={24} color="#350460" onPress={() => setShowPassword((pass) => !pass)} />
              </View>


              <TouchableOpacity activeOpacity={0.6} style={{ marginVertical: 5, padding: 10, backgroundColor: "#fff", borderRadius: 5 }} onPress={handleRegisterUser}>
                <Text style={{ textAlign: "center", color: "#350460", fontSize: 20, fontWeight: "bold", fontFamily: "Nunito-Medium", }}>Create Account</Text>
              </TouchableOpacity>

              {error && <Text style={{ color: "red" }}>{error}</Text>}
            </View>
          </View>


          <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "center", width: "100%", marginTop: 30 }}>
            <Text style={{ fontSize: 15, fontFamily: "Nunito-Regular", }}>Already have an account? </Text>
            <TouchableOpacity activeOpacity={0.6} onPress={handleNav}>
              <Text style={{ fontSize: 15, fontFamily: "Nunito-Regular", color: "#350460", fontWeight: "bold" }}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>



      </ScrollView>
    </SafeAreaView >
  )
}

export default RegisterScreen


const styles = StyleSheet.create({
  logincontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
