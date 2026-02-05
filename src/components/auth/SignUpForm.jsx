import styles from './LoginForm.module.scss' // Можна перевикористати стилі логіна
import Input from '../ui/input/Input'
import Button from '../ui/button/Button'
import { useState } from 'react'

export default function SignUpForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Реєстрація:', { name, email, password })
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <Input
        label="Ім'я"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        label="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        label="Пароль"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        label="Підтвердити пароль"
        name="confirmPass"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className={styles.actions}>
        <Button type="submit" fullWidth>
          Зареєструватися
        </Button>
      </div>
    </form>
  )
}
