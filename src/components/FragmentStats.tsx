'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

export default function FragmentStats() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, {
    once: true,
    margin: '-100px',
  })

  const fadeUpVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  }

  const stats = [
    {
      label: 'MARS in Reward Pool',
      value: '45M',
      delay: 0.1,
    },
    {
      label: 'Fragment per USD a day',
      value: '1',
      delay: 0.2,
    },
    {
      label: 'Daily Snapshots',
      value: '2',
      delay: 0.3,
    },
  ]

  return (
    <section ref={statsRef} className='relative pb-16 pt-4'>
      <div className='container mx-auto max-w-screen-xl px-4'>
        <div className='flex flex-col items-center justify-center gap-8 md:flex-row md:items-start md:gap-16'>
          {stats.map((stat, index) => {
            return (
              <div key={stat.label} className='contents'>
                <motion.div
                  className='flex flex-col items-center text-center'
                  animate={statsInView ? 'animate' : 'initial'}
                  variants={fadeUpVariants}
                  initial={false}
                  transition={{
                    duration: 0.6,
                    delay: stat.delay,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  <motion.span className='text-5xl font-bold bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent md:text-7xl'>
                    {stat.value}
                  </motion.span>

                  <p className='text-sm uppercase tracking-wide text-white/40 md:text-base'>
                    {stat.label}
                  </p>
                </motion.div>

                {index < stats.length - 1 && (
                  <div className='hidden h-px w-16 shrink-0 bg-linear-to-r from-transparent via-white/40 to-transparent md:block md:mt-[2.25rem]' />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
