import { ChangeEvent, FC, FormEvent, useState } from 'react'

import Input from 'components/common/Input'
import { useCompetitionContext } from 'contexts/CompetitionContext'

type Callback = ReturnType<typeof useCompetitionContext>['addHeight']

const AddHeightForm: FC<{ callback: Callback }> = ({ callback }) => {
  const [height, setHeight] = useState<number | null>(null)

  const resetForm = () => {
    setHeight(null)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!height) return

    callback(height)
    resetForm()
  }

  const onHeightChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setHeight(target.valueAsNumber)

  return (
    <form onSubmit={handleSubmit}>
      <Input type="number" label="Height (cm)" onChange={onHeightChange} required />
      <button type="submit">ADD HEIGHT</button>
    </form>
  )
}

export default AddHeightForm
