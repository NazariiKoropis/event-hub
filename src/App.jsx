import { BrowserRouter, Routes, Route } from 'react-router-dom'

//components
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
//pages
import Home from './pages/home/Home'
import Events from './pages/events/Events'
import AboutUs from './pages/aboutUs/AboutUs'
import UserProfile from './pages/users/userProfile/UserProfile'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/user-account" element={<UserProfile />}></Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
