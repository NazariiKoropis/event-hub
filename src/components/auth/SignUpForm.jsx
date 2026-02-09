import styles from './LoginForm.module.scss'
// components
import Input from '../ui/input/Input'
import Button from '../ui/button/Button'
// services
import { signUpUser } from '../../services/auth.service'
// react
import { useState } from 'react'

export default function SignUpForm({ onAuthSuccess }) {
  const [displayName, setDisplayName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const newErrors = {}

    if (!displayName.trim()) newErrors.displayName = 'Введіть превдонім'
    if (!firstName.trim()) newErrors.firstName = "Введіть ім'я"
    if (!lastName.trim()) newErrors.lastName = 'Введіть прізвище'
    if (!email) newErrors.email = 'Введіть email'

    if (!password) {
      newErrors.password = 'Введіть пароль'
    } else if (password.length < 6) {
      newErrors.password = 'Мінімум 6 символів'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Паролі не співпадають'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setIsLoading(true)
    setErrors({})

    const { user, error } = await signUpUser(
      email,
      password,
      displayName,
      firstName,
      lastName,
    )

    setIsLoading(false)

    if (error) {
      if (error.toLowerCase().includes('email')) {
        setErrors({ email: error })
      } else {
        setErrors({ form: error })
      }
    } else {
      if (onAuthSuccess) onAuthSuccess(user)
    }
  }

  const handleInputChange = (setter, fieldName) => (e) => {
    setter(e.target.value)
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }))
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      {errors.form && <div className={styles.globalError}>{errors.form}</div>}

      <Input
        label="Псевдонім"
        name="displayName"
        value={displayName}
        onChange={handleInputChange(setDisplayName, 'displayName')}
        error={errors.displayName}
        disabled={isLoading}
      />

      <Input
        label="Ім'я"
        name="firstName"
        value={firstName}
        onChange={handleInputChange(setFirstName, 'firstName')}
        error={errors.firstName}
        disabled={isLoading}
      />

      <Input
        label="Прізвище"
        name="lastName"
        value={lastName}
        onChange={handleInputChange(setLastName, 'lastName')}
        error={errors.lastName}
        disabled={isLoading}
      />

      <Input
        type="email"
        label="Email"
        name="email"
        value={email}
        onChange={handleInputChange(setEmail, 'email')}
        error={errors.email}
        disabled={isLoading}
      />

      <Input
        type="password"
        label="Пароль"
        name="password"
        value={password}
        onChange={handleInputChange(setPassword, 'password')}
        error={errors.password}
        disabled={isLoading}
      />

      <Input
        type="password"
        label="Підтвердити пароль"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleInputChange(setConfirmPassword, 'confirmPassword')}
        error={errors.confirmPassword}
        disabled={isLoading}
      />

      <div className={styles.actions}>
        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
        </Button>
      </div>
    </form>
  )
}
