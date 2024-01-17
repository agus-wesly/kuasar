import withPageTransition from '@/components/hoc/with-page-transition'
import HallOfFame from '@/components/home/hall-of-fame'
import Hero from '@/components/home/hero'
import JoinNow from '@/components/home/join-now'

function App() {
  return (
    <>
      <Hero />

      <HallOfFame />

      <JoinNow />
    </>
  )
}

export default withPageTransition(App)
