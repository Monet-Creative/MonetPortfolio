import Header from "./components/Header"
import Hero from "./components/Hero"
import ClientLogos from "./components/ClientLogos"
import Services from "./components/Services"
import Cases from "./components/Cases"
import Method from "./components/Method"
import Faq from "./components/Faq"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import WhatsAppButton from "./components/WhatsAppButton"
import { LanguageProvider } from "./i18n"

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <main>
          <Hero />
          <ClientLogos />
          <Services />
          <Cases />
          <Method />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  )
}
