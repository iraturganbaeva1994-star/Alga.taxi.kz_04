import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Reports(){
  const { t } = useTranslation()
  const [dateFrom,setDateFrom] = useState('')
  const [dateTo,setDateTo] = useState('')
  const [data,setData] = useState<any[]>([])
  const [limit,setLimit] = useState(50)

  async function fetchJson(){
    const params: any = { limit: String(limit) }
    if (dateFrom) params.date_from = dateFrom
    if (dateTo) params.date_to = dateTo
    const res = await fetch('/api/admin/reports/orders?'+new URLSearchParams(params))
    const json = await res.json()
    setData(json.data || [])
  }

  async function exportCsv(){
    const params: any = { limit: String(limit), export: 'csv' }
    if (dateFrom) params.date_from = dateFrom
    if (dateTo) params.date_to = dateTo
    const res = await fetch('/api/admin/reports/orders?'+new URLSearchParams(params))
    const json = await res.json()
    const csv = json.csv || ''
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'orders_report.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h2>{t('reports.title','Reports')}</h2>
      <div style={{marginBottom:8}}>
        <label>{t('reports.date_from','Date from')}: <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} /></label>
        <label style={{marginLeft:8}}>{t('reports.date_to','Date to')}: <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} /></label>
        <button onClick={fetchJson} style={{marginLeft:8}}>Fetch</button>
        <button onClick={exportCsv} style={{marginLeft:8}}>Export CSV</button>
      </div>
      <table border={1} cellPadding={4} style={{width:'100%'}}>
        <thead>
          <tr>
            <th>order_id</th>
            <th>client_phone</th>
            <th>service_type</th>
            <th>payment_type</th>
            <th>created_at</th>
            <th>accepted_at</th>
            <th>cancelled_at</th>
            <th>completed_at</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r:any)=> (
            <tr key={r.order_id}>
              <td>{r.order_id}</td>
              <td>{r.client_phone}</td>
              <td>{r.service_type}</td>
              <td>{r.payment_type}</td>
              <td>{r.created_at}</td>
              <td>{r.accepted_at}</td>
              <td>{r.cancelled_at}</td>
              <td>{r.completed_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
