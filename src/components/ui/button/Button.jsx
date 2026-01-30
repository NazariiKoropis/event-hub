import styles from './Button.module.scss'
//lib
import clsx from 'clsx'

export default function Button({
  type = 'button',
  variant = 'primary',
  className,
  fullWidth = false,
  children,
  ...props
}) {
  const buttonStyle = clsx(
    styles.button,
    styles[`button--${variant}`],
    { [styles['button--fullWidth']]: fullWidth },
    className,
  )
  return (
    <button type={type} className={buttonStyle} {...props}>
      {children}
    </button>
  )
}
