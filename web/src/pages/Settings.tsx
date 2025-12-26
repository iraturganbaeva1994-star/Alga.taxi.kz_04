import React, {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'

export default function Settings(){
  const { t } = useTranslation()
  const [settings,setSettings] = useState<any>({})
  const [loading,setLoading] = useState(true)
  const [userRole,setUserRole] = useState<'admin'|'dispatcher'|'anonymous'>('anonymous')

  useEffect(()=>{
    // fetch current user role from /api/users/me
    const token = localStorage.getItem('token') || ''
    fetch('/api/users/me', { headers: { Authorization: token ? `Bearer ${token}` : '' } })
      .then(r=> r.ok ? r.json() : null)
      .then(u=>{ if(u) setUserRole(u.role); })

    fetch('/api/admin/settings')
      .then(r=>r.json())
      .then(s=>{ setSettings(s); setLoading(false)})
  },[])

  const save = async ()=>{
    if (userRole !== 'admin') { alert(t('settings.only_admin_edit')); return }
    const token = localStorage.getItem('token') || ''
    await fetch('/api/admin/settings', { method: 'PATCH', headers: {'Content-Type':'application/json','Authorization': token ? `Bearer ${token}` : ''}, body: JSON.stringify(settings) })
    alert(t('settings.save'))
  }

  if(loading) return <div>{t('app.loading','Loading...')}</div>
  return (
    <div style={{padding:20}}>
      <h2>{t('settings.title')}</h2>
      <div>
        <label>{t('settings.contact_number')}: <input value={settings.contact_number||''} onChange={e=>setSettings({...settings, contact_number: e.target.value})} disabled={userRole!=='admin'} /></label>
      </div>
      <div>
        <label>{t('settings.logo_url')}: <input value={settings.logo_url||''} onChange={e=>setSettings({...settings, logo_url: e.target.value})} disabled={userRole!=='admin'} /></label>
      </div>
      <div>
        <label>{t('settings.show_phone_numbers')}: <input type="checkbox" checked={!!settings.show_phone_numbers?.enabled} onChange={e=>setSettings({...settings, show_phone_numbers: { enabled: e.target.checked }})} disabled={userRole!=='admin'} /></label>
      </div>
      <button onClick={save}>{t('settings.save')}</button>
      <div style={{marginTop:12}}>Current role: {userRole}</div>
    </div>
  )
}
