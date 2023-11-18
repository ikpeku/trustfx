import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native'
import { images } from '../constant/CoinIcon'
import { auth, db } from '../firebase/firebaseConfig'
import { Button } from 'react-native-paper'


const {
  BTC,
  ETH,
  BNB,
  USDT,
  LTC,
} = images




const Item = ({ item, onPress, backgroundColor, textColor, imgUrl }) => (

  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor, borderRadius: 20, }]}
  >
    <View style={{ flexDirection: 'row', alignItems: "center", borderRadius: 10 }}>
      <View>
        <Image
          style={styles.coinlogo}
          source={{
            uri: imgUrl,
          }}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "85%" }}>
        <Text style={[styles.title, { color: textColor, fontSize: 18, fontFamily: "Nunito-Black" }]}>{item.title}</Text>
        <Text
          style={[styles.title, { color: textColor, fontSize: 18, fontFamily: "Nunito-Black" }]}
        >{`${item?.amt?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${item.id} `}</Text>
      </View>
    </View>
  </TouchableOpacity>
)

const Plans = ({ textInput, navigation, discover }) => {
  const [selectedId, setSelectedId] = useState()
  const [token, setToken] = useState(null)


  // const DATA = [
  //   {
  //     id: 'BTC',
  //     title: 'Bitcoin',
  //     amt: token?.BTC,
  //     img: BTC,
  //     address: "1GKpL6QtazVRdBTPeqeFqpZYif6a6Jfsku"
  //   },
  //   {
  //     id: 'ETH',
  //     title: 'Ethereum',
  //     amt: token?.ETH,
  //     img: ETH,
  //     address: "0x977be2b4dd4216fa4386a5d594676f3f5ba8b9d9"
  //   },
  //   {
  //     id: 'LTC',
  //     title: 'Litecoin',
  //     amt: token?.LTC,
  //     img: LTC,
  //     address: "LWPGCyu2oc7VV33X3zmth7XfNyzqk4dTBN"
  //   },

  //   {
  //     id: 'BNB',
  //     title: 'BNB Smart Chain',
  //     amt: token?.BNB,
  //     img: BNB,
  //     address: "LWPGCyu2oc7VV33X3zmth7XfNyzqk4dTBN"
  //   },
  //   {
  //     id: 'USDT',
  //     title: 'Tether',
  //     amt: token?.USDT,
  //     img: USDT,
  //     address: "TUPqzJLsE1ge3AMgGrZpubLD2cWX2Xqgu1"
  //   },

  // ]







  // const DataFilter = DATA.filter(data => {
  //   if (textInput) {
  //     const res = data.title.includes(textInput)
  //     return res
  //   } else {
  //     return true
  //   }

  // })


  // const renderItem = ({ item }) => {
  //   const backgroundColor = item.id !== selectedId ? '#3376bc' : '#3376bc'
  //   const color = item.id !== selectedId ? 'white' : 'black'

  //   const handleSelected = async () => {
  //     setSelectedId(item.id)

  //     if (discover === undefined) {


  //       try {
  //         const userRef = doc(db, "users", auth.currentUser.uid)
  //         navigation.navigate("Home")
  //         await updateDoc(userRef, {
  //           selectedCoin: {
  //             amount: item.amt,
  //             name: item.id,
  //             address: item.address,
  //             title: item.title

  //           }
  //         })

  //       } catch (error) {
  //         console.log(error)

  //       }

  //       return
  //     }


  //   }



  //   return (
  //     <Item
  //       item={item}
  //       onPress={handleSelected}
  //       backgroundColor={backgroundColor}
  //       textColor={color}
  //       imgUrl={item.img}
  //     />
  //   )
  // }




  const renderItem = () => {
    return (
      <View style={styles.card}>

        <View style={{ backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 15 }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>Welcome plan</Text>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center" }}>Welcome plan</Text>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center" }}>Welcome plan</Text>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center" }}>Welcome plan</Text>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center" }}>Welcome plan</Text>
        </View>

        <Button style={{ backgroundColor: "#350460", marginTop: 15 }} mode='contained'>Subsquire</Button>
      </View>
    )
  }



  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Array(5)}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id}
        // extraData={selectedId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.item}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   paddingBottom: 60
  // },
  item: {

    padding: 8,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Nunito-Black',
  },
  card: {
    padding: 12,
    backgroundColor: "#f2f2f2",
    marginBottom: 20,
    borderRadius: 10
  },
})

export default Plans
