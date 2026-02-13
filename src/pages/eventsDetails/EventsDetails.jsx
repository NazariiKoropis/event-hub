//styles
import styles from './EventsDetails.module.scss'

//components
import Container from './../../components/layout/container/Container'
import Hero from './blocks/hero/Hero'
import EventContent from './blocks/eventContent/EventContent'
import BookingCard from './blocks/bookingCard/BookingCard'

//react
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

//services
import { getEventById } from '../../services/event.service'

export default function EventDetails() {
  const { id } = useParams()

  const [event, setEvent] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      const data = await getEventById(id)
      setEvent(data)
      setLoading(false)
    }

    fetchEvent()
  }, [id])

  if (loading) {
    return (
      <Container>
        <div className={styles.loading}>Завантаження...</div>
      </Container>
    )
  }

  if (!event) {
    return (
      <Container>
        <div className={styles.loading}>Подію не знайдено 😢</div>
      </Container>
    )
  }

  return (
    <main>
      <Hero event={event} />
      <Container>
        <div className={styles.grid}>
          <EventContent event={event} />
          <BookingCard event={event} />
        </div>
      </Container>
    </main>
  )
}
