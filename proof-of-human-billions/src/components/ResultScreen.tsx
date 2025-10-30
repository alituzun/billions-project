type Props = {
  finalScore: number
  onRestart: () => void
  bonusApplied?: boolean
}

export default function ResultScreen({ finalScore, onRestart }: Props) {
  return (
    <div className="card">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-slate-900">Your Result</h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-white border border-slate-300">
          <div className="text-sm text-slate-700 font-medium">Final Score</div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{finalScore}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="btn btn-secondary" onClick={onRestart}>Play Again</button>
      </div>
    </div>
  )
}
