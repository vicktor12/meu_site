import Loader from './components/Loader'
import Cursor from './components/Cursor'
import { SHOW_LOADER } from './config'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import Diferencial from './sections/Diferencial'
import Briefing from './sections/Briefing'
import Processo from './sections/Processo'
import Servicos from './sections/Servicos'
import Projetos from './sections/Projetos'
import Sobre from './sections/Sobre'
import Contato from './sections/Contato'
import Footer from './sections/Footer'

export default function App() {
  return (
    <>
      {SHOW_LOADER && <Loader />}
      <div className="grain" />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Diferencial />
        <Briefing />
        <Processo />
        <Servicos />
        <Projetos />
        <Sobre />
        <Contato />
      </main>
      <Footer />
    </>
  )
}
