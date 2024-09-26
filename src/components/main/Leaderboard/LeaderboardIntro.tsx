import Card from 'components/common/Card'
import { Leaderboard, MouseGrid, Reward } from 'components/common/Icons'
import Text from 'components/common/Text'

export default function LeaderboardIntro() {
  return (
    <Card className='w-full py-4 px-4 bg-cover bg-white/5 mb-4'>
      <div className='flex justify-evenly items-center'>
        <div className='relative flex flex-col items-center max-w-xs w-full border-r border-white/5 pl-4 pr-2'>
          <div className='absolute bottom-0 flex flex-col items-start z-10 space-y-1'>
            <Text className='text-white/80'>Trade & Climb Leaderboards</Text>
            <Text size='xs' className='text-white/40'>
              Read the competition rules before you join. You will receive $10,000 in testnet funds.
            </Text>
          </div>
          <MouseGrid className='w-full h-full object-cover' />
        </div>

        <div className='relative flex flex-col items-center max-w-xs w-full border-r border-white/5 pl-4 pr-2'>
          <div className='absolute bottom-0 flex flex-col items-start z-10 space-y-1'>
            <Text className='text-white/80'>Trade & Climb Leaderboards</Text>
            <Text size='xs' className='text-white/40'>
              Read the competition rules before you join. You will receive $10,000 in testnet funds.
            </Text>
          </div>
          <Leaderboard className='w-full h-full object-cover' />
        </div>

        <div className='relative flex flex-col items-center max-w-xs w-full pl-4'>
          <div className='absolute bottom-0 flex flex-col items-start z-10 space-y-1'>
            <Text className='text-white/80'>Trade & Climb Leaderboards</Text>
            <Text size='xs' className='text-white/40'>
              Read the competition rules before you join. You will receive $10,000 in testnet funds.
            </Text>
          </div>
          <Reward className='w-full h-full object-cover' />
        </div>
      </div>
    </Card>
  )
}
