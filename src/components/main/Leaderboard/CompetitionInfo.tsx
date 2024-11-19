import Button from 'components/common/Button'
import { InfoCircle } from 'components/common/Icons'
import Text from 'components/common/Text'
import CompetitionRules from 'components/main/Leaderboard/CompetitionRules'
import { useState } from 'react'

export default function CompetitonInfo() {
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false)

  const openRulesModal = () => {
    setShowRulesModal(true)
  }

  const closeRulesModal = () => {
    setShowRulesModal(false)
  }

  return (
    <div className='relative flex flex-col items-center justify-between gap-8 md:h-full md:w-120 md:pt-8'>
      <div className='absolute top-[-50px] w-full h-[100px] bg-gradient-to-b from-white to-transparent blur-2xl opacity-60' />

      <div className='flex flex-col items-center gap-3'>
        <Text
          size='5xl'
          className='italic font-bold tracking-wide text-white drop-shadow-white-glow'
        >
          $10,000
        </Text>
        <Text className='text-white/80'>Trading Competition</Text>
        <Text size='xs' className='text-white/80'>
          Nov 25, 4pm UTC till Dec 2, 4pm UTC{' '}
        </Text>

        <Text size='xs' className='text-center text-white/40'>
          Have the chance to win up to $4,000 MARS, competition starts soon!{' '}
        </Text>
      </div>
      <div className='flex flex-col items-center gap-2 md:gap-6'>
        <Button
          color='tertiary'
          size='sm'
          text={'Join Competition'}
          onClick={(e) => {
            e.preventDefault()
            window.open('https://perps.marsprotocol.io/', '_blank')
          }}
        />
        <Text size='xs' className='text-center text-white/40'>
          Before joining, ensure you read the
          <span className='inline-block'>
            <Button
              onClick={openRulesModal}
              variant='transparent'
              color='quaternary'
              size='xs'
              rightIcon={<InfoCircle />}
              text={'competition rules'}
            />
          </span>
        </Text>
      </div>

      <CompetitionRules show={showRulesModal} setShow={setShowRulesModal} close={closeRulesModal} />
    </div>
  )
}
