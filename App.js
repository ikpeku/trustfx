// import 'react-native-gesture-handler'

import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { RootSiblingParent } from 'react-native-root-siblings'


import Component from './Navigion/AppNav'



export default function App() {


  return (
    <NavigationContainer>
      <Provider>
        <RootSiblingParent>
          <Component />
        </RootSiblingParent>
      </Provider>
    </NavigationContainer>
  )
}
