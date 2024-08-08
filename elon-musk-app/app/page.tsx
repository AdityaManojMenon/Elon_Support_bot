import Image from 'next/image';

import ChatComponent from '@/components/chat_component';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <div className="bg-black p-6 w-full max-w-2xl rounded-md shadow-lg text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Welcome to Elon Musk Customer Support</h1>
          <Image src="/elon.jpeg" alt="Elon Musk" width={100} height={100} className="rounded-full" />
        </div>
        <p className="text-lg">
          Hello, this is your favorite entrepreneur. How can I help you achieve your goals today?
        </p>
        <div className="mt-6">
          <ChatComponent />
        </div>
      </div>
    </main>
  );
}
