// import React, { useEffect, useState } from 'react'

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native'
// import { images } from '../constant/CoinIcon'
import { Button } from 'react-native-paper'




// const Item = ({ item, onPress, backgroundColor, textColor, imgUrl }) => (

//   <TouchableOpacity
//     onPress={onPress}
//     style={[styles.item, { backgroundColor, borderRadius: 20, }]}
//   >
//     <View style={{ flexDirection: 'row', alignItems: "center", borderRadius: 10 }}>
//       <View>
//         <Image
//           style={styles.coinlogo}
//           source={{
//             uri: imgUrl,
//           }}
//         />
//       </View>

//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "85%" }}>
//         <Text style={[styles.title, { color: textColor, fontSize: 18, fontFamily: "Nunito-Black" }]}>{item.title}</Text>
//         <Text
//           style={[styles.title, { color: textColor, fontSize: 18, fontFamily: "Nunito-Black" }]}
//         >{`${item?.amt?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${item.id} `}</Text>
//       </View>
//     </View>
//   </TouchableOpacity>
// )

const Plans = ({ navigation }) => {


  const renderItem = () => {
    return (
      <View style={styles.card}>
        <View style={{ backgroundColor: "#350460", padding: 6, width: "20%", borderRadius: 20, marginVertical: 10, transform: [{ rotate: '-25deg' }], }}>
          <Text style={{ color: "#fff", textAlign: "center" }}>Popular</Text>
        </View>

        <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 15 }}>
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

        <Button onPress={() => navigation.navigate("Subsquire", { title: "subsquire" })} style={{ backgroundColor: "#350460", marginTop: 15 }} mode='contained'>Subsquire</Button>
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
