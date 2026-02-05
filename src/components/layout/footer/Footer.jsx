import styles from './Footer.module.scss'
// components
import Container from '../container/Container'
// svg
import EventHubLogo from './../icons/EventHubLogo'
// react
import { NavLink } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          {/* Секція 1: Брендинг */}
          <div className={styles.column}>
            <div className={styles.logoWrapper}>
              <EventHubLogo className={styles.logo} />
              <span className={styles.brandName}>EventHub</span>
            </div>
            <p className={styles.tagline}>
              Твій гід у світі найкращих подій. Знаходь, бронюй, насолоджуйся.
            </p>
          </div>

          {/* Секція 2: Навігація */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Навігація</h3>
            <ul className={styles.linksList}>
              <li>
                <NavLink to="/" className={styles.link}>
                  Головна
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className={styles.link}>
                  Події
                </NavLink>
              </li>
              <li>
                <NavLink to="/about-us" className={styles.link}>
                  Про нас
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Секція 3: Контакти */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Контакти</h3>
            <ul className={styles.linksList}>
              <li>
                <a href="mailto:support@eventhub.com" className={styles.link}>
                  support@eventhub.com
                </a>
              </li>
              <li>
                <a href="tel:+380999999999" className={styles.link}>
                  +38 (099) 999 99 99
                </a>
              </li>
              <li className={styles.socials}>
                {/* Тут можна буде додати іконки соцмереж пізніше */}
                <a
                  href="https://www.instagram.com/"
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/?locale=uk_UA"
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>&copy; {currentYear} EventHub. Всі права захищено.</p>
        </div>
      </Container>
    </footer>
  )
}
