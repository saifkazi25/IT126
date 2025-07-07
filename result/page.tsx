'use client'

import { useSearchParams } from 'next/navigation'

export default function ResultPage() {
  const params = useSearchParams()
  const img = params.get('img')

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">✨ Your Fantasy Awaits</h1>
      {img ? <img src={img} alt="Generated Fantasy" className="max-w-full h-auto" /> : <p>Loading...</p>}
    </main>
  )
}
