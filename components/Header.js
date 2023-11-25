import { useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, FlatList, useWindowDimensions } from 'react-native'
import { Text } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import { getSingleUser } from '../constant/Request';
import useStore from '../store/store';
import axios from 'axios';



const Header = ({ navigation }) => {
  const { width } = useWindowDimensions()

  const { _id: userId } = useStore((state) => state.initialData)

  const [wallet, setWallet] = useState({
    balance: 0,
    interest: 0,
    investment: 0,
    total: 0
  })

  const [Bitcoin, setBitcoin] = useState(0)
  const [Ethereum, setEthereum] = useState(0)
  const [USDT, setUSDT] = useState(0)
  const [BNB, setBNB] = useState(0)


  useEffect(() => {
    (async () => {

      let btcdata = [];
      let ethdata = [];
      let usdtdata = [];
      let bnbdata = [];

      try {
        const res = await getSingleUser(userId)
        setWallet(res?.data?.data?.wallet)

        const token = await axios.get('https://api.coincap.io/v2/assets')
        const tokenRes = token.data.data


        if (tokenRes) {
          tokenRes.forEach(v => {

            if (v.name === "Bitcoin") {
              btcdata.push(v)
            }

            if (v.name === "Ethereum") {
              ethdata.push(v)
            }

            if (v.name === "Tether") {
              usdtdata.push(v)
            }

            if (v.name === "BNB") {
              bnbdata.push(v)
            }

          })
          setBitcoin(btcdata[0].priceUsd)
          setEthereum(ethdata[0].priceUsd)
          setUSDT(usdtdata[0].priceUsd)
          setBNB(bnbdata[0].priceUsd)
        }


      } catch (error) {
        // console.log("error: ", error.request)
      }
    })()

  }, [])



  const Data = [
    {
      id: 1,
      wallet: "BTC",
      name: "Bitcoin",
      cryptoValue: wallet.total && Bitcoin ? wallet.total / Bitcoin : 0
    },
    {
      id: 2,
      wallet: "ETH",
      name: "Etheruem",
      cryptoValue: wallet.total && Ethereum ? wallet.total / Ethereum : 0
    },
    {
      id: 3,
      wallet: "USDT",
      name: "Tether",
      cryptoValue: wallet.total && USDT ? wallet.total / USDT : 0
    },
    {
      id: 4,
      wallet: "BNB",
      name: "Binance Smart Chain",
      cryptoValue: wallet.total && BNB ? wallet.total / BNB : 0
    }
  ]

  return (
    <View style={styles.headerContainer}>

      <FlatList
        data={Data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
        renderItem={({ item }) => {
          return (
            <View style={[{ width: width - 30, aspectRatio: 5 / 3 }, styles.cardContainer]}>
              <Pressable style={styles.card} onPress={() => navigation.navigate("Walletdetail",
                { title: item.wallet, name: item.name, interest: wallet.interest, investment: wallet.investment, cryptoValue: item.cryptoValue, total: wallet.total })} >

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ backgroundColor: "#350460", width: 50, aspectRatio: 1, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                    <AntDesign name="wallet" size={24} color="white" style={{}} />
                  </View>

                  <View>
                    <Text variant='titleSmall' style={{ paddingLeft: 10 }}>Total Wallet Balance</Text>
                    <Text variant='titleMedium' style={{ paddingLeft: 10, color: "gray" }}>{item.name}</Text>
                  </View>

                  <Text variant='titleSmall' style={{ marginLeft: "auto" }}>${wallet.total}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text variant='headlineLarge' >${wallet.investment}</Text>
                  <View style={{ backgroundColor: "green", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 20, padding: 2, paddingHorizontal: 10, minWidth: 70 }}>
                    <Text variant='titleSmall' style={{ color: "#fff" }}>${wallet.interest}</Text>
                  </View>
                </View>

                <Text variant='titleMedium' style={{ color: "gray" }}>{item.cryptoValue} {item.wallet}</Text>

                <View style={{ flexDirection: "row", justifyContent: "center", }}>
                  <AntDesign name="down" size={24} color="black" />
                </View>


              </Pressable>
            </View>
          )
        }}
      />
    </View>
  )
}
export default Header

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: 'gainsboro',
    padding: 10
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10
  },
  card: {
    padding: 20
  }
})