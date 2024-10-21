import Table from 'components/common/Table'
import { ColumnDef } from '@tanstack/react-table'

interface Props {
  columns: ColumnDef<ProjectedWinnersData>[]
  data: ProjectedWinnersData[]
}
export default function ProjectedWinners(props: Props) {
  const { columns, data } = props

  if (!data.length) return []

  return (
    <Table title='Projected Winners' columns={columns} data={data} initialSorting={[]} hideCard />
  )
}
