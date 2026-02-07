//styles
import styles from './LoginForm.module.scss'
//components
import Button from './../ui/button/Button'
import Input from './../ui/input/Input'

//react
import { useState } from 'react'

//services
import { loginUser } from '../../services/auth.service'

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //login state
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (errors.email) setErrors({ ...errors, email: '' })
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (errors.password) setErrors({ ...errors, password: '' })
  }

  const validateLocal = () => {
    const newErrors = {}
    if (!email) newErrors.email = 'Введіть email'
    if (!password) newErrors.password = 'Введіть пароль'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateLocal()) return
    setIsLoading(true)
    setErrors({})

    const { user, error } = await loginUser(email, password)

    setIsLoading(false)
    if (error) {
      setErrors({ form: error })
    } else {
      console.log('Logged in user:', user)
      if (onLoginSuccess) onLoginSuccess(user)
    }
  }

  const handleTest = () => {
    setEmail('admin@gmail.com')
    setPassword('admin1')
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Увійти до облікового запису</h2>

      {errors.form && <div className={styles.globalError}>{errors.form}</div>}
      <Input
        type="email"
        name="email"
        label="Email"
        value={email}
        onChange={handleEmailChange}
        required
        disabled={isLoading}
        error={errors.email}
      />

      <Input
        type="password"
        name="password"
        label="Пароль"
        value={password}
        required
        onChange={handlePasswordChange}
        disabled={isLoading}
        error={errors.password}
      />

      <Button onClick={handleTest}>Test</Button>

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? 'Вхід...' : 'Увійти'}
      </Button>
    </form>
  )
}
