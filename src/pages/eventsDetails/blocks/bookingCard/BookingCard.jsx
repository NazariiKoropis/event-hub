//styles
import styles from './BookingCard.module.scss'

//components
import Button from '../../../../components/ui/button/Button'

//react
import { useState } from 'react'

import { useAuth } from './../../../../context/AuthContext'

export default function BookingCard({ event }) {
  const { currentUser } = useAuth()
  const [count, setCount] = useState(1)

  const price = event.price

  const totalPrice = price * count

  const handleIncrement = () => {
    if (count < 10 && count < event.totalTickets) {
      setCount((prev) => prev + 1)
    }
  }

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prev) => prev - 1)
    }
  }

  const handleOrder = () => {
    alert(`Замовлено ${count} квитків на суму ${totalPrice} грн!`)
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Квитки</h3>

      <div className={styles.row}>
        <span className={styles.label}>Ціна</span>
        <span className={styles.value}>{price} ₴</span>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.counterWrapper}>
        <span className={styles.label}>Кількість</span>
        <div className={styles.counter}>
          <button
            className={styles.counterBtn}
            onClick={handleDecrement}
            disabled={count <= 1}
          >
            -
          </button>
          <span className={styles.countDisplay}>{count}</span>
          <button
            className={styles.counterBtn}
            onClick={handleIncrement}
            disabled={count >= 10 || count >= event.totalTickets}
          >
            +
          </button>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.totalRow}>
        <span>Всього:</span>
        <span className={styles.totalPrice}>{totalPrice} ₴</span>
      </div>

      <Button fullWidth onClick={handleOrder} disabled={!currentUser}>
        Купити квиток
      </Button>

      <p className={styles.note}>*Комісія сервісу вже включена у вартість</p>
    </div>
  )
}
