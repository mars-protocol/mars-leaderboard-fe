'use client'

import IntroLeftColumn from './IntroLeftColumn'
import IntroRightColumn from './IntroRightColumn'

export default function Hero() {
  return (
    <section id='hero' className='relative overflow-visible'>
      <div className='relative h-full w-full min-h-[400px] md:min-h-[450px] pb-8'>
        <div className='z-10 container flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 max-w-screen-xl mx-auto relative'>
          <IntroLeftColumn />
          <IntroRightColumn />
        </div>
      </div>
    </section>
  )
}
