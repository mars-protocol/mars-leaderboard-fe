'use client'

import { useMemo, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import dayjs from 'dayjs'
import { Divider } from 'components/common/Divider'

const fadeUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

// Campaign end date: September 1st, 2026 (end of day UTC)
const CAMPAIGN_END_DATE = dayjs('2026-09-01T23:59:59Z')

const calculateDaysRemaining = (): string => {
  const now = dayjs()
  const diffDays = Math.ceil(CAMPAIGN_END_DATE.diff(now, 'day', true))
  return diffDays > 0 ? diffDays.toString() : '0'
}

const getTransition = (delay: number) => ({
  duration: 0.6,
  delay,
  ease: [0.21, 0.47, 0.32, 0.98] as const,
})

export default function FragmentStats() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })

  const daysRemaining = useMemo(() => calculateDaysRemaining(), [])

  const stats = useMemo(
    () => [
      { label: 'MARS in Reward Pool', value: '45M', delay: 0.1 },
      { label: 'Fragment per USD a day', value: '1', delay: 0.2 },
      { label: 'Daily Snapshots', value: '2', delay: 0.3 },
      { label: 'days remaining', value: daysRemaining, delay: 0.4 },
    ],
    [daysRemaining],
  )

  return (
    <section ref={statsRef} className='relative pb-16 pt-8'>
      <div className='container max-w-screen-xl px-4'>
        <div className='flex flex-col items-center justify-center gap-8 md:flex-row md:items-start md:gap-16'>
          {stats.map((stat, index) => (
            <div key={stat.label} className='contents'>
              <motion.div
                className='flex flex-col items-center text-center'
                animate={statsInView ? 'animate' : 'initial'}
                variants={fadeUpVariants}
                initial={false}
                transition={getTransition(stat.delay)}
              >
                <motion.span className='text-5xl font-bold bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent md:text-7xl'>
                  {stat.value}
                </motion.span>
                <p className='text-sm uppercase tracking-wide text-white/40 md:text-base'>
                  {stat.label}
                </p>
              </motion.div>
              {index < stats.length - 1 && <Divider width='w-16' marginTop='md:mt-14' />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
