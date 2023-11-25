
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList, Pressable } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';
import { getAllSinglePaymentProof } from '../constant/Request';
import useStore from '../store/store';

const TxnHistory = ({ navigation }) => {
  const [trnHistory, setTransaction] = useState([])
  const [loading, setLoading] = useState(false)
  const { _id: userId } = useStore((state) => state.initialData)
  const [selected, setSelected] = useState("all")


  const transactionData = trnHistory.filter(v => {
    switch (selected) {
      case 'all':
        return v
      case 'buy':
      case 'sell':
      case 'transfer':
      case 'investment':
      case 'swap':
      case 'reversal':
        return v.proofType === selected
      default:
        return v

    }

  })



  useEffect(() => {
    (async () => {
      setLoading(v => !v)


      try {
        const res = await getAllSinglePaymentProof(userId)

        // console.log(res.data)


        setTransaction(res?.data?.data)

      } catch (error) {
        // console.log("error: ", error.request)
      }
      setLoading(v => !v)
    })()


  }, [])

  const data = [

    {
      id: 0,
      title: "All",
      color: "green",
      type: "all"
    },
    {
      id: 1,
      title: "BUY",
      color: "green",
      type: "buy"
    },
    {
      id: 2,
      title: "SELL",
      color: "red",
      type: "sell"
    },
    {
      id: 3,
      title: "Transfer",
      color: "red",
      type: "transfer"
    },
    {
      id: 4,
      title: "INVEST",
      color: "green",
      type: "investment"
    },
    {
      id: 5,
      title: "SWAP",
      color: "red",
      type: "swap"
    },
    {
      id: 6,
      title: "REVERSAL",
      color: "red",
      type: "reversal"
    },

  ]



  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={'large'} color="#3376bc" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f1f2f7" }}>
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          // pagingEnabled
          ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Pressable style={{ borderRadius: 10, backgroundColor: "#fff", padding: 10, width: 120 }} onPress={() => setSelected(item.type)} >
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                  {/* <View style={{ backgroundColor: `${item.color}`, width: 20, aspectRatio: 1, borderRadius: 25, justifyContent: "center", alignItems: "center", }}>
                    <Foundation name="dollar" size={20} color="white" />
                  </View> */}

                  <Text variant="titleSmall" style={{ paddingLeft: 5 }}>{item.title}</Text>
                </View>
              </Pressable>
            )
          }}
        />
      </View>

      <FlatList
        data={transactionData.slice().reverse()}
        renderItem={({ item }) => {

          return (
            <Pressable onPress={() => navigation.navigate("TransactionDetail", { title: item.proofType, proofId: item._id })} style={{ backgroundColor: "#fff", marginVertical: 5, flexDirection: "row", alignItems: "center" }}>

              {item.proofType === "investment" && <MaterialIcons name="call-received" size={24} color="green" />}
              {item.proofType === "sell" && <MaterialCommunityIcons name="call-made" size={24} color="red" />}
              {item.proofType === "transfer" && <MaterialCommunityIcons name="call-made" size={24} color="red" />}
              {item.proofType === "swap" && <MaterialCommunityIcons name="call-made" size={24} color="green" />}
              {item.proofType === "reversal" && <MaterialCommunityIcons name="call-made" size={24} color="green" />}


              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginLeft: 2 }}>

                <View>
                  <Text style={{ padding: 5, color: "#3376bc", fontWeight: "bold", fontSize: 16 }}>{item.proofType}</Text>
                  <View style={{ flexDirection: "row" }}>
                    {item.proofType === "investment" &&
                      <Text style={{ padding: 5, color: "green" }}>+ ${item?.amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>

                    }

                    {item.proofType === "sell" &&
                      <Text style={{ padding: 5, color: "red" }}>- ${item?.sell?.amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>

                    }
                    {item.proofType === "transfer" &&
                      <Text style={{ padding: 5, color: "red" }}>- ${item?.transfer?.amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>

                    }
                    {item.proofType === "swap" &&
                      <Text style={{ padding: 5, color: "green" }}>+ ${item?.swap?.amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>

                    }
                    {item.proofType === "reversal" &&
                      <Text style={{ padding: 5, color: "green" }}>+ ${item?.reversal?.amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>

                    }


                  </View>

                </View>


                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ padding: 5, color: "#3376bc" }}>{moment(item.updatedAt).fromNow()}</Text>

                  <Text style={[{ padding: 5 }, item.status === "pending" ? { color: "#f29339" } : { color: "green" }]}>{item.status}</Text>
                </View>


              </View>


            </Pressable>
          )
        }}
        estimatedItemSize={20}
        // keyExtractor={item => item.id}
        ListEmptyComponent={() => <Text style={styles.noTxn}>No transaction</Text>}
      />

      {/* } */}

    </View>
  )
}

export default TxnHistory

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#FAF9F6"
  },
  noTxn: {
    textAlign: "center",
    padding: 5
  }
})
