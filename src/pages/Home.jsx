import HeroSectionBanner from '@/components/ui/HeroSectionBanner'
import KindTipsText from '@/components/ui/KindTips'
import ProgressButton from '@/components/ui/ProgressQueryBtn'
import SelfServiceList from '@/components/ui/SelfServiceList'
import TopNavbar from '@/components/ui/TopNavbar'

const AUTH_HERO_SECTION_IMAGE = '/Hero-section-Image.png'

export default function HomePage() {
  return (
    <div className="bg-[#f7f8ff]">
      <TopNavbar />
      <HeroSectionBanner ImageUrl={AUTH_HERO_SECTION_IMAGE} />
      <SelfServiceList isAuth={true} />
      <KindTipsText isAuth={true} />
      <ProgressButton isAuth={true} />
    </div>
  )
}
