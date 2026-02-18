import styles from './Events.module.scss'

// components
import Button from '../../../../components/ui/button/Button'

// react
import { useState, useEffect } from 'react'

// services
import { getAllEvents, deleteEvent } from './../../../../services/event.service'

// utils
import { getEventImage } from '../../../../utils/imageUtil'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEvents = async () => {
    setLoading(true)
    const data = await getAllEvents()
    setEvents(data.reverse())
    setLoading(false)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleDelete = async (id, title) => {
    if (
      !confirm(
        `Ви точно хочете видалити подію "${title}"? Цю дію не можна скасувати.`,
      )
    )
      return

    const success = await deleteEvent(id)

    if (success) {
      setEvents((prev) => prev.filter((event) => event.id !== id))
      alert('Подію видалено.')
    } else {
      alert('Помилка при видаленні.')
    }
  }

  if (loading) return <p>Завантаження подій...</p>

  return (
    <div className={styles.list}>
      <h2>Управління подіями</h2>

      {events.length === 0 ? (
        <p className={styles.empty}>Подій немає.</p>
      ) : (
        events.map((event) => {
          const imageSrc = getEventImage(event.slug)
          const date = new Date(event.date).toLocaleDateString()

          return (
            <div key={event.id} className={styles.item}>
              <div className={styles.infoGroup}>
                <div
                  className={styles.miniImage}
                  style={{ backgroundImage: `url(${imageSrc})` }}
                ></div>

                <div className={styles.info}>
                  <strong>{event.title}</strong>
                  <div className={styles.meta}>
                    <span>📅 {date}</span>
                    <span>📍 {event.cityName}</span>
                    <span>💰 {event.price} грн</span>
                    <span>
                      🎟️ {event.soldTickets}/{event.totalTickets}
                    </span>
                  </div>
                  <small className={styles.id}>ID: {event.id}</small>
                </div>
              </div>

              <div className={styles.actions}>
                <Button
                  size="small"
                  variant="secondary"
                  onClick={() => handleDelete(event.id, event.title)}
                  style={{ borderColor: 'red', color: 'red' }}
                >
                  🗑️ Видалити
                </Button>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
