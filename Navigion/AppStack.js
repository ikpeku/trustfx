import React, { useEffect, useState } from 'react'


import { createDrawerNavigator } from '@react-navigation/drawer'
import { Feather, AntDesign, Entypo } from '@expo/vector-icons'
import {
  Admin,
  Chat,
  ChatList,
  DepositScreen,
  ProfileScreen,
  SettingScreen,
  SwapToken,
  TransactionDetail,
  User,
  WalletDetail
  // Home as HomeScreen,
  // CryptoList,
} from '../sreens'
import { CustomDrawer } from '../components'
import TapNavigtion from './TapNavigtion'
// import { auth, db } from '../firebase/firebaseConfig'


import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { doc, getDoc } from 'firebase/firestore'
// import { Text, View } from 'react-native'
// const StackAdminScreens = createNativeStackNavigator()
// const StackChat = createNativeStackNavigator()
const StackBase = createNativeStackNavigator()



// const StackAdminComponent = () => {
//   return (
//     <StackAdminScreens.Navigator>
//       <StackAdminScreens.Screen
//         name="userlist"
//         component={Admin}
//         options={{ headerShown: false }}
//       />
//       <StackAdminScreens.Screen
//         name="user"
//         component={User}
//       // options={({route}) => ({
//       //   title: `Deposit ${route.params?.title}`
//       // })}
//       />

//     </StackAdminScreens.Navigator>
//   )
// }


const StackBaseComponent = () => {
  return (
    <StackBase.Navigator screenOptions={{ headerShown: false }}>
      <StackBase.Screen
        name="base"
        component={TapNavigtion}

      />
      <StackBase.Screen
        name="Subsquire"
        component={DepositScreen}
        options={({ route }) => ({
          headerShown: true,
          title: `${route.params?.title}`,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 30,
            color: "#350460",
            fontFamily: 'Nunito-Bold',
            fontWeight: "bold"
          },
        })}
      />

      <StackBase.Screen
        name="Walletdetail"
        component={WalletDetail}
        options={({ route }) => ({
          headerShown: true,
          title: `${route.params?.title}`,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 30,
            color: "#350460",
            fontFamily: 'Nunito-Bold',
            fontWeight: "bold"
          },
        })}
      />

      <StackBase.Screen
        name="SWAP"
        component={SwapToken}
        options={({ route }) => ({
          headerShown: true,
          title: `Swap ${route.params?.title}`,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 30,
            color: "#350460",
            fontFamily: 'Nunito-Bold',
            fontWeight: "bold"
          },
        })}
      />

      <StackBase.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={({ route }) => ({
          headerShown: true,
          title: `${route.params?.title}`,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 30,
            color: "#350460",
            fontFamily: 'Nunito-Bold',
            fontWeight: "bold"
          },
        })}
      />

    </StackBase.Navigator>
  )
}



const Drawer = createDrawerNavigator()
const AppStack = () => {

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      // initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -20,
          fontFamily: 'Nunito-Medium',
          fontSize: 18,
        },
        drawerActiveBackgroundColor: "#350460",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#350460"
      }}
    >
      <Drawer.Screen
        name="Home1"
        component={StackBaseComponent}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),

        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="profile" size={24} color={color} />
          ),
        }}
      />


    </Drawer.Navigator>
  )
}

export default AppStack
