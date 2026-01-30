import styles from './Header.module.scss'
//components
import Container from '../container/Container'
import Button from '../../ui/button/Button'
//svg
import EventHubLogo from './../icons/EventHubLogo'
import UserProfileLogo from './../icons/UserProfileLogo'
//react
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  //hooks
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //variables
  const NAV_ITEMS = [
    { path: '/', label: 'Головна' },
    { path: '/events', label: 'Події' },
    { path: '/about-us', label: 'Про нас' },
  ]

  const loginSwitch = () => setIsLoggedIn(!isLoggedIn)

  const getLinkClass = ({ isActive }) => {
    return isActive
      ? `${styles.headerLink} ${styles['headerLink--active']}`
      : styles.headerLink
  }

  return (
    <header>
      <Container>
        <nav className={styles.header}>
          <ul className={styles.navDesktop}>
            <li>
              <NavLink to="/">
                <EventHubLogo className={styles.eventHubLogo} />
              </NavLink>
            </li>

            {/*Nav list for Desktop navigation*/}
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={getLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}

            {isLoggedIn ? (
              <NavLink to="/user-account">
                <UserProfileLogo
                  className={styles.userProfileLogo}
                  onClick={loginSwitch}
                />
              </NavLink>
            ) : (
              <li className={styles.headerButtons}>
                <Button variant="ghost" onClick={loginSwitch}>
                  login
                </Button>
                <Button onClick={loginSwitch}>Sign Up</Button>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
