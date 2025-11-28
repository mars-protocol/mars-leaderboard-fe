'use client'

import IntroLeftColumn from 'components/intro/IntroLeftColumn'
import IntroRightColumn from 'components/intro/IntroRightColumn'

export default function Intro() {
  return (
    <section id='intro' className='relative overflow-visible max-w-screen-xl pt-14 lg:pt-6'>
      <div className='relative z-10 flex flex-col sm:flex-row items-center gap-2 lg:gap-8 pb-4'>
        <IntroLeftColumn />
        <IntroRightColumn />
      </div>
    </section>
  )
}
