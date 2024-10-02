import Table from 'components/common/Table'
import { ColumnDef } from '@tanstack/react-table'
import useTradersLiquidations from 'hooks/leaderboard/useTradersLiquidations'

interface Props {
  columns: ColumnDef<LiquidationsData>[]
}
export default function Liquidations(props: Props) {
  const { columns } = props

  const { data, isLoading } = useTradersLiquidations()

  if (!data || isLoading) return []

  return <Table title='Liquidations' columns={columns} data={data} initialSorting={[]} hideCard />
}
