import { FC } from 'react'

type Props = {
  color?: string
}

const MinusIcon: FC<Props> = ({ color = '#cccccc' }) => (
  <svg
    className="icon iconMinus"
    height={124}
    viewBox="0 0 124 124"
    width={124}
  >
    <path
      // eslint-disable-next-line max-len
      d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
      fill={color}
    />
  </svg>
)

export default MinusIcon
