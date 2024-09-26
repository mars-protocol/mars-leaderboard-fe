import { CardWithTabs } from 'components/common/Card/CardWithTabs'
import { useMemo } from 'react'
import TopTraders from 'components/main/Leaderboard/LeaderboardTable/TopTraders'
import Liquidations from 'components/main/Leaderboard/LeaderboardTable/Liquidations'
import ProjectedWinners from 'components/main/Leaderboard/LeaderboardTable/ProjectedWinners'
import useTopTraderColumn from './LeaderboardTable/useTopTradersColumn'
import useProjectedWinnersColumn from './LeaderboardTable/useProjectedWinnersColumn'
import useLiquidationsColumn from './LeaderboardTable/useLiquidationsColumn'
import { achievements, topLiquidations, topTraders } from 'components/main/Leaderboard/data'
import useTopTraders from 'hooks/leaderboard/useTopTraders'

export default function LeaderboardTable() {
  const { data: topTradersData } = useTopTraders()
  console.log(topTradersData, 'topTradersData')
  const topTradersColumns = useTopTraderColumn(topTradersData)
  const projectedWinnersColumns = useProjectedWinnersColumn()
  const liquidationsColumns = useLiquidationsColumn()

  const tabs: CardTab[] = useMemo(
    () => [
      {
        title: 'Top Traders',
        renderContent: () => (
          <TopTraders columns={topTradersColumns} data={topTradersData} isLoading={false} />
        ),
      },
      {
        title: 'Liquidations',
        renderContent: () => (
          <Liquidations columns={liquidationsColumns} data={topLiquidations} isLoading={false} />
        ),
      },
      {
        title: 'Projected Winners',
        renderContent: () => (
          <ProjectedWinners
            columns={projectedWinnersColumns}
            data={achievements}
            isLoading={false}
          />
        ),
      },
    ],
    [],
  )

  return <CardWithTabs tabs={tabs} />
}
