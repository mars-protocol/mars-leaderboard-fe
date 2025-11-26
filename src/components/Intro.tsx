'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Button from './Button'
import { ArrowRight, MarsFragments } from 'components/common/Icons'

export default function Hero() {
  const fadeInRef = useRef(null)
  const iconRef = useRef(null)
  const fadeInInView = useInView(fadeInRef, {
    once: true,
  })
  const iconInView = useInView(iconRef, {
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

  const iconVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      x: 50,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
  }

  return (
    <section id='hero' className='relative overflow-hidden'>
      <div className='relative h-full w-full min-h-[500px] md:min-h-[550px]'>
        <div className='z-10 container flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 max-w-screen-xl mx-auto px-4 relative py-8 lg:py-12'>
          {/* Left Column - Text Content */}
          <div className='flex flex-col gap-4 pb-4 text-left w-full lg:w-1/2 lg:max-w-2xl'>
            <div>
              <motion.h1
                ref={fadeInRef}
                className='bg-linear-to-br ml-18 from-white from-30% to-white/40 bg-clip-text text-4xl leading-none font-medium tracking-tighter text-balance text-transparent sm:text-5xl md:text-7xl'
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
                Mars
              </motion.h1>
              <motion.h1
                ref={fadeInRef}
                className='bg-linear-to-br from-white from-30% to-white/40 -mt-10 bg-clip-text pb-4 text-4xl leading-none font-medium tracking-tighter text-balance text-transparent sm:text-5xl md:text-9xl'
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
                Fragments
              </motion.h1>
            </div>

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

          {/* Right Column - Icon */}
          <div className='relative w-full lg:w-1/2 flex items-center justify-center lg:justify-end'>
            <motion.div
              ref={iconRef}
              className='relative z-20'
              animate={iconInView ? 'animate' : 'initial'}
              variants={iconVariants}
              initial={false}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.21, 0.47, 0.32, 0.98],
                type: 'spring',
              }}
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                initial={{ rotate: 0 }}
                transition={{
                  duration: 100,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <MarsFragments className='w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] opacity-80' />
              </motion.div>
            </motion.div>

            {/* Background fragments effect - appears from behind */}
            <div className='absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-30'>
              <div
                className='relative'
                style={{
                  maskImage: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)',
                  WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)',
                }}
              >
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  initial={{ rotate: 0 }}
                  transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <MarsFragments className='w-[350px] h-[350px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]' />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
