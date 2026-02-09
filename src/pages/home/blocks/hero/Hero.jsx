//styles
import styles from './Hero.module.scss'
import buttonStyles from './../../../../components/ui/button/Button.module.scss'
//react
import { NavLink } from 'react-router-dom'
//components
import Container from '../../../../components/layout/container/Container'

//lib
import clsx from 'clsx'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>Event Hub</h1>
        <NavLink
          to="/events"
          className={clsx(
            buttonStyles.button,
            buttonStyles['button--ghost'],
            styles.Button,
          )}
        >
          Переглянути події
        </NavLink>
      </Container>
    </section>
  )
}
