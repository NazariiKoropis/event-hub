//styles
import styles from './EventCard.module.scss'

//react
import { NavLink } from 'react-router-dom'
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'

//utiles
import { getEventImage } from '../../../utils/imageUtil'
import placeholder from '../../../assets/events/placeholder.png'

export default function EventCard({ event }) {
  const date = new Date(event.date).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const imageSrc = getEventImage(event.slug) || placeholder

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={event.title} className={styles.image} />
        <span className={styles.category}>{event.category}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{event.title}</h3>

        <div className={styles.infoRow}>
          <FaCalendarAlt className={styles.icon} />
          <span>{date}</span>
        </div>

        <div className={styles.infoRow}>
          <FaMapMarkerAlt className={styles.icon} />
          <span>{event.cityName}</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{event.price} ₴</span>
          <NavLink to={`/events/${event.id}`} className={styles.button}>
            Детальніше
          </NavLink>
        </div>
      </div>
    </div>
  )
}
