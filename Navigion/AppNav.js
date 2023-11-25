import { useCallback, useContext } from 'react'
import { StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AppStack from './AppStack'
import AuthStack from './AuthStack'
import { AuthContext } from '../context/AuthContext'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import useStore from '../store/store'

SplashScreen.preventAutoHideAsync()

const Component = () => {
  // const { isLoading, userToken } = useContext(AuthContext)
  const { isLoggedin } = useStore((state) => state.initialData)

  const [fontsLoaded] = useFonts({
    'Nunito-Black': require('../fonts/Nunito-Black.ttf'),
    'Nunito-Medium': require('../fonts/Nunito-Medium.ttf'),
    'Nunito-Regular': require('../fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('../fonts/Nunito-Bold.ttf'),

  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }





  // if (userToken) {
  //   return (
  //     <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
  //     <ActivityIndicator size={'large'}  color="#3376bc" />
  //     </View>
  //   )
  // }




  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>

      {
        isLoggedin ?
          <AppStack />
          :
          <AuthStack />
      }





      {/* <AuthStack /> */}
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

export default Component

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
