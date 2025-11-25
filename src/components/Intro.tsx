'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Button from './Button'
import { ArrowRight } from 'components/common/Icons'

export default function Hero() {
  const fadeInRef = useRef(null)
  const fadeInInView = useInView(fadeInRef, {
    once: true,
  })

  const fadeUpVariants = {
    initial: {
      opacity: 0,
      y: 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <section id='hero' className='relative'>
      <div className='relative h-full w-full'>
        <div className='z-10 container flex flex-col max-w-screen-xl mx-auto px-4 relative'>
          <div className='flex flex-col items-center gap-4 pb-8 text-center max-w-5xl mx-auto'>
            <motion.h1
              ref={fadeInRef}
              className='bg-linear-to-br from-white from-30% to-white/40 bg-clip-text py-4 text-4xl leading-none font-medium tracking-tighter text-balance text-transparent sm:text-5xl md:text-6xl lg:text-7xl'
              animate={fadeInInView ? 'animate' : 'initial'}
              variants={fadeUpVariants}
              initial={false}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
                type: 'spring',
              }}
            >
              Mars Fragments
            </motion.h1>

            <motion.p
              className='text-lg text-balance text-white/70 md:text-xl'
              animate={fadeInInView ? 'animate' : 'initial'}
              variants={fadeUpVariants}
              initial={false}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
                type: 'spring',
              }}
            >
              On-chain points that track your participation across Mars-aligned products.
              <br />
              Earn <span className='text-primary font-semibold'>MARS token rewards</span> for every
              dollar you deposit.
            </motion.p>

            <motion.p
              className='text-base text-white/60 md:text-lg mt-2'
              animate={fadeInInView ? 'animate' : 'initial'}
              variants={fadeUpVariants}
              initial={false}
              transition={{
                duration: 0.6,
                delay: 0.25,
                ease: [0.21, 0.47, 0.32, 0.98],
                type: 'spring',
              }}
            >
              You can deposit on either of these platforms:
            </motion.p>

            <motion.div
              animate={fadeInInView ? 'animate' : 'initial'}
              variants={fadeUpVariants}
              className='flex flex-col gap-4 sm:flex-row mt-2'
              initial={false}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.21, 0.47, 0.32, 0.98],
                type: 'spring',
              }}
            >
              <Button
                className='px-6 py-2 text-base'
                rightIcon={
                  <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                }
              >
                Mars Protocol
              </Button>
              <Button
                className='px-6 py-2 text-base'
                rightIcon={
                  <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                }
              >
                Amber Finance
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
