import styles from './Backdrop.module.scss'

export default function Backdrop({ isOpen, onClick }) {
  return (
    <div
      className={`${styles.backdrop} ${isOpen ? styles['backdrop--active'] : ''}`}
      onClick={onClick}
    />
  )
}
