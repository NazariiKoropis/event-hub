import styles from './Header.module.scss'
// components
import Container from '../container/Container'
import Button from '../../ui/button/Button'
import Backdrop from '../../ui/backdrop/Backdrop'
import Modal from '../../ui/modal/Modal'
// svg
import EventHubLogo from './../icons/EventHubLogo'
import UserProfileLogo from './../icons/UserProfileLogo'
import CloseIcon from './../icons/CloseIcon'
// react
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const NAV_ITEMS = [
    { path: '/', label: 'Головна' },
    { path: '/events', label: 'Події' },
    { path: '/about-us', label: 'Про нас' },
  ]

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const openAuthModal = () => {
    setIsModalOpen(true)
    setIsMenuOpen(false)
  }

  const closeModal = () => setIsModalOpen(false)

  const handleTempLogin = () => {
    setIsLoggedIn(true)
    setIsModalOpen(false)
  }

  const handleLogout = (e) => {
    e.preventDefault()
    setIsLoggedIn(false)
    closeMenu()
  }

  const getLinkClass = ({ isActive }) => {
    return isActive
      ? `${styles.headerLink} ${styles['headerLink--active']}`
      : styles.headerLink
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className={styles.stickyHeader}>
      <Container>
        <nav className={styles.headerContent}>
          <NavLink to="/">
            <EventHubLogo className={styles.eventHubLogo} />
          </NavLink>

          <button
            className={`${styles.burgerButton} ${isMenuOpen ? styles['burgerButton--active'] : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          {/* --- DESKTOP MENU --- */}
          <ul className={styles.navDesktop}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={getLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              {isLoggedIn ? (
                <NavLink to="/user-account">
                  <UserProfileLogo className={styles.userProfileLogo} />
                </NavLink>
              ) : (
                <div className={styles.headerButtons}>
                  <Button variant="ghost" onClick={openAuthModal}>
                    Login
                  </Button>
                  <Button onClick={openAuthModal}>Sign Up</Button>
                </div>
              )}
            </li>
          </ul>

          {/* --- MOBILE MENU --- */}

          <Backdrop isOpen={isMenuOpen} onClick={closeMenu} />
          <nav
            className={`${styles.burgerMenu} ${isMenuOpen ? styles['burgerMenu--open'] : ''}`}
          >
            <div className={styles.burgerMenuHeader}>
              <NavLink to="/" onClick={closeMenu}>
                <EventHubLogo className={styles.eventHubLogo} />
              </NavLink>
              <CloseIcon onClick={closeMenu} style={{ cursor: 'pointer' }} />
            </div>

            <ul className={styles.menuList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={getLinkClass}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div>
              {isLoggedIn ? (
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <NavLink to="/user-account" onClick={closeMenu}>
                    <UserProfileLogo className={styles.userProfileLogo} />
                  </NavLink>
                  <Button variant="ghost" onClick={handleLogout}>
                    Log out
                  </Button>
                </div>
              ) : (
                <div className={styles.headerButtons}>
                  <Button variant="ghost" onClick={openAuthModal}>
                    Login
                  </Button>
                  <Button onClick={openAuthModal}>Sign Up</Button>
                </div>
              )}
            </div>
          </nav>

          <Modal isOpen={isModalOpen} onClose={closeModal} title="Вхід на сайт">
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <p>Тут буде форма логіну...</p>

              <Button onClick={handleTempLogin}>Увійти (Тест)</Button>
            </div>
          </Modal>
        </nav>
      </Container>
    </header>
  )
}
