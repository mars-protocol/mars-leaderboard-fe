import Text from 'components/common/Text'
import { Discord, GitHub, Logo, Telegram, Twitter } from 'components/common/Icons'
import Image from 'next/image'

const socialLinks = [
  {
    url: 'https://x.com/mars_protocol',
    label: 'Mars Protocol on X (Twitter)',
    icon: Twitter,
  },
  {
    url: 'https://t.me/marsprotocol',
    label: 'Mars Protocol on Telegram',
    icon: Telegram,
  },
  {
    url: 'https://discord.marsprotocol.io/',
    label: 'Mars Protocol on Discord',
    icon: Discord,
  },
  {
    url: 'https://github.com/mars-protocol',
    label: 'Mars Protocol on GitHub',
    icon: GitHub,
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='mt-auto border-t border-white/10'>
      <div className='px-4 py-8 mx-auto max-w-content sm:px-6'>
        <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-8 sm:gap-12'>
          <div className='flex gap-3 items-center justify-center'>
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.url}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.label}
                  className='flex justify-center items-center w-10 h-10 rounded-sm border transition-colors border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10'
                >
                  <IconComponent className='w-5 h-5' />
                </a>
              )
            })}
          </div>

          <div className='flex items-center justify-center gap-6'>
            <a
              href='https://app.marsprotocol.io'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Mars Protocol'
              className='transition-opacity hover:opacity-80'
            >
              <Logo className='h-8 w-auto' />
            </a>
            <a
              href='https://app.amberfi.io'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Amber Finance'
              className='transition-opacity hover:opacity-80'
            >
              <Image
                src='/AmberLogo.svg'
                alt='Amber Finance'
                width={120}
                height={42}
                className='h-8 w-auto'
                loading='lazy'
              />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className='pt-4'>
          <Text size='sm' className='text-center sm:text-left text-white/60'>
            © {currentYear} Mars Protocol. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
