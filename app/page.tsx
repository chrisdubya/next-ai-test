'use client'

import { useEffect, useRef } from 'react'
import { useChat } from 'ai/react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (container) container.scrollTop = container.scrollHeight
  }, [messages])

  return (
    <main className="flex min-h-screen flex-col justify-center p-24 gap-4">
      <h1 className="text-4xl font-bold text-center">Next Chat</h1>

      <div ref={containerRef} className='flex flex-col gap-4 max-h-[300px] overflow-scroll'>
        {messages.map(m => (
          <div key={m.id} className={`flex flex-row max-w-[70%] ${m.role === 'assistant' ? 'self-start text-left' : 'self-end text-right' }`}>
            <span className={`${m.role === 'assistant' ? 'text-green-700' : 'text-blue-700'} font-bold mr-1`}>
              {m.role}:
            </span>
            {m.content}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
          <input
            className="border border-gray-400 rounded-lg p-2 text-black w-full"
            value={input}
            placeholder='say something...'
            onChange={handleInputChange}
          />
        </form>
    </main>
  )
}
