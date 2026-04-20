import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import ServiceDetail from './pages/ServiceDetail'
import FloatingSidebar from './components/ui/FloatingSidebar'
import WhatsAppButton from './components/ui/WhatsAppButton'
import ScrollToTop from './components/ui/ScrollToTop'
import { LanguageProvider } from './contexts/LanguageContext'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <FloatingSidebar />
        <WhatsAppButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
