// styles
import styles from './UserProfile.module.scss'

// components
import Container from '../../../components/layout/container/Container'
import Button from '../../../components/ui/button/Button'

// react
import { useState, useEffect } from 'react'

// context
import { useAuth } from '../../../context/AuthContext'

// services
import { getBookingsByUserID } from '../../../services/booking.service'
import { getEventById } from './../../../services/event.service'
import { createRequest } from '../../../services/request.service'

// utils
import { getEventImage } from '../../../utils/imageUtil'

// icons
import { FaTicketAlt, FaHistory, FaSignOutAlt } from 'react-icons/fa'

export default function UserProfile() {
  const { currentUser, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('active')

  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return
      setLoading(true)

      const myBookings = await getBookingsByUserID(currentUser.uid)

      const fullData = await Promise.all(
        myBookings.map(async (booking) => {
          const eventData = await getEventById(booking.eventId)

          if (!eventData) return null

          return {
            ...booking,
            event: eventData,
          }
        }),
      )

      setTickets(fullData.filter((item) => item !== null))
      setLoading(false)
    }

    fetchData()
  }, [currentUser])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  const handleSendRequest = async () => {
    if (!currentUser) return

    if (!confirm('Ви впевнені що бажаєте стати організатором?')) return

    const reason = prompt('Опишіть причину бажання стати організатором')

    if (reason === null) return

    const data = {
      createdAt: Date.now(),
      description: reason,
      displayName: currentUser.displayName,
      email: currentUser.email,
      status: 'pending',
      type: 'upgrade_to_organizer',
      userId: currentUser.uid,
    }

    const requestId = await createRequest(data)

    if (requestId) {
      alert('Успішно! Заявка надіслана на розгляд адміністратору.')
    } else {
      alert('Сталася помилка при надсилці заявки😢 Спробуйте ще раз.')
    }
  }

  const filteredTickets = tickets.filter((item) => {
    const eventDate = item.event.date
    const now = new Date().getTime()

    if (activeTab === 'active') {
      return eventDate > now
    } else {
      return eventDate < now
    }
  })

  if (!currentUser) {
    return (
      <Container>
        <div className={styles.notLogged}>
          <h2>Ви не авторизовані</h2>
          <p>Будь ласка, увійдіть у свій акаунт.</p>
        </div>
      </Container>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <Container>
        <div className={styles.grid}>
          <aside className={styles.userInfoCard}>
            <div className={styles.avatar}>
              <img
                src={`https://ui-avatars.com/api/?name=${currentUser.email}&background=0D8ABC&color=fff`}
                alt="User Avatar"
              />
            </div>

            <h2 className={styles.userName}>
              {currentUser.displayName || 'Користувач'}
            </h2>
            <p className={styles.userEmail}>{currentUser.email}</p>

            <div className={styles.divider}></div>

            <div className={styles.buttons}>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <FaSignOutAlt /> Вийти з акаунту
              </button>
              {/*TODO: написати логіку надсилання запиту*/}
              <Button onClick={handleSendRequest} className={styles.logoutBtn}>
                Стати організатором
              </Button>
            </div>
          </aside>

          <section className={styles.contentArea}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === 'active' ? styles.active : ''}`}
                onClick={() => setActiveTab('active')}
              >
                <FaTicketAlt /> Активні квитки
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'history' ? styles.active : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <FaHistory /> Історія
              </button>
            </div>

            <div className={styles.ticketList}>
              {loading ? (
                <p style={{ textAlign: 'center', padding: '20px' }}>
                  Завантаження квитків...
                </p>
              ) : filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => {
                  const eventDate = new Date(
                    ticket.event.date,
                  ).toLocaleDateString('uk-UA')
                  const eventTime = new Date(
                    ticket.event.date,
                  ).toLocaleTimeString('uk-UA', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                  const imageSrc = getEventImage(ticket.event.slug)

                  return (
                    <div key={ticket.id} className={styles.ticketCard}>
                      <div
                        className={styles.ticketImage}
                        style={{ backgroundImage: `url(${imageSrc})` }}
                      ></div>

                      <div className={styles.ticketInfo}>
                        <h3>{ticket.event.title}</h3>

                        <div className={styles.meta}>
                          <span>
                            📅 {eventDate} о {eventTime}
                          </span>
                          <span>
                            📍 {ticket.event.cityName},{' '}
                            {ticket.event.location?.address}
                          </span>
                        </div>

                        <div className={styles.ticketFooter}>
                          <span className={styles.count}>
                            {ticket.ticketCount} квитки(ів)
                          </span>
                          <span className={styles.price}>
                            Сума: {ticket.totalPrice} ₴
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className={styles.emptyState}>
                  {activeTab === 'active'
                    ? 'У вас немає активних подій 😢'
                    : 'Історія замовлень порожня'}
                </p>
              )}
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
