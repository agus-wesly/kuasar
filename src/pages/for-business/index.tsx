import Collaborate from '@/components/for-business/collaborate'
import HeroForBusiness from '@/components/for-business/hero'
import withPageTransition from '@/components/hoc/with-page-transition'

function ForBusinessPage() {
  return (
    <>
      <HeroForBusiness />

      <Collaborate />
    </>
  )
}
export default withPageTransition(ForBusinessPage)
