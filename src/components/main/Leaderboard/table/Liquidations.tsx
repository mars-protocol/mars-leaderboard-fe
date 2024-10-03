import Table from 'components/common/Table'
import { ColumnDef } from '@tanstack/react-table'
import useTradersLiquidations from 'hooks/leaderboard/useTradersLiquidations'
import { CircularProgress } from 'components/common/CircularProgress'
import Text from 'components/common/Text'

interface Props {
  columns: ColumnDef<LiquidationsData>[]
}
export default function Liquidations(props: Props) {
  const { columns } = props

  const { data, isLoading } = useTradersLiquidations()

  return (
    <>
      {!data || isLoading ? (
        <div className='flex flex-wrap justify-center w-full gap-4 mt-4'>
          <CircularProgress size={30} />
          <Text className='w-full text-center' size='sm'>
            Fetching data...
          </Text>
        </div>
      ) : (
        <Table title='Liquidations' columns={columns} data={data} initialSorting={[]} hideCard />
      )}
    </>
  )
}
