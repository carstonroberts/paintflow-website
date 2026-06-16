import { appUrl } from '../lib/appLink'
import { trackTrialCheckout } from '../lib/metaPixel'

interface Props {
  className?: string
  label?: string
  plan?: 'monthly' | 'annual'
}

export default function GetStartedButton({ className = '', label = 'Get Started — $99/mo', plan = 'monthly' }: Props) {
  function handleClick() {
    trackTrialCheckout(plan)
    window.location.href = appUrl(`/checkout?plan=${plan}`)
  }

  return (
    <button onClick={handleClick} className={`cursor-pointer ${className}`}>
      {label}
    </button>
  )
}
