import React, {useState} from 'react'
import { useTranslation } from 'react-i18next'
import Transactions from './pages/Transactions'
import PhoneVisibility from './pages/PhoneVisibility'

export default function App(){
  const { t } = useTranslation()
  const [page,setPage] = useState('home')
  return (
    <div style={{padding:20}}>
      <h1>{t('app.title', 'Alga Dispatcher')}</h1>
      <nav style={{marginBottom:12}}>
        <button onClick={()=>setPage('home')}>Home</button>
        <button onClick={()=>setPage('transactions')}>Transactions</button>
        <button onClick={()=>setPage('settings')}>Settings</button>
        <button onClick={()=>setPage('phone-visibility')}>Phone Visibility</button>
      </nav>
      {page === 'home' && <p>{t('app.welcome', 'Welcome to dispatcher panel (scaffold)')}</p>}
      {page === 'transactions' && <Transactions/>}
      {page === 'settings' && <Settings/>}
      {page === 'phone-visibility' && <PhoneVisibility/>}
    </div>
  )
}
