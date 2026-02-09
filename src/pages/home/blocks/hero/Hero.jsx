//styles
import styles from './Hero.module.scss'

//react

//components
import Container from '../../../../components/layout/container/Container'
import Button from './../../../../components/ui/button/Button'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.hetoContainer}>
        <h1 className={styles.heroTitle}>Event Hub</h1>
        <Button className={styles.Button} variant="ghost">
          Переглянути події
        </Button>
      </Container>
    </section>
  )
}
