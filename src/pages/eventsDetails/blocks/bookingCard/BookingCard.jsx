//styles
import styles from './BookingCard.module.scss'

//components
import Button from '../../../../components/ui/button/Button'

//react
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from './../../../../context/AuthContext'

//services
import { createBooking } from './../../../../services/booking.service'

export default function BookingCard({ event }) {
  const { currentUser } = useAuth()
  const [count, setCount] = useState(1)
  const navigate = useNavigate()

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

  const handleOrder = async () => {
    if (!confirm('Ви справді бажаєте забронювати квитки?')) return

    const data = {
      eventId: event.id,
      eventTitle: event.title,
      purchaseDate: Date.now(),
      ticketCount: count,
      totalPrice: totalPrice,
      userId: currentUser.uid,
      status: 'active',
    }

    // Можна додати тут лоадер, якщо хочеш (setLoading(true))

    const bookingId = await createBooking(data)

    if (bookingId) {
      alert('Успішно! Квитки додано у ваш профіль.')

      navigate('/user-profile')
    } else {
      alert('Сталася помилка при бронюванні 😢 Спробуйте ще раз.')
    }
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

      {/* TODO: create modal with order*/}
      <Button fullWidth onClick={handleOrder} disabled={!currentUser}>
        Купити квиток
      </Button>
      {!currentUser && (
        <p className={styles.note}>
          Для покупки квитка необхідно зареєструватись.
        </p>
      )}
      <p className={styles.note}>*Комісія сервісу вже включена у вартість</p>
    </div>
  )
}
