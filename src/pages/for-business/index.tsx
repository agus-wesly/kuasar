import Collaborate from './components/collaborate'
import HeroForBusiness from './components/hero'
import withPageTransition from '@/components/hoc/with-page-transition'

function ForBusinessPage() {
  return (
    <main>
      <HeroForBusiness />

      <Collaborate />
    </main>
  )
}
const Page = withPageTransition(ForBusinessPage)
export function Component() {
  return <Page />
}
