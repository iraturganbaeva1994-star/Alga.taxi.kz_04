import React, {useState} from 'react'
import { View, Text, TextInput, Button, Linking } from 'react-native'

export default function RegisterScreen(){
  const [phone,setPhone] = useState('')
  const [channel,setChannel] = useState<'sms'|'whatsapp'|'both'>('sms')

  const requestCode = async ()=>{
    await fetch('http://localhost:3000/api/auth/request-code', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ phone, channel }) })
    alert('Code requested via ' + channel)
  }

  return (
    <View style={{padding:20}}>
      <Text>Enter phone:</Text>
      <TextInput value={phone} onChangeText={setPhone} style={{borderWidth:1,padding:8,marginVertical:8}} />
      <View style={{flexDirection:'row', marginBottom:8}}>
        <Button title="SMS" onPress={()=>setChannel('sms')} />
        <Button title="WhatsApp" onPress={()=>setChannel('whatsapp')} />
        <Button title="Both" onPress={()=>setChannel('both')} />
      </View>
      <Button title="Request code" onPress={requestCode} />
    </View>
  )
}
