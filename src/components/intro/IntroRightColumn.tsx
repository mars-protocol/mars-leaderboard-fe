'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { MarsFragments } from 'components/common/Icons'

const SVG_CENTER = 250
const SCATTER_DELAY_BASE = 0.8
const SCATTER_STAGGER = 0.1
const FLOAT_DELAY_BASE = 1.2
const STROKE_DELAY_BASE = 1.0

const iconVariants = {
  initial: { opacity: 0, scale: 0.8, x: 50 },
  animate: { opacity: 1, scale: 1, x: 0 },
}

const iconTransition = {
  duration: 0.8,
  delay: 0.4,
  ease: [0.21, 0.47, 0.32, 0.98] as const,
  type: 'spring' as const,
}

const assembledState = { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
const hoverSpringTransition = {
  type: 'spring' as const,
  damping: 30,
  stiffness: 300,
  mass: 0.5,
}
const scatterSpringTransition = {
  type: 'spring' as const,
  damping: 15,
  stiffness: 100,
  mass: 1,
}

const triangles = [
  {
    id: 'Triangle-Left',
    points:
      '83.9170216 83.8496006 83.6925917 318.619064 245.3848416 201.3975671 83.9170216 83.8496006',
    gradient: 'url(#gradient)',
    centerX: 137.7,
    centerY: 201.3,
  },
  {
    id: 'Triangle-Top',
    points:
      '341.2945133 37.2397251 115.1563908 110.4775281 278.6229091 229.5008872 341.2945133 37.2397251',
    gradient: 'url(#gradient1)',
    centerX: 245.0,
    centerY: 125.7,
  },
  {
    id: 'Triangle-BottomLeft',
    points:
      '51.270931 340.679376 267.8941134 411.2935309 208.1907953 226.898223 51.270931 340.679376',
    gradient: 'url(#gradient2)',
    centerX: 175.8,
    centerY: 326.3,
  },
  {
    id: 'Triangle-Bottomright',
    points:
      '281.8465304 457.0958712 419.3598876 268.2049656 220.6042127 267.9998167 281.8465304 457.0958712',
    gradient: 'url(#gradient3)',
    centerX: 307.3,
    centerY: 331.1,
  },
  {
    id: 'Triangle-Right',
    points:
      '459.112192 269.3555305 324.6001331 83.8428857 264.1720909 269.1701791 459.112192 269.3555305',
    gradient: 'url(#gradient4)',
    centerX: 349.3,
    centerY: 207.5,
  },
]

// Scattered positions (floating state)
const scatteredPositions = [
  { x: -180, y: -100, rotation: -15 }, // Left triangle
  { x: 0, y: -170, rotation: 20 }, // Top triangle
  { x: -170, y: 140, rotation: -25 }, // BottomLeft triangle
  { x: 10, y: 80, rotation: 30 }, // BottomRight triangle
  { x: 120, y: -40, rotation: -20 }, // Right triangle
]

export default function IntroRightColumn() {
  const iconRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const iconInView = useInView(iconRef, { once: true })
  const [isMobile, setIsMobile] = useState(true)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className='absolute top-0 right-0 md:relative md:w-1/2 flex items-center justify-center md:justify-end md:mt-16 pointer-events-none md:pointer-events-auto z-0 opacity-20 md:opacity-100'>
      <motion.div
        ref={iconRef}
        className='relative z-0 md:z-60 md:cursor-pointer'
        animate={iconInView ? 'animate' : 'initial'}
        variants={iconVariants}
        initial={false}
        transition={iconTransition}
        onMouseEnter={() => {
          if (!isMobile) setIsHovered(true)
        }}
        onMouseLeave={() => {
          if (!isMobile) setIsHovered(false)
        }}
      >
        {/* Interactive Floating Triangles */}
        <motion.div
          className='relative w-40 h-40 md:w-100 md:h-100'
          style={{
            filter: isHovered
              ? 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.2)) drop-shadow(0 0 60px rgba(255, 255, 255, 0.1))'
              : 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.1))',
            overflow: 'visible',
          }}
          initial={{ rotate: 0 }}
          animate={{
            rotate: isHovered ? 0 : iconInView ? 360 : 0,
          }}
          transition={
            isHovered
              ? { rotate: { duration: 0.5, ease: 'easeOut' } }
              : { rotate: { duration: 90, repeat: Infinity, ease: 'linear', delay: 1.5 } }
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 500 500'
            className='w-full h-full'
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient
                id='gradient'
                data-name='gradient'
                x1='1421.1754928'
                y1='-960.6674377'
                x2='1640.1636027'
                y2='-960.6674377'
                gradientTransform='translate(1123.8090258 1721.9616982) rotate(-89.9452276)'
                gradientUnits='userSpaceOnUse'
              >
                <stop offset='0' stopColor='#ef4136' />
                <stop offset='.01' stopColor='#ef4136' />
                <stop offset='.32' stopColor='#df5153' />
                <stop offset='1' stopColor='#ac0b1b' />
              </linearGradient>
              <linearGradient
                id='gradient1'
                data-name='gradient'
                x1='-221.365483'
                y1='-143.8505191'
                x2='.3579068'
                y2='-143.8505191'
                gradientTransform='translate(413.4127674 251.0718401) rotate(-17.9452276)'
                xlinkHref='#gradient'
              />
              <linearGradient
                id='gradient2'
                data-name='gradient'
                x1='2708.4627247'
                y1='347.4654991'
                x2='2920.9889122'
                y2='347.4654991'
                gradientTransform='translate(2742.2329267 1500.8646705) rotate(-161.9452276)'
                xlinkHref='#gradient'
              />
              <linearGradient
                id='gradient3'
                data-name='gradient'
                x1='1859.5444542'
                y1='1972.0306844'
                x2='2077.4830127'
                y2='1972.0306844'
                gradientTransform='translate(3032.0776474 -106.6706655) rotate(126.0547724)'
                xlinkHref='#gradient'
              />
              <linearGradient
                id='gradient4'
                data-name='gradient'
                x1='53.5019669'
                y1='1670.8025255'
                x2='267.24564'
                y2='1670.8025255'
                gradientTransform='translate(1592.7876353 -879.0851137) rotate(54.0547724)'
                xlinkHref='#gradient'
              />
            </defs>

            {triangles.map((triangle, index) => {
              const scattered = scatteredPositions[index]
              const scatteredX = SVG_CENTER + scattered.x - triangle.centerX
              const scatteredY = SVG_CENTER + scattered.y - triangle.centerY
              const scatteredState = {
                x: scatteredX,
                y: scatteredY,
                rotate: scattered.rotation,
                scale: 0.65,
                opacity: 0.85,
              }

              const floatAnimation = iconInView
                ? {
                    x: [0, Math.sin(index) * 8, -Math.sin(index) * 8, 0],
                    y: [0, Math.cos(index) * 10, -Math.cos(index) * 10, 0],
                    rotate: [0, Math.sin(index * 0.5) * 3, -Math.sin(index * 0.5) * 3, 0],
                  }
                : { x: 0, y: 0, rotate: 0 }

              return (
                <motion.g
                  key={triangle.id}
                  initial={assembledState}
                  animate={
                    // On mobile, keep assembled; on desktop, use hover/scatter logic
                    isMobile
                      ? assembledState
                      : isHovered
                        ? assembledState
                        : iconInView
                          ? scatteredState
                          : assembledState
                  }
                  transition={
                    isHovered
                      ? hoverSpringTransition
                      : {
                          ...scatterSpringTransition,
                          delay: SCATTER_DELAY_BASE + index * SCATTER_STAGGER,
                        }
                  }
                >
                  <motion.g
                    initial={{ x: 0, y: 0, rotate: 0 }}
                    animate={isHovered ? { x: 0, y: 0, rotate: 0 } : floatAnimation}
                    transition={
                      isHovered
                        ? { duration: 0.2, ease: 'easeOut' }
                        : {
                            duration: 4 + index * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: FLOAT_DELAY_BASE + index * SCATTER_STAGGER,
                          }
                    }
                  >
                    <motion.polygon
                      points={triangle.points}
                      style={{
                        fill: triangle.gradient,
                        stroke: '#fff',
                        strokeLinejoin: 'miter',
                      }}
                      initial={{ strokeWidth: 0 }}
                      animate={{ strokeWidth: isHovered || !iconInView ? 0 : 6 }}
                      transition={{
                        duration: 0.3,
                        delay: STROKE_DELAY_BASE + index * SCATTER_STAGGER,
                      }}
                    />
                  </motion.g>
                </motion.g>
              )
            })}

            <motion.path
              id='White-contour'
              d='M426.127032,276.2220582l52.4979955.049888-144.7419016-199.6212651,16.8568695-51.712901L116.8376936,100.6899969l-42.7094002-31.0923384-.2347587,245.8319475-43.2337943,31.3484777,233.8525564,76.2305714,16.8584374,52.0535647,144.7562979-198.8401616ZM408.799505,276.2163568l-122.5713902,168.3665769-54.5877325-168.549452,23.0294402.0238037-.0005701.0017104,21.4022362.0203828,132.7280165.1369782ZM227.0907394,262.0169497l-10.5520243-32.5901187,26.6582932-19.3264679,26.6514514,19.4054335-10.6114623,32.5442217-32.146258-.0330686ZM275.3858849,262.0666952l-1.4156788-.0014254,54.9191313-168.4318589,122.2491138,168.6003378-175.7525663-.1670535ZM328.8953239,46.7409734l-54.9082985,168.4453999-18.8617968-13.7335957.0618611-.0448992-124.3468328-90.5241955,198.055067-64.1427095ZM88.1138948,97.1107469l12.2466483,8.9155554-.0681328.0220933,130.9944798,95.3798656-19.286415,13.9820379-.0317858-.097923-124.0534914,89.9501985.1986968-208.1518277ZM61.148149,341.9791434l12.7288514-9.2295647-.0001425.1026267,130.7337794-94.7779313,54.5404102,168.4492484-198.0028984-64.5443791Z'
              style={{ fill: '#fff' }}
              initial={{ opacity: 1 }}
              animate={{ opacity: isHovered ? 1 : iconInView ? 0 : 1 }}
              transition={{ duration: 0.3, delay: isHovered ? 0.2 : iconInView ? 0.8 : 0 }}
              className='hidden md:block'
            />
          </svg>
        </motion.div>
      </motion.div>

      <div className='absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-20 md:opacity-30'>
        <div
          className='relative'
          style={{
            maskImage: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)',
            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)',
          }}
        >
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, -8, 8, 0],
              scale: [1, 1.08, 1],
            }}
            initial={{ y: 0, rotate: 0, scale: 1 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <MarsFragments className='w-40 h-40 md:w-126 md:h-126' />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
