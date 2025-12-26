import React, {useEffect, useState} from 'react'

export default function Settings(){
  const [settings,setSettings] = useState<any>({})
  const [loading,setLoading] = useState(true)
  const [userRole,setUserRole] = useState<'admin'|'dispatcher'|'anonymous'>('anonymous')

  useEffect(()=>{
    // fetch current user role from /api/users/me
    fetch('/api/users/me', { headers: { authorization: (localStorage.getItem('token')||'') } })
      .then(r=> r.ok ? r.json() : null)
      .then(u=>{ if(u) setUserRole(u.role); })

    fetch('/api/admin/settings')
      .then(r=>r.json())
      .then(s=>{ setSettings(s); setLoading(false)})
  },[])

  const save = async ()=>{
    if (userRole !== 'admin') { alert('Only admin can edit settings'); return }
    await fetch('/api/admin/settings', { method: 'PATCH', headers: {'Content-Type':'application/json','authorization': (localStorage.getItem('token')||'')}, body: JSON.stringify(settings) })
    alert('Saved')
  }

  if(loading) return <div>Loading...</div>
  return (
    <div style={{padding:20}}>
      <h2>Settings</h2>
      <div>
        <label>Contact number: <input value={settings.contact_number||''} onChange={e=>setSettings({...settings, contact_number: e.target.value})} disabled={userRole!=='admin'} /></label>
      </div>
      <div>
        <label>Logo URL: <input value={settings.logo_url||''} onChange={e=>setSettings({...settings, logo_url: e.target.value})} disabled={userRole!=='admin'} /></label>
      </div>
      <div>
        <label>Show phone numbers: <input type="checkbox" checked={settings.show_phone_numbers?.enabled} onChange={e=>setSettings({...settings, show_phone_numbers: { enabled: e.target.checked }})} disabled={userRole==='dispatcher'} /></label>
      </div>
      <button onClick={save}>Save</button>
      <div style={{marginTop:12}}>Current role: {userRole}</div>
    </div>
  )
}
