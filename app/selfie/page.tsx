'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SelfiePage() {
  const [selfieUrl, setSelfieUrl] = useState<string | null>(null);
  const [templateUrl, setTemplateUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelfieUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selfieUrl || !templateUrl) {
      alert('Please upload your selfie and complete the quiz first.');
      return;
    }

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_image: selfieUrl, template_image: templateUrl })
    });

    if (!res.ok) {
      console.error('Error:', await res.text());
      return;
    }

    const data = await res.json();
    router.push(`/result?image=${encodeURIComponent(data.image)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-4">
      <h1 className="text-3xl font-bold mb-4">Upload Your Selfie</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {selfieUrl && (
        <img
          src={selfieUrl}
          alt="Your Selfie"
          className="w-64 h-64 object-cover rounded-full mb-4"
        />
      )}

      {/* TEMP: Placeholder until quiz selects a template image */}
      <button
        onClick={() =>
          setTemplateUrl(
            'https://replicate.delivery/pbxt/YOUR_DEFAULT_TEMPLATE_IMAGE.png'
          )
        }
        className="mb-4 px-4 py-2 border"
      >
        Simulate Quiz → Set Fantasy Template
      </button>

      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        Generate
      </button>
    </div>
  );
}
