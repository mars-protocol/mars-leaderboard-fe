import { CardWithTabs } from 'components/common/Card/CardWithTabs'
import { useMemo } from 'react'
import TopTraders from 'components/main/Leaderboard/table/TopTraders'
import Liquidations from 'components/main/Leaderboard/table/Liquidations'
import ProjectedWinners from 'components/main/Leaderboard/table/ProjectedWinners'
import useTopTraderColumn from 'components/main/Leaderboard/table/useTopTradersColumn'
import useProjectedWinnersColumn from 'components/main/Leaderboard/table/useProjectedWinnersColumn'
import useLiquidationsColumn from 'components/main/Leaderboard/table/useLiquidationsColumn'
import { rewards } from 'components/main/Leaderboard/data'
import useLiquidations from 'hooks/leaderboard/useTradersLiquidations'
import useTop5Traders from 'hooks/leaderboard/useTop5Traders'

export default function LeaderboardTable() {
  const topTradersColumns = useTopTraderColumn()
  const liquidationsColumns = useLiquidationsColumn()
  const projectedWinnersColumns = useProjectedWinnersColumn()

  const { data: liquidationsData } = useLiquidations()
  const { data: top5Traders } = useTop5Traders()

  const topLiquidation = useMemo(() => {
    if (!liquidationsData || liquidationsData.length === 0) return null
    return liquidationsData[0]
  }, [liquidationsData])

  const projectedWinners = useMemo(() => {
    if (!top5Traders) return rewards

    const top5WithAchievements = top5Traders?.data.map((trader: TopTradersData, index: number) => ({
      ...trader,
      ...rewards[index],
    }))

    const combinedTraders = [
      ...top5WithAchievements,
      {
        ...topLiquidation,
        ...rewards[5],
      },
    ]

    return combinedTraders
  }, [top5Traders, topLiquidation])

  const formattedTime = top5Traders?.last_updated
    ? new Date(top5Traders.last_updated * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'N/A'

  const tabs: CardTab[] = useMemo(() => {
    return [
      {
        title: 'Top Traders',
        renderContent: () => <TopTraders columns={topTradersColumns} />,
      },
      {
        title: 'Liquidations',
        renderContent: () => <Liquidations columns={liquidationsColumns} />,
      },
      {
        title: 'Projected Winners',
        renderContent: () => (
          <ProjectedWinners
            columns={projectedWinnersColumns}
            data={projectedWinners}
            lastUpdated={formattedTime}
          />
        ),
      },
    ]
  }, [
    topTradersColumns,
    projectedWinnersColumns,
    liquidationsColumns,
    projectedWinners,
    formattedTime,
  ])

  if (!tabs.length) return null

  return <CardWithTabs tabs={tabs} className='text-xs md:h-90' />
}
