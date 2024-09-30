import { CardWithTabs } from 'components/common/Card/CardWithTabs'
import { useMemo } from 'react'
import TopTraders from 'components/main/Leaderboard/table/TopTraders'
import Liquidations from 'components/main/Leaderboard/table/Liquidations'
import ProjectedWinners from 'components/main/Leaderboard/table/ProjectedWinners'
import useTopTraderColumn from 'components/main/Leaderboard/table/useTopTradersColumn'
import useProjectedWinnersColumn from 'components/main/Leaderboard/table/useProjectedWinnersColumn'
import useLiquidationsColumn from 'components/main/Leaderboard/table/useLiquidationsColumn'
import { achievements, topLiquidations } from 'components/main/Leaderboard/data'
import useTopTraders from 'hooks/leaderboard/useTopTraders'
import useLiquidations from 'hooks/leaderboard/useLiquidations'

export default function LeaderboardTable() {
  const { data: topTradersData, isLoading: isTopTradersLoading } = useTopTraders()
  const { data: topLiquidationsData, isLoading: isLiquidationsLoading } = useLiquidations()

  console.log(topLiquidationsData, 'topLiquidationsDatatopLiquidationsDatatopLiquidationsData')

  const topTradersColumns = useTopTraderColumn(topTradersData)
  const projectedWinnersColumns = useProjectedWinnersColumn()
  const liquidationsColumns = useLiquidationsColumn()

  const tabs: CardTab[] = useMemo(() => {
    if (!topTradersData || isTopTradersLoading) return []
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
          <Liquidations
            columns={liquidationsColumns}
            data={topLiquidationsData}
            isLoading={false}
          />
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
  }, [
    topTradersData,
    isTopTradersLoading,
    topTradersColumns,
    projectedWinnersColumns,
    liquidationsColumns,
    topLiquidationsData,
  ])

  if (!tabs.length) return null

  return <CardWithTabs tabs={tabs} />
}
