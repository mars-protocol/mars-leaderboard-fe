'use client'

import IntroLeftColumn from 'components/intro/IntroLeftColumn'
import IntroRightColumn from 'components/intro/IntroRightColumn'

export default function Intro() {
  return (
    <section id='intro' className='relative overflow-visible max-w-screen-xl'>
      <div className='relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 pb-4'>
        <IntroLeftColumn />
        <IntroRightColumn />
      </div>
    </section>
  )
}
