import Text from 'components/common/Text'
import { InfoCircle, Reward } from 'components/common/Icons'
import LeaderboardTable from 'components/main/Leaderboard/LeaderboardTable'
import Card from 'components/common/Card'
import Button from 'components/common/Button'
import Pagination from './table/Pagination'

export default function Leaderboard() {
  return (
    <Card className='bg-white/5 p-4'>
      <div className='flex flex-col md:flex-row'>
        <div className='px-4 py-4'>
          <div className='flex flex-col items-center justify-between md:h-full md:w-80 md:pt-8 gap-8'>
            <div className='flex flex-col items-center gap-3'>
              <Text size='5xl' className='text-white font-bold tracking-wide'>
                $ 10 000
              </Text>
              <Text className='text-white/80'>Trading Competition</Text>
              <Text size='xs' className='text-white/80'>
                10 Aug 9PM UTC - 29 Nov 9PM UTC{' '}
              </Text>

              <Text size='xs' className='text-white/40 text-center'>
                Have the chance to win up to $10,000 USDC, competition starts soon!{' '}
              </Text>
            </div>
            <div className='flex flex-col items-center gap-2 md:gap-6'>
              <Button color='secondary' className='w-30' text={'Join'} onClick={() => {}} />
              <Text size='xs' className='text-white/40 text-center'>
                Before joining, ensure you read the
                <span className='inline-block'>
                  <Button
                    onClick={() => {}}
                    variant='transparent'
                    color='quaternary'
                    size='xs'
                    rightIcon={<InfoCircle />}
                    text={'competition rules'}
                  />
                </span>
              </Text>
            </div>
          </div>
        </div>
        <LeaderboardTable />
      </div>
    </Card>
  )
}
