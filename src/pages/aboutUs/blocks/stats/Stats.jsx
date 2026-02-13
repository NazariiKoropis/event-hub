//styles
import styles from './Stats.module.scss'

//components
import Container from '../../../../components/layout/container/Container'
import { FaUsers, FaTicketAlt, FaCity } from 'react-icons/fa'

export default function Stats() {
  return (
    <section className={styles.stats}>
      <Container>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <FaTicketAlt className={styles.statIcon} />
            <h3>10,000+</h3>
            <p>Проданих квитків</p>
          </div>
          <div className={styles.statItem}>
            <FaCity className={styles.statIcon} />
            <h3>25+</h3>
            <p>Міст України</p>
          </div>
          <div className={styles.statItem}>
            <FaUsers className={styles.statIcon} />
            <h3>5,000+</h3>
            <p>Активних юзерів</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
