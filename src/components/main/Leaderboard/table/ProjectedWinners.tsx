import Table from 'components/common/Table'
import { ColumnDef } from '@tanstack/react-table'
import Text from 'components/common/Text'

interface Props {
  columns: ColumnDef<ProjectedWinnersData>[]
  data: ProjectedWinnersData[]
  lastUpdated: string
}
export default function ProjectedWinners(props: Props) {
  const { columns, data, lastUpdated } = props

  if (!data.length) return []

  return (
    <div className='overflow-auto'>
      <Table title='Projected Winners' columns={columns} data={data} initialSorting={[]} hideCard />
      <Text size='2xs' className='text-white/40 p-2 text-right shrink-0'>
        Last updated: {lastUpdated}
      </Text>
    </div>
  )
}
