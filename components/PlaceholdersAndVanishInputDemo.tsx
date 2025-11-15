"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState } from "react";

export function PlaceholdersAndVanishInputDemo() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const placeholders = [
    "What services do you offer?",
    "How much does a website cost?",
    "Can you help with my e-commerce site?",
    "What technologies do you use?",
    "How long does a project take?",
    "Do you offer ongoing support?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input') as HTMLInputElement;
    const message = input?.value;

    if (!message) return;

    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.message);
      input.value = '';
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto flex flex-col justify-center items-center px-4 py-10">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Have questions about our services?
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      {loading && (
        <p className="mt-6 text-gray-500 text-center animate-pulse">Thinking...</p>
      )}
      {response && (
        <div className="mt-8 max-w-2xl bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
          <p className="text-gray-800 text-lg leading-relaxed">{response}</p>
          <button
            onClick={() => setResponse(null)}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Ask another question
          </button>
        </div>
      )}
    </div>
  );
}
