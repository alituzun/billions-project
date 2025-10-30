import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
export default function QuestionCard({ item, seconds = 10, onAnswer, }) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const timerRef = useRef(null);
    useEffect(() => {
        setTimeLeft(seconds);
        if (timerRef.current)
            window.clearInterval(timerRef.current);
        timerRef.current = window.setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    if (timerRef.current)
                        window.clearInterval(timerRef.current);
                    onAnswer('timeout');
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => {
            if (timerRef.current)
                window.clearInterval(timerRef.current);
        };
    }, [item.id, seconds, onAnswer]);
    const progress = Math.max(0, (timeLeft / seconds) * 100);
    return (_jsxs("div", { className: "card p-8", children: [_jsxs("div", { className: "mb-5", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: "text-sm text-slate-700 font-medium", children: "Time left" }), _jsxs("div", { className: "font-mono text-slate-900", children: [timeLeft, "s"] })] }), _jsx("div", { className: "w-full h-3 bg-slate-200 rounded", children: _jsx("div", { className: "h-3 rounded transition-all bg-brand", style: { width: `${progress}%` } }) })] }), _jsx("div", { className: "min-h-[340px] sm:min-h-[420px] flex items-center justify-center overflow-hidden rounded-xl bg-white border border-slate-300 shadow-2xl", children: item.type === 'text' ? (_jsx("p", { className: "text-2xl sm:text-3xl leading-relaxed p-8 text-center max-w-3xl whitespace-pre-wrap tracking-tight text-slate-900 font-semibold antialiased", children: item.content })) : (
                // eslint-disable-next-line @next/next/no-img-element
                _jsx("img", { src: item.content, alt: "prompt", className: "w-full max-h-[520px] sm:max-h-[640px] object-contain rounded-lg" })) }), _jsxs("div", { className: "mt-8 grid grid-cols-2 gap-4", children: [_jsx("button", { className: "btn btn-secondary py-3 text-lg", onClick: () => onAnswer('human'), children: "Human" }), _jsx("button", { className: "btn btn-primary py-3 text-lg", onClick: () => onAnswer('ai'), children: "AI" })] })] }));
}
