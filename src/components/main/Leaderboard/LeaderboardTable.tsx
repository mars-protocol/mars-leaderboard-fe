import { CardWithTabs } from 'components/common/Card/CardWithTabs'
import { useMemo } from 'react'
import TopTraders from 'components/main/Leaderboard/table/TopTraders'
import Liquidations from 'components/main/Leaderboard/table/Liquidations'
import ProjectedWinners from 'components/main/Leaderboard/table/ProjectedWinners'
import useTopTraderColumn from 'components/main/Leaderboard/table/useTopTradersColumn'
import useProjectedWinnersColumn from 'components/main/Leaderboard/table/useProjectedWinnersColumn'
import useLiquidationsColumn from 'components/main/Leaderboard/table/useLiquidationsColumn'
import { achievements } from 'components/main/Leaderboard/data'

export default function LeaderboardTable() {
  const topTradersColumns = useTopTraderColumn()
  const projectedWinnersColumns = useProjectedWinnersColumn()
  const liquidationsColumns = useLiquidationsColumn()

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
          <ProjectedWinners columns={projectedWinnersColumns} data={achievements} />
        ),
      },
    ]
  }, [topTradersColumns, projectedWinnersColumns, liquidationsColumns])

  if (!tabs.length) return null

  return <CardWithTabs tabs={tabs} className='text-xs h-100 md:h-90' />
}
