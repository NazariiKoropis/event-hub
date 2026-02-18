//styles
import styles from './Admin.module.scss'

//components
import Container from './../../components/layout/container/Container'
import Requests from './blocks/requests/Requests'
import Events from './blocks/events/Events'
import Stats from './blocks/stats/Stats'

//react
import { useState } from 'react'

//context
import { useAuth } from './../../context/AuthContext'

export default function admin() {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('requests')

  return (
    <Container className={styles.pageWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.adminInfo}>
          <div className={styles.avatar}>
            {currentUser?.email?.[0].toUpperCase() || 'A'}
          </div>
          <div>
            <h3>Admin Panel</h3>
            <p className={styles.email}>{currentUser?.email}</p>
          </div>
        </div>

        <nav className={styles.nav}>
          <button
            className={activeTab === 'requests' ? styles.active : ''}
            onClick={() => setActiveTab('requests')}
          >
            📬 Заявки
          </button>
          <button
            className={activeTab === 'events' ? styles.active : ''}
            onClick={() => setActiveTab('events')}
          >
            📅 Події
          </button>

          <button
            className={activeTab === 'stats' ? styles.active : ''}
            onClick={() => setActiveTab('stats')}
          >
            📊 Статистика
          </button>
        </nav>
      </aside>

      <section className={styles.content}>
        {activeTab === 'requests' && <Requests />}
        {activeTab === 'events' && <Events />}
        {activeTab === 'stats' && <Stats />}
      </section>
    </Container>
  )
}
