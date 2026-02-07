//styles
import stytes from './UserProfile.module.scss'

//components
import Container from '../../../components/layout/container/Container'
import Button from '../../../components/ui/button/Button'
//services
import { logoutUser } from '../../../services/auth.service'
//react

export default function UserProfile() {
  return (
    <Container>
      <h2>User Account</h2>
    </Container>
  )
}
