//styles
import styles from './LoginForm.module.scss'
//components
import Button from './../ui/button/Button'
import Input from './../ui/input/Input'

//react
import { useState } from 'react'
export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (errors.email) setErrors({ ...errors, email: '' })
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (errors.password) setErrors({ ...errors, password: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = 'Введіть email'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Некоректний формат email'
    }

    if (!password) {
      newErrors.password = 'Введіть пароль'
    } else {
      if (password.length < 8) {
        newErrors.password = 'Мінімум 8 символів'
      } else if (!/\d/.test(password)) {
        newErrors.password = 'Пароль має містити хоча б одну цифру'
      } else if (!/[!@#$%^&*]/.test(password)) {
        newErrors.password = 'Додайте спецсимвол (!@#$%^&*)'
      }
    }
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    console.log('Форма успішно відправлена:', { email, password })
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Увійти до облікового запису</h2>

      <Input
        type="email"
        name="email"
        label="Email"
        value={email}
        onChange={handleEmailChange}
        required
        error={errors.email}
      />

      <Input
        type="password"
        name="password"
        label="Пароль"
        value={password}
        required
        onChange={handlePasswordChange}
        error={errors.password}
      />

      <Button type="submit" fullWidth>
        Увійти
      </Button>
    </form>
  )
}
