'use client';

export default function ChatError({ reset }: { reset: () => void }) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-[#f7f5ef] text-black p-8">
      <div className="bg-white border border-[#e5e0d8] rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
        <div className="text-4xl">🐱</div>
        <h1 className="font-bold text-base">Something went wrong</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Felix couldn&apos;t connect to the database. Check that{' '}
          <code className="bg-gray-100 px-1 rounded text-xs">DATABASE_URL</code>{' '}
          is set in your Vercel environment variables.
        </p>
        <button
          onClick={reset}
          className="bg-black text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
