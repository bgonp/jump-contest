import { FC } from 'react'

type Props = {
  title: string
  subtitle?: string
}

const Title: FC<Props> = ({ title, subtitle }) => (
  <div className="title">
    <h2>{title}</h2>
    {subtitle && <h3>{subtitle}</h3>}
  </div>
)

export default Title
