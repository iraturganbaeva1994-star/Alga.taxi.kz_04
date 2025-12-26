import React, {useState} from 'react'
import { Text, View, Button, Linking } from 'react-native'
import './i18n'
import RegisterScreen from './screens/RegisterScreen'

export default function App(){
  const [page,setPage] = useState<'home'|'register'>('home')
  const contactNumber = '+77073705757'

  const callDispatcher = ()=>{
    Linking.openURL(`tel:${contactNumber}`)
  }

  const openWhatsApp = ()=>{
    Linking.openURL(`https://wa.me/${contactNumber.replace('+','')}`)
  }

  return (
    <View style={{flex:1}}>
      <View style={{padding:12}}>
        <Button title="Home" onPress={()=>setPage('home')} />
        <Button title="Register" onPress={()=>setPage('register')} />
      </View>
      {page === 'home' && (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text>Alga Mobile (scaffold)</Text>
          <Button title="Связаться с диспетчером (звонок)" onPress={callDispatcher} />
          <Button title="Связаться в WhatsApp" onPress={openWhatsApp} />
        </View>
      )}
      {page === 'register' && <RegisterScreen />}
    </View>
  )
}
