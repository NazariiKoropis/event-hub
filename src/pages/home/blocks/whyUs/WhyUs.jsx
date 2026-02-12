//styles
import styles from './WhyUs.module.scss'

import Container from '../../../../components/layout/container/Container'
// icons
import { IoRocketOutline } from 'react-icons/io5'
import { FaShieldAlt } from 'react-icons/fa'
import { FaRegStar } from 'react-icons/fa'
import { BiSupport } from 'react-icons/bi'
const FEATURES = [
  {
    id: 1,
    icon: <IoRocketOutline />,
    title: 'Миттєве бронювання',
    description:
      'Купуйте квитки у кілька кліків. Жодних черг та паперових бланків — ваш квиток завжди у смартфоні.',
  },
  {
    id: 2,
    icon: <FaShieldAlt />,
    title: '100% Безпека',
    description:
      'Ми гарантуємо справжність кожного квитка. Ваші платежі захищені, а вхід на подію — без проблем.',
  },
  {
    id: 3,
    icon: <FaRegStar />,
    title: 'Тільки найкращі події',
    description:
      'Ми ретельно відбираємо організаторів. Від затишних воркшопів до масштабних концертів — якість гарантовано.',
  },
  {
    id: 4,
    icon: <BiSupport />,
    title: 'Підтримка 24/7',
    description:
      "Виникли питання? Наша команда турботи завжди на зв'язку, щоб допомогти вам з бронюванням або організацією.",
  },
]

export default function WhyUs() {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>Чому люди обирають Event Hub?</h2>

        <div className={styles.grid}>
          {FEATURES.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
