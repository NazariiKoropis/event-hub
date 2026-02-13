//styles
import styles from './Hero.module.scss'

//components
import Container from '../../../../components/layout/container/Container'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.heroContainer}>
        <div className={styles.glassContainer}>
          <h1 className={styles.title}>Ми об'єднуємо людей через емоції</h1>
          <p className={styles.sub}>
            Event Hub — це простір, де народжуються спогади.
          </p>
        </div>
      </Container>
    </section>
  )
}
