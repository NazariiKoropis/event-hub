// styles
import styles from './OrgProfile.module.scss'

// components
import Container from '../../../components/layout/container/Container'
import Button from '../../../components/ui/button/Button'
import EventCard from '../../../components/events/eventCard/EventCard'

import Modal from './../../../components/ui/modal/Modal'
import EditEventForm from './blocks/editEventForm/EditEventForm'
import AddEventForm from './blocks/addEventForm/AddEventForm'

//react
import { useState, useEffect } from 'react'
// context
import { useAuth } from '../../../context/AuthContext'

// services
import { getEventByOrgId } from './../../../services/event.service'

export default function OrgProfile() {
  const { currentUser } = useAuth()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedEvent, setSelectedEvent] = useState(null)

  const [createEvent, setCreateEvent] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return
      setLoading(true)
      const data = await getEventByOrgId(currentUser.uid)
      setEvents(data)
      setLoading(false)
    }

    fetchData()
  }, [currentUser])

  const handleEditClick = (event) => {
    setSelectedEvent(event)
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
  }

  const handleCreateEvent = () => {
    setCreateEvent((prev) => !prev)
  }

  return (
    <div className={styles.profileWrapper}>
      <Container>
        <div className={styles.header}>
          <div>
            <h2>Кабінет Організатора</h2>
            <p>Вітаємо, {currentUser?.displayName}!</p>
          </div>

          <Button onClick={handleCreateEvent}>+ Створити подію</Button>
        </div>

        <div className={styles.divider}></div>

        <h3>Мої події</h3>

        {loading && <p>Завантаження ваших подій...</p>}

        {!loading && (
          <div className={styles.eventsGrid}>
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className={styles.orgEventCard}>
                  <EventCard event={event} />

                  <div className={styles.actions}>
                    <span>
                      Продано: {event.soldTickets || 0}/{event.totalTickets}
                    </span>
                    <Button
                      className={styles.editBtn}
                      onClick={() => handleEditClick(event)}
                    >
                      Редагувати
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>Ви ще не створили жодної події.</p>
              </div>
            )}
          </div>
        )}
      </Container>
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={handleCloseModal}
          title={`Редагування: ${selectedEvent.title}`}
        >
          <EditEventForm event={selectedEvent} onClose={handleCloseModal} />
        </Modal>
      )}

      {createEvent && (
        <Modal
          isOpen={createEvent}
          onClose={handleCreateEvent}
          title={`Створення події`}
        >
          <AddEventForm onClose={handleCreateEvent} />
        </Modal>
      )}
    </div>
  )
}
