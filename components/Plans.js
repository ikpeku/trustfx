// import React, { useEffect, useState } from 'react'

import { useEffect, useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'





const Plans = ({ navigation, plans }) => {



  const renderItem = (item) => {

    return (
      <View style={styles.card}>
        <View style={{ backgroundColor: "#350460", padding: 6, width: "20%", borderRadius: 20, marginVertical: 10, transform: [{ rotate: '-25deg' }], }}>
          <Text style={{ color: "#fff", textAlign: "center" }}>Popular</Text>
        </View>

        <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 15 }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>{item?.name}</Text>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center" }}>{item?.description}</Text>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center" }}>${item?.amount}</Text>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center" }}>{item?.interestPercentage.toFixed(2)}%</Text>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center" }}>{item?.duration} {item?.durationType}</Text>
        </View>

        <View style={{ backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center" }}>Interest:
            <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center" }}> ${item?.totalProfit.toFixed(3)}</Text>
          </Text>
        </View>

        <View style={{ backgroundColor: "#fff", padding: 5, borderRadius: 5, borderColor: "#e0e0e0", marginBottom: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center" }}>Total:
            <Text style={{ fontSize: 17, fontWeight: "600", textAlign: "center" }}> ${item?.total.toFixed(3)}</Text>
          </Text>
        </View>

        {item.subscribers[0].planStatus !== "active" &&
          <Button onPress={() => navigation.navigate("Subsquire", { title: item.name, planId: item._id })} style={{ backgroundColor: "#350460", marginTop: 15, color: "#fff" }} mode='contained'>Subsquire</Button>
        }
      </View>
    )
  }




  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={plans}
        renderItem={({ item }) => renderItem(item)}
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
