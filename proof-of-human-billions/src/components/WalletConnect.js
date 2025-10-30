import { jsx as _jsx } from "react/jsx-runtime";
export default function WalletConnect({ connected, onToggle }) {
    return (_jsx("button", { className: 'btn ' + (connected ? 'btn-secondary' : 'btn-primary'), onClick: () => onToggle(!connected), children: connected ? 'Disconnect Wallet' : 'Connect Wallet' }));
}
