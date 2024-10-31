import Card from 'components/common/Card'
import Divider from 'components/common/Divider'
import { Leaderboard, MouseGrid, Reward } from 'components/common/Icons'
import FeatureCard from 'components/main/Leaderboard/FeatureCard'

export default function LeaderboardIntro() {
  return (
    <Card className='w-full p-4 bg-white/5 mb-4'>
      <div className='flex flex-col md:flex-row justify-evenly items-center'>
        <FeatureCard
          title={'Join Competition'}
          description={
            'Read the competition rules before you join. You will receive $10,000 in testnet funds.'
          }
          image={<MouseGrid />}
        />

        <Divider orientation='vertical' className='h-60 mx-4 hidden md:block' />
        <Divider orientation='horizontal' className='my-4 block md:hidden' />

        <FeatureCard
          title={'Trade & Climb Leaderboards'}
          description={'Rise to the top by trading and securing your spot on the leaderboard.'}
          image={<Leaderboard />}
        />

        <Divider orientation='vertical' className='h-60 mx-4 hidden md:block' />
        <Divider orientation='horizontal' className='my-4 block md:hidden' />

        <FeatureCard
          title={'Get Rewarded'}
          description={
            'Compete, perform, and earn your rewards! Top traders will receive a share of the prize pool.'
          }
          image={<Reward />}
        />
      </div>
    </Card>
  )
}
