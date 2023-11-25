import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, TextInput, View, Text } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'
import { Plans } from '../components'

import { ActivityIndicator, SegmentedButtons } from 'react-native-paper';
import { MyPlanScreen } from '.';

import { getPlansByUserId, getPlansWithoutSubsriber } from '../constant/Request'
import useStore from '../store/store'


const CryptoList = ({ navigation }) => {

  const [value, setValue] = useState("new")

  const { initialData } = useStore((state) => state)

  const [loading, setLoading] = useState(false)
  const [plans, setPlans] = useState(null)

  useEffect(() => {
    (async () => {
      setLoading(v => !v)


      try {
        // const res = await getPlansWithoutSubsriber()
        const res = await getPlansByUserId(initialData._id)
        setPlans(res?.data?.data)

      } catch (error) {
        // console.log("error: ", error.request)
      }
      setLoading(v => !v)
    })()


  }, [])


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={'large'} color="#3376bc" />
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.cryptoContainer}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'plan',
            label: 'My Plan',
          },
          {
            value: 'new',
            label: 'Subsquire',
          },
        ]}
      />

      {value === "new" && <Text style={styles.title}>Choose a plan that works best for your pocket.</Text>}
      {value === "new" && <View style={{ marginVertical: 15 }}>
        <Plans plans={plans} navigation={navigation} />
      </View>}

      {value === "plan" && <MyPlanScreen />}


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cryptoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    paddingBottom: 60,

  },
  title: {
    // fontFamily: "Nunito-Black",
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center"

  }
})

export default CryptoList
