//styles
import styles from './Mission.module.scss'

//components
import Container from '../../../../components/layout/container/Container'

export default function Mission() {
  return (
    <section className={styles.mission}>
      <Container>
        <div className={styles.missionGrid}>
          <div className={styles.textBlock}>
            <h2>Наша Місія</h2>
            <p>
              Ми віримо, що життя складається з моментів. Концерт улюбленого
              гурту, пізнавальний воркшоп чи бізнес-конференція — кожна подія
              змінює нас.
            </p>
            <p>
              Наша мета — зробити шлях до цих подій максимально простим. Ніяких
              черг, прихованих комісій та загублених квитків. Тільки ви та ваші
              враження.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <div className={styles.placeholderImg}></div>
          </div>
        </div>
      </Container>
    </section>
  )
}
