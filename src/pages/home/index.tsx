import withPageTransition from '@/components/hoc/with-page-transition'
import HallOfFame from './components/hall-of-fame'
import Hero from './components/hero'
import { lazy } from 'react'

const JoinNow = lazy(() => import('./components/join-now'))

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
