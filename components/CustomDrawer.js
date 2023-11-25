import { useContext, useEffect, useState } from 'react';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'

import { View, Text, TouchableOpacity, ImageBackground, Image, Share, Alert, Pressable } from 'react-native'
import { FontAwesome5, Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { auth, db, SignnedOut } from '../firebase/firebaseConfig';
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';

import * as MailComposer from 'expo-mail-composer';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import useStore from '../store/store';




const CustomDrawer = (props) => {
  const { reset, initialData } = useStore((state) => state)



  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Deposit your token with coinbasePro`,
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
      // Alert.alert(error.message)
    }
  }








  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      const avatar = result.assets[0].uri

      const userRef = doc(db, "users", auth.currentUser?.uid)

      try {

        const response = await fetch(avatar);
        const blobFile = await response.blob();
        const avatarFile = `${auth.currentUser?.displayName}-avatar`
        const reference = ref(getStorage(), avatarFile)

        await uploadBytesResumable(reference, blobFile)

        const downloadURL = await getDownloadURL(reference);


        await updateProfile(auth.currentUser, { photoURL: downloadURL })
        await updateDoc(userRef, { avatar: downloadURL })


      } catch (error) {

      }


    } else {
      // Alert.alert("Avatar",'You did not select any avatar.');
    }
  };




  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#350460" }}>
        <ImageBackground
          source={require('../assets/trustfxlogo.jpg')}
          style={{ padding: 20 }}
        >
          <View style={{ marginBottom: 25, height: 60, flex: 1, }}>
            <Image
              // source={auth.currentUser?.photoURL === null ? require('../assets/account_circle.png') : { uri: auth.currentUser?.photoURL }}
              source={require('../assets/account_circle.png')}
              style={{ marginLeft: 15, borderRadius: 40, height: 60, width: 60, tintColor: "#fff" }} />


            <Pressable onPress={() => pickImageAsync()}>
              <Text style={{ color: "#fff" }}>Change Avatar</Text>
            </Pressable>
          </View>



          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20, fontFamily: 'Nunito-Medium' }}>{initialData?.userName}</Text>

            <MaterialIcons name="verified-user" size={15} color="#fff" style={{ marginLeft: 7 }} />

          </View>
        </ImageBackground>

        <View style={{ flex: 1, paddingTop: 10, backgroundColor: "#fff" }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{ borderTopColor: "ccc", borderTopWidth: 1, padding: 20 }}>

        <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }} onPress={() => MailComposer.composeAsync({
          recipients: ["contact@trustFx.com"]

        })}>
          <Ionicons name="mail" size={24} color="#350460" />
          <Text style={{ marginLeft: 5, fontWeight: "bold", fontSize: 15, fontFamily: 'Nunito-Medium', color: "#350460" }}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }} onPress={() => onShare()}>
          <AntDesign name="sharealt" size={24} color="#350460" />
          <Text style={{ marginLeft: 5, fontWeight: "bold", fontSize: 15, fontFamily: 'Nunito-Medium', color: "#350460" }}>Tell a friend</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: "row", alignItems: "center" }} onPress={() => reset()}>
          <Ionicons name="exit-outline" size={24} color="#350460" />
          <Text style={{ marginLeft: 5, fontWeight: "bold", fontSize: 15, fontFamily: 'Nunito-Medium', color: "#350460" }}>Logout</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

export default CustomDrawer
