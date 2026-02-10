//styles
import styles from './FeaturedEvents.module.scss'

//react
import { useState, useEffect } from 'react'

//components
import Container from '../../../../components/layout/container/Container'

//services
import { getAllEvents } from './../../../../services/event.service'

export default function FeaturedEvents() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getAllEvents()
      setEvents(data.slice(0, 3))
    }

    fetchEvents()
  }, [])
  return (
    <section>
      <Container>
        <h2>Рекомендовані події</h2>
      </Container>
    </section>
  )
}
