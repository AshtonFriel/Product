import { useEffect, useState } from 'react'
const API = 'http://localhost:8080/products'

export default function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const load = () => fetch(API).then(r => r.json()).then(setProducts)
  useEffect(() => { load() }, [])

  const create = async e => {
    e.preventDefault()
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (!res.ok) { setError('Name is required'); return }
    setError(''); setName(''); load()
  }

  return (
    <div>
      <h1>Products</h1>
      <form onSubmit={create}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Product name" />
        <button type="submit">Add</button>
      </form>
      {error && <p>{error}</p>}
      <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>
    </div>
  )
}