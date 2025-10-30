import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { CONTENT } from './content/data';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';
const QUESTIONS_COUNT = 10;
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
export default function App() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);
    // Wallet disabled for now
    // Each time 'round' increments, we pick a fresh random set
    const [round, setRound] = useState(0);
    const questions = useMemo(() => {
        return shuffle(CONTENT).slice(0, QUESTIONS_COUNT);
    }, [round]);
    useEffect(() => {
        if (current >= QUESTIONS_COUNT) {
            setDone(true);
        }
    }, [current]);
    const handleAnswer = (guess) => {
        if (done)
            return;
        const item = questions[current];
        const correct = guess !== 'timeout' && item.origin === guess;
        if (correct)
            setScore((s) => s + 10);
        setCurrent((i) => i + 1);
    };
    const baseScore = score;
    const finalScore = baseScore;
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx("header", { className: "border-b border-slate-200 sticky top-0 backdrop-blur bg-white/80", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4 py-4 flex items-center justify-between", children: [_jsx("h1", { className: "text-lg sm:text-xl font-bold", children: "Proof of Human" }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs("div", { className: "text-sm text-slate-800 font-semibold", children: ["Score: ", finalScore] }) })] }) }), _jsx("main", { className: "max-w-3xl mx-auto px-4 py-8", children: !done ? (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-sm text-slate-700 font-medium", children: ["Question ", Math.min(current + 1, QUESTIONS_COUNT), " / ", QUESTIONS_COUNT] }), current < QUESTIONS_COUNT && (_jsx(QuestionCard, { item: questions[current], seconds: 10, onAnswer: handleAnswer }, questions[current].id))] })) : (_jsx(ResultScreen, { finalScore: finalScore, onRestart: () => {
                        // simple restart: new round triggers new random questions
                        setRound((r) => r + 1);
                        setCurrent(0);
                        setScore(0);
                        setDone(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } })) })] }));
}
