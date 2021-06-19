import { ComponentProps, FC } from 'react'

type Props = {
  label: string
} & ComponentProps<'input'>

const Input: FC<Props> = ({ label, ...props }) => (
  <div>
    <label>
      <span>{label}</span>
      <input {...props} />
    </label>
  </div>
)

export default Input
