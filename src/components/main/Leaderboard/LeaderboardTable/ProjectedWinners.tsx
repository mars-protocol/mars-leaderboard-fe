import Table from 'components/common/Table'

interface Props {
  columns: any[]
  data: any[]
  isLoading: boolean
}
export default function ProjectedWinners(props: Props) {
  const { columns, data, isLoading } = props
  return (
    <Table
      title='Projected Winners'
      columns={columns}
      data={data}
      tableBodyClassName='text-lg '
      initialSorting={[]}
      hideCard
    />
  )
}
