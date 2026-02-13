import { Routes, Route } from 'react-router-dom'

//components
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
//pages
import Home from './pages/home/Home'
import Events from './pages/events/Events'
import EventDetails from './pages/eventsDetails/EventsDetails'
import AboutUs from './pages/aboutUs/AboutUs'
import UserProfile from './pages/users/userProfile/UserProfile'
import OrgProfile from './pages/users/orgProfile/OrgProfile'
import Admin from './pages/admin/Admin'

//routes
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/org-profile" element={<OrgProfile />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="events/:id" element={<EventDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
