import { ChangeEvent, FC, FormEvent, useState } from 'react'

import Input from 'components/common/Input'

type Props = { callback: (name: string, date: Date) => Promise<void> }

const AddCompetitionForm: FC<Props> = ({ callback }) => {
  const [name, setName] = useState('')
  const [date, setDate] = useState<Date | null>(null)

  const resetForm = () => {
    setName('')
    setDate(null)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!name || !date) return

    callback(name, date)
    resetForm()
  }

  const onNameChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setName(target.value)
  const onDateChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setDate(target.valueAsDate)

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" label="Name" onChange={onNameChange} required />
      <Input type="date" label="Date" onChange={onDateChange} required />
      <button type="submit">CREATE COMPETITION</button>
    </form>
  )
}

export default AddCompetitionForm
