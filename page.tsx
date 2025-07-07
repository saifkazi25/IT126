'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [form, setForm] = useState({
    q0: '', q1: '', q2: '', q3: '', q4: '', q5: '', q6: '',
  })
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData()
    Object.entries(form).forEach(([key, val]) => data.append(key, val))
    if (file) data.append('selfie', file)

    const res = await fetch('/api/generate', {
      method: 'POST',
      body: data,
    })

    const json = await res.json()
    if (json?.image) router.push(`/result?img=${encodeURIComponent(json.image)}`)
  }

  return (
    <main className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">🌌 Infinite Tsukuyomi Quiz</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        {['Your dream location?', 'Your outfit?', 'Your vibe?', 'Your companion?', 'Time of day?', 'Special power?', 'Weapon of choice?'].map((q, i) => (
          <input
            key={i}
            name={`q${i}`}
            placeholder={q}
            value={(form as any)[`q${i}`]}
            onChange={handleChange}
            className="border p-2"
            required
          />
        ))}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="border p-2"
        />

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">See Your Fantasy</button>
      </form>
    </main>
  )
}
