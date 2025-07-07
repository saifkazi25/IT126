'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ResultContent() {
  const params = useSearchParams();
  const image = params.get('img');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6">
      <h1 className="text-2xl font-bold mb-4">🌠 Your Fantasy Revealed</h1>
      {image ? (
        <img src={image} alt="AI Fantasy" className="max-w-full rounded" />
      ) : (
        <p>Loading your image...</p>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResultContent />
    </Suspense>
  );
}
