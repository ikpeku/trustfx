import React, { useEffect, useState } from 'react'
import { Alert, View, Text, SafeAreaView, TouchableOpacity, Share, Button, Pressable, Image } from 'react-native'
import { FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import QRCode from 'react-native-qrcode-svg';
import { ScrollView } from 'react-native-gesture-handler';
// import { uuidv4 } from '@firebase/util';
// import { doc, onSnapshot, Timestamp, updateDoc } from 'firebase/firestore';
// import { auth, db } from '../firebase/firebaseConfig';

import { ActivityIndicator, Card, RadioButton, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { setSubscription } from '../constant/Request';


import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../firebase/firebaseConfig';
import { uriToBlob } from '../components/uriToBlob';
import useStore from '../store/store';





const DepositScreen = ({ navigation, route }) => {
  db

  const { planId } = route.params


  const [copiedText, setCopiedText] = React.useState('');
  const { initialData } = useStore((state) => state)


  const [address, setAddress] = useState("BTC")
  const [showToken, setShowToken] = useState(false)
  const [account, setAccount] = useState("0x23fnmjjjsdksdfjkkfjsjcfsm45")

  // image picker
  const [passport, setPassport] = useState(null);
  const [textProof, setProof] = useState("")
  const [disabledBtn, setDisabledBtn] = useState(true)

  const [isLoading, setIsLoading] = useState(false)


  const WalletData = [
    {
      id: 1,
      account: "BTC",
      address: "0x23fnmjjjsdksdfjkkfjsjcfsm45"
    },
    {
      id: 2,
      account: "ETH",
      address: "0x23fnmjjjsdkrfdjkkfjsjcfsm45"
    },
    {
      id: 3,
      account: "USDT",
      address: "0x23fnmjjjsdksdkkkkfjsjcfsm45"
    },
    {
      id: 4,
      account: "BNB",
      address: "0x23fnmjjjsdkssdkkfjsjcfsm45"
    },
    {
      id: 5,
      account: "BUSD",
      address: "0x23fnmjjjsdksd23fjkkfjsjcfsm45"
    },
  ]


  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(account)
    fetchCopiedText()
  }



  const fetchCopiedText = async () => {
    await Clipboard.getStringAsync();
    setCopiedText("Address successfully copied.");
    setTimeout(() => {
      setCopiedText("");
    }, 3000);
  };

  // const copyToTokenClipboard = async () => {
  //   await Clipboard.setStringAsync(account)
  //   fetchCopiedToken()
  // }

  // const fetchCopiedToken = async () => {
  //   await Clipboard.getStringAsync();
  //   setCopiedToken("Token copied.");
  //   setTimeout(() => {
  //     setCopiedToken("");
  //   }, 3000);
  // };


  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${account}`,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert("failed", "failed to share file")
    }
  }

  // const generteToken = () => {
  //   if (amount.slice() === "") {
  //     setTokenStatus(true)

  //     return
  //   }
  //   setTokenStatus(false)

  //   setToken(uuidv4())
  // }

  // const verfyDeposit = async () => {
  //   if (amount.slice() === "") {
  //     // console.log("enter a valid amount");
  //     setVericationStatus("Enter a valid amount")
  //     return
  //   }

  //   if (amount.slice() !== "") {

  //     Alert.alert("Deposit status", "Deposit verification processing", [
  //       {
  //         text: "cancel",
  //         onPress: () => {
  //           setToken("")
  //           setAmount("")
  //         },
  //       },
  //       {
  //         text: "ok",
  //         onPress: () => {
  //           setToken("")
  //           setAmount("")
  //         },
  //       }
  //     ])

  //   }


  // }


  const pickPassport = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
      canceled: true
    });


    if (!result.canceled) {
      // const res = await uriToBlob(result.assets[0].uri)
      setPassport(result.assets[0].uri);
    }
  };



  const handleImagesSubmit = async () => {
    setIsLoading(v => !v)

    try {

      let avatarUrl = ""
      if (passport) {

        const blobFile = await uriToBlob(passport)

        const avatar = `${initialData.firstName}${initialData.lastname}`
        const reference = ref(getStorage(), avatar)
        await uploadBytesResumable(reference, blobFile)
        const downloadURL = await getDownloadURL(reference);
        //  console.log(downloadURL)
        //  form.append("avatar", downloadURL)
        avatarUrl = downloadURL

        // console.log(downloadURL)

      }

      // console.log({ userId: initialData._id, planId, proofImage: avatarUrl, textProof })

      await setSubscription({ userId: initialData._id, planId, proofImage: avatarUrl, textProof })
      navigation.goBack()

    } catch (error) {
      Alert.alert("error", error.response.data.message)

    }

    setIsLoading(v => !v)

  }


  useEffect(() => {
    const seleted = WalletData.filter(v => v.account === address)
    setAccount(seleted[0].address)
  }, [])


  useEffect(() => {

    if (passport) {
      setDisabledBtn(false)
    } else if (textProof) {
      setDisabledBtn(false)
    } else {
      setDisabledBtn(true)
    }

  }, [passport, textProof])



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
      {isLoading && <View style={{ position: "absolute", width: "100%", height: "100%", flex: 1, justifyContent: "center", alignItems: "center", zIndex: 100 }}>
        <ActivityIndicator animating={true} size={100} color={"#000080"} />
      </View>}

      <ScrollView>
        <View style={{ padding: 20, flex: 1 }}>


          <View style={{ position: "relative" }}>
            <Card style={{ padding: 10 }}>
              <Pressable onPress={() => setShowToken(V => !V)} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 20 }}>Choose a token <Text>({address})</Text></Text>
                <AntDesign name={showToken ? "caretup" : "caretdown"} size={24} color="black" />
              </Pressable>
            </Card>

            {showToken && <View style={{ width: "70%", backgroundColor: "#fff", marginLeft: "auto", position: "absolute", zIndex: 50, top: 25, right: 10 }}>
              <RadioButton.Group onValueChange={value => {
                setAddress(value)
                setShowToken(false)
              }} value={address}>
                {
                  WalletData.map(walletInfo => {
                    return (
                      <RadioButton.Item label={walletInfo.account} key={walletInfo.id} value={walletInfo.account} />
                    )
                  })
                }
              </RadioButton.Group>
            </View>}
          </View>


          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#fff", borderRadius: 8, padding: 8 }}>
              <QRCode
                size={200}
                // logoSize={40}
                value={account}
              />
              <Text style={{ textAlign: "center", }}>{account}</Text>
            </View>
          </View>


          <View style={{ paddingVertical: 25 }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Nunito-Regular',
                textAlign: 'center',
              }}
            >
              Send only {address} to this
              address.
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Nunito-Regular',
                textAlign: 'center',
              }}
            >
              Sending any other coins may result in permanent loss.
            </Text>
          </View>

          <View
            style={{
              paddingBottom: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="ios-share"
                size={24}
                color="#350460"
                onPress={onShare}
                style={{
                  backgroundColor: '#fff',
                  marginRight: 10,
                  borderRadius: 10,
                  padding: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              />
            </TouchableOpacity>


            <TouchableOpacity onPress={copyToClipboard}>
              <Ionicons
                name="copy"
                size={24}
                color="#350460"
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  padding: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              />
            </TouchableOpacity>


          </View>


          {copiedText && <View>
            <Text style={{
              fontWeight: 'bold',
              color: '#fff',
              fontFamily: 'Nunito-Medium',
              fontSize: 15,
              textAlign: "center",
              marginBottom: 8
            }}>{copiedText}</Text>
          </View>}


          <Text style={{
            color: '#fff',
            fontFamily: 'Nunito-Regular',
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
            Upload transaction proof(photo)
          </Text>


          {/* pick passport */}

          <View style={{ marginTop: 10, paddingTop: 10, borderWidth: 1, borderBottomWidth: 0, marginTop: 4, borderColor: "gray" }}>
            <Text style={{ fontSize: 20, fontFamily: "Nunito-Medium", color: "#fff", textAlign: "center", }}>Transaction Receipt</Text>
          </View>

          <TouchableOpacity onPress={pickPassport} style={{ borderColor: "gray", borderWidth: 1, borderTopWidth: 0, shadowColor: "gray", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 10 }}>
            <Text style={{ paddingVertical: 6, paddingHorizontal: 15, borderRadius: 10, backgroundColor: "#e9e9e9", color: "#350460", fontSize: 15 }}>Choose File</Text>
            <Text style={{ marginLeft: 10 }}>no file selected</Text>
          </TouchableOpacity>


          {passport && <Image source={{ uri: passport }} style={{ height: 200, margin: 5 }} />}


          <Text style={{ fontWeight: "bold", textAlign: "center", paddingVertical: 10, color: "#fff" }}>Or</Text>

          <Text style={{
            color: '#fff',
            fontFamily: 'Nunito-Regular',
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
            Upload transaction proof(text)
          </Text>

          <TextInput placeholder='upload payment proof' mode='outlined' onChangeText={(e) => setProof(e)} multiline numberOfLines={6} style={{ padding: 5 }}>

          </TextInput>


          <TouchableOpacity disabled={disabledBtn} onPress={handleImagesSubmit} style={{ backgroundColor: disabledBtn ? "gainsboro" : "#1a2036", padding: 15, marginVertical: 20 }}>
            <Text style={{ fontSize: 20, fontFamily: "Nunito-Medium", color: "#fff", textAlign: "center" }}>Submit documents</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DepositScreen
