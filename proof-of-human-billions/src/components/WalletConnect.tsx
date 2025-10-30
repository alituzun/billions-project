type Props = {
  connected: boolean
  onToggle: (connected: boolean) => void
}

export default function WalletConnect({ connected, onToggle }: Props) {
  return (
    <button
      className={
        'btn ' + (connected ? 'btn-secondary' : 'btn-primary')
      }
      onClick={() => onToggle(!connected)}
    >
      {connected ? 'Disconnect Wallet' : 'Connect Wallet'}
    </button>
  )
}
