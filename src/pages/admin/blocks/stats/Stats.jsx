import styles from './Stats.module.scss'
import { useState, useEffect } from 'react'
import { getSystemStats } from './../../../../services/stats.service'

import {
  FaUsers,
  FaCalendarAlt,
  FaTicketAlt,
  FaMoneyBillWave,
} from 'react-icons/fa'

export default function Stats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      const data = await getSystemStats()
      setStats(data)
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading) return <p className={styles.loading}>Рахуємо цифри...</p>
  if (!stats) return <p>Не вдалося завантажити статистику</p>

  const maxCategoryValue = Math.max(
    ...Object.values(stats.categoryStats || { a: 1 }),
  )

  return (
    <div className={styles.statsWrapper}>
      <h2>Статистика платформи</h2>

      <div className={styles.cardsGrid}>
        <div className={`${styles.card} ${styles.blue}`}>
          <div className={styles.icon}>
            <FaUsers />
          </div>
          <div className={styles.info}>
            <h3>Користувачі</h3>
            <span>{stats.usersCount}</span>
          </div>
        </div>

        <div className={`${styles.card} ${styles.purple}`}>
          <div className={styles.icon}>
            <FaCalendarAlt />
          </div>
          <div className={styles.info}>
            <h3>Події</h3>
            <span>{stats.eventsCount}</span>
          </div>
        </div>

        <div className={`${styles.card} ${styles.orange}`}>
          <div className={styles.icon}>
            <FaTicketAlt />
          </div>
          <div className={styles.info}>
            <h3>Продані квитки</h3>
            <span>{stats.totalTicketsSold}</span>
          </div>
        </div>

        <div className={`${styles.card} ${styles.green}`}>
          <div className={styles.icon}>
            <FaMoneyBillWave />
          </div>
          <div className={styles.info}>
            <h3>Загальний дохід</h3>
            <span>{stats.totalRevenue.toLocaleString()} ₴</span>
          </div>
        </div>
      </div>

      <div className={styles.chartSection}>
        <h3>Події за категоріями</h3>
        <div className={styles.chart}>
          {Object.entries(stats.categoryStats).map(([category, count]) => (
            <div key={category} className={styles.chartRow}>
              <span className={styles.catLabel}>{category}</span>
              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{ width: `${(count / maxCategoryValue) * 100}%` }}
                >
                  <span className={styles.barValue}>{count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
