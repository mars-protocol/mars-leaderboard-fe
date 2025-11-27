'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const fadeUpVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

const buttonStyles =
  'flex-1 flex items-center justify-center px-4 py-4 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm transition-colors cursor-pointer'

export default function IntroLeftColumn() {
  const fadeInRef = useRef(null)
  const fadeInInView = useInView(fadeInRef, { once: true })

  const getTransition = (delay: number) => ({
    duration: 0.6,
    delay,
    ease: [0.21, 0.47, 0.32, 0.98] as const,
    type: 'spring' as const,
  })

  return (
    <div className='flex flex-col gap-4 w-full lg:w-1/2'>
      <div className='pb-6'>
        <motion.h1
          ref={fadeInRef}
          className='bg-linear-to-br from-white from-30% to-white/40 bg-clip-text ml-20 text-4xl leading-none font-medium tracking-tighter text-transparent sm:text-5xl md:text-7xl'
          animate={fadeInInView ? 'animate' : 'initial'}
          variants={fadeUpVariants}
          initial={false}
          transition={getTransition(0.1)}
        >
          Mars
        </motion.h1>
        <motion.h1
          ref={fadeInRef}
          className='bg-linear-to-br from-white from-30% to-white/40 -mt-10 bg-clip-text pb-4 text-4xl leading-none font-medium tracking-tighter text-transparent sm:text-5xl md:text-[135px]'
          animate={fadeInInView ? 'animate' : 'initial'}
          variants={fadeUpVariants}
          initial={false}
          transition={getTransition(0.1)}
        >
          Fragments
        </motion.h1>
      </div>

      <motion.p
        className='text-lg text-balance text-white/70 md:text-xl'
        animate={fadeInInView ? 'animate' : 'initial'}
        variants={fadeUpVariants}
        initial={false}
        transition={getTransition(0.2)}
      >
        On-chain points that track your participation across Mars-aligned products.
        <br />
        Earn <span className='text-primary font-semibold'>MARS token rewards</span> for every dollar
        you deposit.
      </motion.p>

      <div className='flex flex-col gap-2 mt-12'>
        <motion.p
          className='text-xs text-white/60 md:text-lg mt-2'
          animate={fadeInInView ? 'animate' : 'initial'}
          variants={fadeUpVariants}
          initial={false}
          transition={getTransition(0.25)}
        >
          Deposit on either platform to start earning:
        </motion.p>

        <motion.div
          animate={fadeInInView ? 'animate' : 'initial'}
          variants={fadeUpVariants}
          className='flex flex-col gap-4 sm:flex-row mt-2'
          initial={false}
          transition={getTransition(0.3)}
        >
          <a
            href='https://app.marsprotocol.io'
            target='_blank'
            rel='noopener noreferrer'
            className={buttonStyles}
          >
            Mars Protocol
          </a>
          <a
            href='https://app.amberfi.io'
            target='_blank'
            rel='noopener noreferrer'
            className={buttonStyles}
          >
            Amber Finance
          </a>
        </motion.div>
      </div>
    </div>
  )
}
