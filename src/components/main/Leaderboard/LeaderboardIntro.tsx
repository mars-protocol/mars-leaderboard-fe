import Card from 'components/common/Card'
import Divider from 'components/common/Divider'
import { Leaderboard, MouseGrid, Reward } from 'components/common/Icons'
import FeatureCard from 'components/main/Leaderboard/FeatureCard'

export default function LeaderboardIntro() {
  return (
    <Card className='w-full p-4 bg-white/5 mb-4'>
      <div className='flex flex-col md:flex-row justify-evenly items-center'>
        <FeatureCard
          title={'Trade & Climb Leaderboards'}
          description={
            'Read the competition rules before you join. You will receive $10,000 in testnet funds.'
          }
          image={<MouseGrid />}
        />

        <Divider orientation='vertical' className='h-60 mx-4 hidden md:block' />
        <Divider orientation='horizontal' className='my-4 block md:hidden' />

        <FeatureCard
          title={'Trade & Climb Leaderboards'}
          description={
            'Read the competition rules before you join. You will receive $10,000 in testnet funds.'
          }
          image={<Leaderboard />}
        />

        <Divider orientation='vertical' className='h-60 mx-4 hidden md:block' />
        <Divider orientation='horizontal' className='my-4 block md:hidden' />

        <FeatureCard
          title={'Trade & Climb Leaderboards'}
          description={
            'Read the competition rules before you join. You will receive $10,000 in testnet funds.'
          }
          image={<Reward />}
        />
      </div>
    </Card>
  )
}
