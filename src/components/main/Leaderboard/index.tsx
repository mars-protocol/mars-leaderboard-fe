import Card from 'components/common/Card'
import CompetitionInfo from 'components/main/Leaderboard/CompetitionInfo'
import LeaderboardTable from 'components/main/Leaderboard/LeaderboardTable'

export default function Leaderboard() {
  return (
    <Card className='bg-white/5 p-3 md:h-[380px]'>
      <div className='flex flex-col gap-6 md:flex-row'>
        <CompetitionInfo />
        <LeaderboardTable />
      </div>
    </Card>
  )
}
