import HallOfFame from './components/home/hall-of-fame'
import Hero from './components/home/hero'
import JoinNow from './components/home/join-now'
import Footer from './components/ui/shared/footer'
import Navbar from './components/ui/shared/navbar'

function App() {
  return (
    <>
      <Navbar />

      <Hero />

      <HallOfFame />

      <JoinNow />

      <Footer />
    </>
  )
}

export default App
