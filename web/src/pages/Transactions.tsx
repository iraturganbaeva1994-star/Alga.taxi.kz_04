import React, { useEffect, useState } from 'react'

export default function Transactions(){
  const [rows, setRows] = useState<any[]>([])

  useEffect(()=>{
    fetch('/api/admin/transactions/user/demo-user')
      .then(r=>r.json())
      .then(setRows)
  },[])

  return (
    <div style={{padding:20}}>
      <h2>Ledger / Transactions (demo)</h2>
      <table>
        <thead><tr><th>id</th><th>type</th><th>amount</th><th>when</th></tr></thead>
        <tbody>
          {rows.map(r=> (
            <tr key={r.id}><td>{r.id}</td><td>{r.type}</td><td>{r.amount_cents}</td><td>{r.created_at}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
