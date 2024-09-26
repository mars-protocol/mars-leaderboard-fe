import { CardWithTabs } from 'components/common/Card/CardWithTabs'
import { useMemo } from 'react'
import TopTraders from 'components/main/Leaderboard/LeaderboardTable/TopTraders'
import Liquidations from 'components/main/Leaderboard/LeaderboardTable/Liquidations'
import ProjectedWinners from 'components/main/Leaderboard/LeaderboardTable/ProjectedWinners'
import useTopTraderColumn from './LeaderboardTable/useTopTradersColumn'
import useProjectedWinnersColumn from './LeaderboardTable/useProjectedWinnersColumn'
import useLiquidationsColumn from 'components/main/Leaderboard/LeaderboardTable/useLiquidationsColumn'
import { achievements, topLiquidations } from 'components/main/Leaderboard/data'
import useTopTraders from 'hooks/leaderboard/useTopTraders'

export default function LeaderboardTable() {
  const { data: topTradersData, isLoading } = useTopTraders()
  const topTradersColumns = useTopTraderColumn(topTradersData)
  const projectedWinnersColumns = useProjectedWinnersColumn()
  const liquidationsColumns = useLiquidationsColumn()

  const tabs: CardTab[] = useMemo(() => {
    if (!topTradersData || isLoading) return []
    return [
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
    ]
  }, [topTradersData, isLoading, topTradersColumns, projectedWinnersColumns, liquidationsColumns])

  if (tabs.length === 0) return null

  return <CardWithTabs tabs={tabs} />
}
