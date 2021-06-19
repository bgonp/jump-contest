import { FC } from 'react'

type Props = {
  href: string
}

const Link: FC<Props> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer">{children}</a>
)

export default Link
