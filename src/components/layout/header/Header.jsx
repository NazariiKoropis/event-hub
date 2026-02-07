import styles from './Header.module.scss'
// components
import Container from '../container/Container'
import Button from '../../ui/button/Button'
import Backdrop from '../../ui/backdrop/Backdrop'
import Modal from '../../ui/modal/Modal'
// auth
import LoginForm from './../../auth/LoginForm'
import SignUpForm from './../../auth/SignUpForm'
// svg
import EventHubLogo from './../icons/EventHubLogo'
import UserProfileLogo from './../icons/UserProfileLogo'
import CloseIcon from './../icons/CloseIcon'
// react
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

// services
import { logoutUser } from './../../../services/auth.service'
// context
import { useAuth } from '../../../context/AuthContext'

export default function Header() {
  const { currentUser } = useAuth()

  const isLoggedIn = !!currentUser

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const NAV_ITEMS = [
    { path: '/', label: 'Головна' },
    { path: '/events', label: 'Події' },
    { path: '/about-us', label: 'Про нас' },
  ]

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const openModal = (mode) => {
    setAuthMode(mode)
    setIsModalOpen(true)
    setIsMenuOpen(false)
  }

  const closeModal = () => setIsModalOpen(false)

  const handleAuthSuccess = (user) => {
    console.log('Auth Success User:', user)
    setIsModalOpen(false)
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    await logoutUser()
    closeMenu()
  }

  const switchAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === 'login' ? 'signup' : 'login'))
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
                <div className={styles.userMenu}>
                  <NavLink to="/user-account">
                    <UserProfileLogo className={styles.userProfileLogo} />
                  </NavLink>
                  <Button variant="ghost" onClick={handleLogout}>
                    Log out
                  </Button>
                </div>
              ) : (
                <div className={styles.headerButtons}>
                  <Button variant="ghost" onClick={() => openModal('login')}>
                    Login
                  </Button>
                  <Button onClick={() => openModal('signup')}>Sign Up</Button>
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

            {isLoggedIn ? (
              <div className={styles.userMenu}>
                <NavLink to="/user-account" onClick={closeMenu}>
                  <UserProfileLogo className={styles.userProfileLogo} />
                </NavLink>
                <Button variant="ghost" fullWidth onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            ) : (
              <div className={styles.headerButtons}>
                <Button variant="ghost" onClick={() => openModal('login')}>
                  Login
                </Button>
                <Button onClick={() => openModal('signup')}>Sign Up</Button>
              </div>
            )}
          </nav>

          {/* --- Modal --- */}
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={authMode === 'login' ? 'Вхід на сайт' : 'Реєстрація'}
          >
            {authMode === 'login' ? (
              <LoginForm onLoginSuccess={handleAuthSuccess} />
            ) : (
              <SignUpForm onAuthSuccess={handleAuthSuccess} />
            )}

            <div className={styles.authSwitch}>
              <p>
                {authMode === 'login'
                  ? 'Ще не зареєстровані? '
                  : 'Вже маєте акаунт? '}
                <span onClick={switchAuthMode} className={styles.switchLink}>
                  {authMode === 'login' ? 'Створити акаунт' : 'Увійти'}
                </span>
              </p>
            </div>
          </Modal>
        </nav>
      </Container>
    </header>
  )
}
