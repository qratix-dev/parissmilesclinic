import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import About from '../components/sections/About'
import Doctors from '../components/sections/Doctors'
import Pricing from '../components/sections/Pricing'
import Testimonials from '../components/sections/Testimonials'
import BeforeAfter from '../components/sections/BeforeAfter'
import Contact from '../components/sections/Contact'

export default function Home() {
  const location = useLocation()

  // Scroll to the hash section whenever the hash changes (handles cross-page navigation)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const NAVBAR_HEIGHT = 80
    const id = location.hash.slice(1)
    const attempt = (retries: number) => {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
        window.scrollTo({ top, behavior: 'smooth' })
      } else if (retries > 0) {
        setTimeout(() => attempt(retries - 1), 80)
      }
    }
    attempt(5)
  }, [location.hash])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Doctors />
        <BeforeAfter />
        <Services />
        <About />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
