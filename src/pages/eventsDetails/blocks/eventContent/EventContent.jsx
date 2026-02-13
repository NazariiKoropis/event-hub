import styles from './EventContent.module.scss'

// components
import Container from '../../../../components/layout/container/Container'
import EventMap from '../eventMap/EventMap'

// react
import { useState, useEffect } from 'react'

// services
import { getOrgNameById } from '../../../../services/ogr.service'

export default function EventContent({ event }) {
  const [orgName, setOrgName] = useState(null)

  useEffect(() => {
    const fetchOrgName = async () => {
      if (!event.organizerId) return
      const data = await getOrgNameById(event.organizerId)
      setOrgName(data)
    }
    fetchOrgName()
  }, [event.organizerId])

  return (
    <section className={styles.section}>
      <Container>
        <ul className={styles.infoGrid}>
          <li className={`${styles.card} ${styles.fullWidth}`}>
            <strong>Про подію</strong>
            {event.description}
          </li>

          <li className={styles.card}>
            <strong>Організатор</strong>
            <span className={styles.organizerName}>
              {orgName ? orgName : 'Завантаження...'}
            </span>
          </li>

          <li className={styles.card}>
            <strong>Доступні квитки</strong>

            {event.totalTickets > 0 ? (
              <span>{event.totalTickets} шт.</span>
            ) : (
              <span style={{ color: 'red' }}>Sold Out</span>
            )}
          </li>
        </ul>
        <EventMap location={event.location} />
      </Container>
    </section>
  )
}
