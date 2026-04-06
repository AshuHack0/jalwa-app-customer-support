import HeroSectionBanner from '@/components/ui/HeroSectionBanner'
import KindTipsText from '@/components/ui/KindTips'
import ProgressButton from '@/components/ui/ProgressQueryBtn'
import SelfServiceList from '@/components/ui/SelfServiceList'
import TopNavbar from '@/components/ui/TopNavbar'

const UNAUTH_HERO_SECTION_IMAGE = '/home_banner-2.png'

export default function HomeUnauthenticated() {
  return (
    <div className="bg-[#f7f8ff]">
      <TopNavbar />
      <HeroSectionBanner ImageUrl={UNAUTH_HERO_SECTION_IMAGE} />
      <SelfServiceList isAuth={false} />
      <KindTipsText isAuth={false} />
      <ProgressButton isAuth={false} />
    </div>
  )
}
