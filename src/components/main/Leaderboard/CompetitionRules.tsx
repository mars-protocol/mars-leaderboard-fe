import classNames from 'classnames'
import EscButton from 'components/common/Button/EscButton'
import { Circle } from 'components/common/Icons'
import Overlay from 'components/common/Overlay'
import Text from 'components/common/Text'

interface Props {
  show: boolean
  setShow: (show: boolean) => void
  close: () => void
}

export default function CompetitionRules(props: Props) {
  const { show, setShow, close } = props

  return (
    <Overlay
      className='top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-screen-full h-[calc(100dvh-400px)] md:w-120 md:h-100 overflow-hidden px-4 py-5'
      show={show}
      setShow={setShow}
    >
      <div className='flex items-center justify-between px-4 py-2'>
        <Text size='xl'>Competition Rules</Text>
        <EscButton onClick={() => close()} enableKeyPress />
      </div>

      <div className='h-full flex flex-col justify-between p-4'>
        {COMPETITION_INFO_ITEMS.map((item, index) => (
          <div key={index} className='flex items-center gap-8'>
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
    title: 'Signup between Nov 18, 12pm UTC and Nov 25, 12pm UTC',
    description: 'Mint your credit account to signup.',
  },
  {
    icon: <Circle />,
    title: 'Ensure you’re on Pion-1 Neutron Public Testnet',
    description:
      'You will receive $10,000.00 as testnet funds to trade with just before the competition starts on Monday, Nov 25, 4pm UTC. This is not real money',
  },
  {
    icon: <Circle />,
    title: 'Do not trade before Nov 25, 4pm UTC',
    description: 'Your account will be disqualified if you trade before this date.',
  },
  {
    icon: <Circle />,
    title: 'Trade until Dec 2, 4pm UTC',
    description:
      "Only perps trading will be considered for the competition. Deposits into the Vault are excluded and won't count toward your PNL.",
  },
]
