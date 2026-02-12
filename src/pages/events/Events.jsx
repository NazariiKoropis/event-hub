//styles
import styles from './Events.module.scss'
// components
import Container from '../../components/layout/container/Container'
import EventCard from './../../components/events/eventCard/EventCard'
import Input from './../../components/ui/input/Input'
//react
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
//services
import { getAllEvents } from './../../services/event.service'

const CATEGORIES = [
  { id: 'all', label: 'Всі' },
  { id: 'Music', label: 'Музика' },
  { id: 'IT', label: 'IT' },
  { id: 'Business', label: 'Бізнес' },
  { id: 'Art', label: 'Мистецтво' },
  { id: 'Sport', label: 'Спорт' },
  { id: 'Workshops', label: 'Воркшопи' },
]

export default function Events() {
  const [allEvents, setAllEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])

  const [searchParams, setSearchParams] = useSearchParams()
  const [eventName, setEventName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleInputChange = (e) => {
    setEventName(e.target.value)
  }

  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: categoryId })
    }
  }

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    } else {
      setSelectedCategory('all')
    }
  }, [searchParams])

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getAllEvents()
      setAllEvents(data)
      setFilteredEvents(data)
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    let result = allEvents

    if (eventName.trim() !== '') {
      result = result.filter((event) =>
        event.title.toLowerCase().includes(eventName.toLowerCase()),
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter((event) => event.category === selectedCategory)
    }

    setFilteredEvents(result)
  }, [eventName, selectedCategory, allEvents])

  return (
    <Container>
      <div className={styles.contentWrapper}>
        <aside className={styles.filter}>
          <div className={styles.stickyFilter}>
            <h2>Фільтри</h2>

            <div className={styles.filterSection}>
              <h3>Пошук</h3>
              <Input
                type="text"
                label="Введіть назву..."
                name="eventName"
                value={eventName}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.filterSection}>
              <h3>Категорії</h3>
              <div className={styles.categoriesList}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className={`${styles.catBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main>
          {filteredEvents.length > 0 ? (
            <div className={styles.eventGrid}>
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className={styles.nothing}>Подій не знайдено 😢</p>
          )}
        </main>
      </div>
    </Container>
  )
}
