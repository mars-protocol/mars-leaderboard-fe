export default async function getTopTraders(
  page: number,
  sortOrder: 'asc' | 'desc',
  sortField: string,
) {
  const limit = 6
  try {
    const response = await fetch(
      `https://testnet-api.marsprotocol.io/v2/perps_pnl?chain=neutron&field=${sortField}&order=${sortOrder}&limit=${limit}&page=${page}`,
    )
    const data = await response.json()
    const offset = (page - 1) * limit
    const totalEntries = data.total

    const processedData = data.data.map((item: TraderData, index: number) => {
      const position = sortOrder === 'desc' ? offset + index + 1 : totalEntries - offset - index

      return {
        ...item,
        position,
        trader: `Trader ${item.account_id}`,
      }
    })

    return { data: processedData, total: data.total, last_updated: data.last_updated }
  } catch (error) {
    console.error('Could not fetch top traders data.', error)
    return null
  }
}
