import Text from 'components/common/Text'
import Overlay from 'components/common/Overlay'
import EscButton from 'components/common/Button/EscButton'
import classNames from 'classnames'
import { Circle } from 'components/common/Icons'

interface Props {
  show: boolean
  setShow: (show: boolean) => void
  close: () => void
}

export default function CompetitionRules(props: Props) {
  const { show, setShow, close } = props
  const onClose = () => {
    close()
  }

  return (
    <Overlay
      className='top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-screen-full h-[calc(100dvh-400px)] md:w-120 md:h-100 overflow-hidden px-4 py-5'
      show={show}
      setShow={setShow}
    >
      <div className='flex justify-between items-center p-4'>
        <Text size='xl'>Competition Rules</Text>
        <EscButton onClick={onClose} enableKeyPress />
      </div>

      <div className='flex flex-col gap-10 p-4'>
        {COMPETITION_INFO_ITEMS.map((item, index) => (
          <div key={index} className='flex gap-8 items-center'>
            <div
              className={classNames(
                'rounded-sm relative h-10 w-10 p-2 bg-white/10 flex justify-center items-center flex-shrink-0',
                'before:content-[" "] before:absolute before:inset-0 before:rounded-sm before:p-[1px] before:border-glas before:-z-1',
              )}
            >
              {item.icon}
            </div>
            <div className='flex flex-col'>
              <Text size='sm'>{item.title}</Text>
              <Text size='xs' className='text-white/60'>
                {item.description}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Overlay>
  )
}

export const COMPETITION_INFO_ITEMS = [
  {
    icon: <Circle />,
    title: 'Ensure you’re on Pion-1 Neutron Public Testnet',
    description:
      'You will receive $10,000.00 as testnet funds to trade with. This is not real money.',
  },
  {
    icon: <Circle />,
    title: 'Do not trade before 10 Oct 2024, 9PM UTC',
    description: 'Your account will be disqualified if you trade before this date.',
  },
  {
    icon: <Circle />,
    title: 'Trade until 29 Nov 2024 at 9PM UTC',
    description: 'Only perps trading will be considered for the competition.',
  },
]
