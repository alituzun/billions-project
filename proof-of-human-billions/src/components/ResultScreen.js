import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function ResultScreen({ finalScore, onRestart }) {
    return (_jsxs("div", { className: "card", children: [
            _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold mb-4 text-slate-900", children: "Your Result" }),
            _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-1 gap-4 mb-6", children: _jsxs("div", { className: "p-4 rounded-lg bg-white border border-slate-300", children: [
                        _jsx("div", { className: "text-sm text-slate-700 font-medium", children: "Final Score" }),
                        _jsx("div", { className: "text-3xl font-extrabold text-slate-900 tracking-tight", children: finalScore })
                    ] }) }),
            _jsx("div", { className: "flex flex-col sm:flex-row gap-3", children: _jsx("button", { className: "btn btn-secondary", onClick: onRestart, children: "Play Again" }) })
        ] }));
}
