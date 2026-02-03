//styles
import styles from './Modal.module.scss'
//components
import Backdrop from '../backdrop/Backdrop'
//icons
import CloseIcon from '../../layout/icons/CloseIcon'
//react
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const modal = (
    <>
      <Backdrop isOpen={isOpen} onClick={onClose} />

      <div className={styles.modalOverlay}>
        <div className={styles.modalWindow} role="dialog" aria-modal="true">
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.closeButton} onClick={onClose}>
              <CloseIcon />
            </button>
          </div>

          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  )

  return createPortal(modal, document.body)
}
