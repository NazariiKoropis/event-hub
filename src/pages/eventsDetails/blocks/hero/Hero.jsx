//styles
import styles from './Hero.module.scss'

//components
import Container from './../../../../components/layout/container/Container'

//react
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'

//utilies
import { getEventImage } from './../../../../utils/imageUtil'
import placeholder from './../../../../assets/events/placeholder.png'

export default function Hero({ event }) {
  if (!event) return null

  const date = new Date(event.date).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const imageSrc = getEventImage(event.slug) || placeholder

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${imageSrc})`,
      }}
    >
      <Container>
        <div className={styles.content}>
          <span className={styles.category}>{event.category}</span>

          <h1 className={styles.title}>{event.title}</h1>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <FaCalendarAlt className={styles.icon} />
              <span>{date}</span>
            </div>

            <div className={styles.metaItem}>
              <FaMapMarkerAlt className={styles.icon} />
              <span>
                {event.cityName}, {event.location?.address}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
