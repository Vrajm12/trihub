import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Nav } from '@/components/layout/Nav'
import { SkipLink } from '@/components/layout/SkipLink'
import { StructuredData } from '@/components/seo/StructuredData'
import { Footer } from '@/components/layout/Footer'
import { DemoProvider } from '@/components/ui/DemoDialog'
import { bindPointer } from '@/lib/pointer'
import { Hero } from '@/sections/Hero'
import { Problem } from '@/sections/Problem'
import { SystemSection } from '@/sections/SystemSection'
import { Crm } from '@/sections/Crm'
import { Erp } from '@/sections/Erp'
import { Automation } from '@/sections/Automation'
import { CustomSoftware } from '@/sections/CustomSoftware'
import { Industries } from '@/sections/Industries'
import { Pricing } from '@/sections/Pricing'
import { Trust } from '@/sections/Trust'
import { FinalCta } from '@/sections/FinalCta'
import { Faq } from '@/sections/Faq'

export default function App() {
  useEffect(bindPointer, [])

  return (
    <MotionConfig reducedMotion="user">
      <DemoProvider>
        <SkipLink />
        <Nav />
        <main id="main">
          <Hero />
          <Problem />
          <SystemSection />
          <div id="solutions">
            <Crm />
            <Erp />
            <Automation />
            <CustomSoftware />
          </div>
          <Industries />
          <Pricing />
          <Trust />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <StructuredData page="home" />
      </DemoProvider>
    </MotionConfig>
  )
}
