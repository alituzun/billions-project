import { useCallback, useEffect, useRef, useState } from 'react'
import type { ContentItem } from '../content/data'

export default function QuestionCard({
  item,
  seconds = 10,
  onAnswer,
}: {
  item: ContentItem
  seconds?: number
  onAnswer: (guess: 'human' | 'ai' | 'timeout') => void
}) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    setTimeLeft(seconds)
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current)
          onAnswer('timeout')
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [item.id, seconds, onAnswer])

  // Keyboard shortcuts: H/1/ArrowLeft = Human, A/2/ArrowRight = AI
  const handleKey = useCallback((e: KeyboardEvent) => {
    const k = e.key.toLowerCase()
    if (['h', '1', 'arrowleft'].includes(k)) {
      e.preventDefault()
      onAnswer('human')
    } else if (['a', '2', 'arrowright'].includes(k)) {
      e.preventDefault()
      onAnswer('ai')
    }
  }, [onAnswer])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  const progress = Math.max(0, (timeLeft / seconds) * 100)

  return (
    <div className="card p-8">
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-slate-700 font-medium">Time left</div>
          <div className="font-mono text-slate-900">{timeLeft}s</div>
        </div>
        <div className="w-full h-3 bg-slate-200 rounded">
          <div
            className="h-3 rounded transition-all bg-brand"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="min-h-[340px] sm:min-h-[420px] flex items-center justify-center overflow-hidden rounded-xl bg-white border border-slate-300 shadow-2xl">
        {item.type === 'text' ? (
          <p className="text-2xl sm:text-3xl leading-relaxed p-8 text-center max-w-3xl whitespace-pre-wrap tracking-tight text-slate-900 font-semibold antialiased">
            {item.content}
          </p>
        ) : (
          <div className="w-full flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {!imgError ? (
              <img
                src={item.content}
                alt="prompt"
                className={`w-full max-h-[520px] sm:max-h-[640px] object-contain rounded-lg transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="text-center text-slate-500 p-8">
                Image unavailable
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <button className="btn btn-secondary py-3 text-lg" onClick={() => onAnswer('human')} aria-label="Answer Human" title="H / 1 / ←">Human</button>
        <button className="btn btn-primary py-3 text-lg" onClick={() => onAnswer('ai')} aria-label="Answer AI" title="A / 2 / →">AI</button>
      </div>
    </div>
  )
}
