import Container from '../container/Container'
import { NavLink, useNavigate } from 'react-router-dom'
import EventHubLogo from './../icons/EventHubLogo'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header>
      <Container>
        <nav>
          <ul>
            <li>
              <NavLink to="/">
                <EventHubLogo />
              </NavLink>
            </li>
            <li>
              <NavLink to="/">Головна</NavLink>
            </li>
            <li>
              <NavLink to="/events"> Події</NavLink>
            </li>
            <li>
              <NavLink to="/aboutUs">Про нас</NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}
