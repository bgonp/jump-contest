import { CrossIcon, MinusIcon, TickIcon } from 'components/common/icons'
import { FC } from 'react'

type Props = { attempts: boolean[] | null }

const Attempts: FC<Props> = ({ attempts }) => {
  if (attempts === null) return <MinusIcon />

  return <>
    {attempts.map((attempt, index) => attempt
      ? <TickIcon key={index} />
      : <CrossIcon key={index} />
    )}
  </>
}

export default Attempts
