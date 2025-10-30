import { useEffect, useMemo, useState } from 'react'
import { CONTENT, ContentItem } from './content/data'
import QuestionCard from './components/QuestionCard'
import ResultScreen from './components/ResultScreen'

const QUESTIONS_COUNT = 10

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function AppRoot() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  // Wallet disabled for now
  // Each time 'round' increments, we pick a fresh random set
  const [round, setRound] = useState(0)

  const questions: ContentItem[] = useMemo(() => {
    return shuffle(CONTENT).slice(0, QUESTIONS_COUNT)
  }, [round])

  useEffect(() => {
    if (current >= QUESTIONS_COUNT) {
      setDone(true)
    }
  }, [current])

  const handleAnswer = (guess: 'human' | 'ai' | 'timeout') => {
    if (done) return
    const item = questions[current]
    const correct = guess !== 'timeout' && item.origin === guess
    if (correct) setScore((s) => s + 10)
    setCurrent((i) => i + 1)
  }

  const baseScore = score
  const finalScore = baseScore

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 sticky top-0 backdrop-blur bg-white/80">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">Proof of Human</h1>
            <div className="text-xs sm:text-sm text-slate-600">
              created by
              {" "}
              <a
                href="https://x.com/0xMelkoreth"
                target="_blank"
                rel="noreferrer noopener"
                className="text-brand hover:text-brandDark font-semibold hover:underline"
              >
                Melkor.eth
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
              <div className="text-base text-slate-900 font-bold">Score: {finalScore}</div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {!done ? (
          <div className="space-y-6">
            <div className="text-base sm:text-lg text-slate-900 font-semibold">Question {Math.min(current + 1, QUESTIONS_COUNT)} / {QUESTIONS_COUNT}</div>
            {current < QUESTIONS_COUNT && (
              <QuestionCard key={questions[current].id} item={questions[current]} seconds={10} onAnswer={handleAnswer} />
            )}
          </div>
        ) : (
          <ResultScreen finalScore={finalScore} onRestart={() => {
            // simple restart: new round triggers new random questions
            setRound((r) => r + 1)
            setCurrent(0)
            setScore(0)
            setDone(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }} />
        )}
      </main>

      {/* Footer removed per request */}
    </div>
  )
}
