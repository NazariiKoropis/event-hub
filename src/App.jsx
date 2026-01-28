import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Container from './components/layout/container/Container'
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import Home from './pages/home/Home'

function App() {
  return (
    <BrowserRouter>
      {' '}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
