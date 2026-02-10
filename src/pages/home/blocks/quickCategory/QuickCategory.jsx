import styles from './QuickCategory.module.scss'
import { NavLink } from 'react-router-dom'

//icons
import { CiMusicNote1 } from 'react-icons/ci'
import { FaBusinessTime } from 'react-icons/fa'
import { CiLaptop } from 'react-icons/ci'
import { FaPaintBrush } from 'react-icons/fa'
import { MdOutlineSportsSoccer } from 'react-icons/md'
import { PiStudent } from 'react-icons/pi'
// components
import Container from '../../../../components/layout/container/Container'

const CATEGORIES = [
  { id: 'music', label: 'Музика', icon: <CiMusicNote1 />, color: '#FF6B6B' },
  {
    id: 'business',
    label: 'Бізнес',
    icon: <FaBusinessTime />,
    color: '#4ECDC4',
  },
  { id: 'it', label: 'IT & Tech', icon: <CiLaptop />, color: '#45B7D1' },
  { id: 'art', label: 'Мистецтво', icon: <FaPaintBrush />, color: '#96CEB4' },
  {
    id: 'sport',
    label: 'Спорт',
    icon: <MdOutlineSportsSoccer />,
    color: '#FFCC5C',
  },
  { id: 'workshops', label: 'Воркшопи', icon: <PiStudent />, color: '#FF9671' },
]

export default function QuickCategory() {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>Шукайте за інтересами</h2>
        <NavLink to="/events" className={styles.viewAll}>
          Всі категорії &rarr;
        </NavLink>

        <div className={styles.grid}>
          {CATEGORIES.map((cat) => (
            <NavLink
              key={cat.id}
              to={`/events?category=${cat.id}`}
              className={styles.card}
            >
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
              >
                <span className={styles.icon}>{cat.icon}</span>
              </div>
              <span className={styles.label}>{cat.label}</span>
            </NavLink>
          ))}
        </div>
      </Container>
    </section>
  )
}
