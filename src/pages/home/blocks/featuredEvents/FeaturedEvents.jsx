//styles
import styles from './FeaturedEvents.module.scss'
// Swiper стилі
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
//react
import { useState, useEffect } from 'react'

//components
import Container from '../../../../components/layout/container/Container'
import EventCard from '../../../../components/events/eventCard/EventCard'

// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Swiper модулі (стрілочки, пагінація)
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

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
  if (events.length === 0) return null

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>Рекомендовані події</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className={styles.swiperContainer}
        >
          {events.map((event) => (
            <SwiperSlide key={event.id} className={styles.slide}>
              {/* Тут твоя картка події */}
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  )
}
