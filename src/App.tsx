import HallOfFame from './components/home/hall-of-fame'
import Hero from './components/home/hero'
import HeroForBusiness from './components/for-business/hero'
import JoinNow from './components/home/join-now'
import Footer from './components/ui/shared/footer'
import Navbar from './components/ui/shared/navbar'
import Collaborate from './components/for-business/collaborate'

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

function ForBusiness() {
  return (
    <>
      <Navbar />

      <HeroForBusiness />

      <Collaborate />

      <Footer />
    </>
  )
}

export default ForBusiness
