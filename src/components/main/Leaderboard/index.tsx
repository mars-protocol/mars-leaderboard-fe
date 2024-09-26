import Text from 'components/common/Text'
import { Reward } from 'components/common/Icons'
import LeaderboardTable from './LeaderboardTable'
import Card from 'components/common/Card'

export default function Leaderboard() {
  return (
    // <Card className='bg-white/5 p-4'>
    //   <div className='flex'>
    //     <div className='flex flex-col items-center max-w-xs w-full border-r border-white/5 pl-4 pr-2'>
    //       <div className='flex flex-col items-start z-10 space-y-1'>
    //         <Text size='xl' className='text-white/80'>
    //           $ 10 000
    //         </Text>

    //         <Text className='text-white/80'>Trading Competition</Text>
    //         <Text size='xs' className='text-white/40'>
    //           Read the competition rules before you join. You will receive $10,000 in testnet funds.
    //         </Text>
    //       </div>
    //       {/* <Reward className='w-full h-full object-cover' /> */}
    //     </div>
    <LeaderboardTable />
    //   </div>
    // </Card>
  )
}
