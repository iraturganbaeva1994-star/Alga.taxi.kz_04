import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function PhoneVisibility(){
  const { t } = useTranslation()
  const [enabled, setEnabled] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<'admin'|'dispatcher'|'anonymous'>('anonymous')

  useEffect(()=>{
    const token = localStorage.getItem('token') || ''
    fetch('/api/users/me', { headers: { Authorization: token ? `Bearer ${token}` : '' } })
      .then(r=> r.ok ? r.json() : null)
      .then(u=>{ if(u) setRole(u.role) })

    fetch('/api/admin/settings')
      .then(r=> r.json())
      .then(s=>{
        setEnabled(!!s.show_phone_numbers?.enabled)
        setLoading(false)
      })
  },[])

  const save = async ()=>{
    if (role !== 'admin') { alert(t('settings.only_admin_edit')); return }
    const token = localStorage.getItem('token') || ''
    await fetch('/api/admin/settings', { method: 'PATCH', headers: { 'Content-Type':'application/json', Authorization: token ? `Bearer ${token}` : '' }, body: JSON.stringify({ show_phone_numbers: { enabled } }) })
    alert(t('settings.save'))
  }

  if (loading) return <div>{t('app.loading','Loading...')}</div>

  return (
    <div style={{padding:20}}>
      <h2>{t('settings.show_phone_numbers')}</h2>
      <div style={{marginBottom:12}}>
        <label>
          <input type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)} disabled={role!=='admin'} />
          &nbsp;{enabled ? 'ON' : 'OFF'}
        </label>
      </div>
      <div>
        <button onClick={save} disabled={role!=='admin'}>{t('settings.save')}</button>
      </div>
      <div style={{marginTop:12}}>{role === 'dispatcher' ? t('settings.only_admin_edit') : null}</div>
    </div>
  )
}
