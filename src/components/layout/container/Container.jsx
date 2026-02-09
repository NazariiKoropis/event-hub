//styles
import styles from './Container.module.scss'

//clsx
import clsx from 'clsx'

export default function Container({ className, children }) {
  const containerStyle = clsx(styles.Container, className)
  return <div className={containerStyle}>{children}</div>
}
