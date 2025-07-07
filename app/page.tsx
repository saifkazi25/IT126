'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const questions = [
  "Where is your dream fantasy located?",
  "What are you wearing in this fantasy?",
  "What's your emotional vibe?",
  "Who or what is with you?",
  "What time of day is it?",
  "What supernatural element is present?",
  "What weapon or item do you carry?",
];

export default function Home() {
  const router = useRouter();
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [selfie, setSelfie] = useState<File | null>(null);

  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelfie(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selfie) return alert("Please upload a selfie!");

    const formData = new FormData();
    formData.append("selfie", selfie);
    formData.append("answers", JSON.stringify(answers));

    const response = await fetch('/api/generate', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    router.push(`/result?img=${encodeURIComponent(data.imageUrl)}`);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6">🌌 Infinite Tsukuyomi Quiz</h1>
      {questions.map((q, i) => (
        <div key={i} className="mb-4">
          <label className="block font-semibold mb-1">{q}</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            value={answers[i]}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        </div>
      ))}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Upload your selfie</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Generate My Fantasy
      </button>
    </main>
  );
}
