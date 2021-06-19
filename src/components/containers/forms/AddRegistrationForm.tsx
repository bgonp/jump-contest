import { ChangeEvent, FC, FormEvent, useState } from 'react'

import Input from 'components/common/Input'
import { useCompetitionContext } from 'contexts/CompetitionContext'

type Callback = ReturnType<typeof useCompetitionContext>['addRegistration']

const AddRegistrationForm: FC<{ callback: Callback }> = ({ callback }) => {
  const [clubId, setClubId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [email, setEmail] = useState('')

  const resetForm = () => {
    setClubId(null)
    setName('')
    setSurname('')
    setBirthDate(null)
    setEmail('')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!name || !surname) return

    callback(name, surname, clubId, birthDate, email)
    resetForm()
  }

  const onClubIdChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setClubId(target.valueAsNumber)
  const onNameChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setName(target.value)
  const onSurnameChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setSurname(target.value)
  const onBirthDateChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setBirthDate(target.valueAsDate)
  const onEmailChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setEmail(target.value)

  return (
    <form onSubmit={handleSubmit}>
      <Input type="number" label="Club ID" onChange={onClubIdChange} />
      <Input type="text" label="Name" onChange={onNameChange} required />
      <Input type="text" label="Surname" onChange={onSurnameChange} required />
      <Input type="date" label="Date of birth" onChange={onBirthDateChange} />
      <Input type="email" label="E-mail" onChange={onEmailChange} />
      <button type="submit">CREATE REGISTRATION</button>
    </form>
  )
}

export default AddRegistrationForm
