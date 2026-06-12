import { appUrl } from '../lib/appLink'

interface Props {
  className?: string
  label?: string
  plan?: 'monthly' | 'annual'
}

export default function GetStartedButton({ className = '', label = 'Get Started — $99/mo', plan = 'monthly' }: Props) {
  function handleClick() {
    window.location.href = appUrl(`/checkout?plan=${plan}`)
  }

  return (
    <button onClick={handleClick} className={`cursor-pointer ${className}`}>
      {label}
    </button>
  )
}
