import { CardWithTabs } from 'components/common/Card/CardWithTabs'
import { useMemo } from 'react'
import TopTraders from 'components/main/Leaderboard/table/TopTraders'
import Liquidations from 'components/main/Leaderboard/table/Liquidations'
import ProjectedWinners from 'components/main/Leaderboard/table/ProjectedWinners'
import useTopTraderColumn from 'components/main/Leaderboard/table/useTopTradersColumn'
import useProjectedWinnersColumn from 'components/main/Leaderboard/table/useProjectedWinnersColumn'
import useLiquidationsColumn from 'components/main/Leaderboard/table/useLiquidationsColumn'
import { achievements } from 'components/main/Leaderboard/data'
import useTopTraders from 'hooks/leaderboard/useTopTraders'
import useTradersLiquidations from 'hooks/leaderboard/useTradersLiquidations'

export default function LeaderboardTable() {
  const { data: topTradersData, isLoading: isTopTradersLoading } = useTopTraders()
  const { data: topTradersLiquidationsData, isLoading: isTradersLiquidationsLoading } =
    useTradersLiquidations()

  const topTradersColumns = useTopTraderColumn()
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
            data={topTradersLiquidationsData}
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
    topTradersLiquidationsData,
  ])

  if (!tabs.length) return null

  return <CardWithTabs tabs={tabs} className='text-xs' />
}
