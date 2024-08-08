'use client';

import { useChat, Message } from 'ai/react';
import { useState } from 'react';
import Image from 'next/image';

interface Rating {
  [key: string]: string;
}

interface Feedback {
  [key: string]: string;
}

export default function ChatComponent() {
  const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();
  const [ratings, setRatings] = useState<Rating>({});
  const [feedback, setFeedback] = useState<Feedback>({});
  const [feedbackInput, setFeedbackInput] = useState<string>('');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  const handleRating = (id: string, rating: string) => {
    setRatings((prevRatings) => ({ ...prevRatings, [id]: rating }));
  };

  const isElonResponseComplete = (index: number) => {
    return messages[index].role === 'assistant' && (index === messages.length - 1 || messages[index + 1].role !== 'assistant');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMessageId) {
      setFeedback((prevFeedback) => ({ ...prevFeedback, [selectedMessageId]: feedbackInput }));
      setFeedbackInput('');
      setSelectedMessageId(null);
    }
  };

  return (
    <div className="bg-black p-6 w-full max-w-2xl rounded-md shadow-lg text-white">
      {messages.map((message: Message, index: number) => (
        <div key={message.id} className="mt-4 flex flex-col">
          <div className="flex items-start">
            {message.role === 'assistant' ? (
              <>
                <Image src="/elon3.jpeg" alt="Elon Musk" width={40} height={60} className="rounded-full mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Elon Musk</h3>
                  {message.content.split('\n').map((block: string, blockIndex: number) => (
                    <p key={message.id + blockIndex}>{block || '\u00A0'}</p>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mr-3 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold">{message.role === 'user' ? 'U' : 'N/A'}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">User</h3>
                  {message.content.split('\n').map((block: string, blockIndex: number) => (
                    <p key={message.id + blockIndex}>{block || '\u00A0'}</p>
                  ))}
                </div>
              </>
            )}
          </div>
          {isElonResponseComplete(index) && (
            <div className="flex flex-col mt-2 space-y-2">
              <div className="flex space-x-2">
                <p>Feedback:</p>
                <button
                  onClick={() => handleRating(message.id, 'up')}
                  className={`px-3 py-1 rounded ${ratings[message.id] === 'up' ? 'bg-green-600' : 'bg-gray-600'}`}
                >
                  👍
                </button>
                <button
                  onClick={() => handleRating(message.id, 'down')}
                  className={`px-3 py-1 rounded ${ratings[message.id] === 'down' ? 'bg-red-600' : 'bg-gray-600'}`}
                >
                  👎
                </button>
              </div>
              <button
                onClick={() => setSelectedMessageId(message.id)}
                className="px-3 py-1 rounded bg-blue-600"
              >
                Leave Feedback
              </button>
              {selectedMessageId === message.id && (
                <form onSubmit={handleFeedbackSubmit} className="mt-2 flex flex-col space-y-2">
                  <textarea
                    placeholder="Type your feedback..."
                    className="w-full p-3 rounded-md text-black"
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                  />
                  <button type="submit" className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 transition">
                    Submit Feedback
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      ))}
      <form className="mt-6" onSubmit={handleSubmit}>
        <p className="text-lg font-semibold mb-2">Your Message</p>
        <textarea
          placeholder="Type your question..."
          className="w-full p-3 rounded-md text-black"
          value={input}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="w-full mt-3 p-3 bg-gray-600 rounded-md hover:bg-gray-700 transition"
          disabled={isLoading}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
