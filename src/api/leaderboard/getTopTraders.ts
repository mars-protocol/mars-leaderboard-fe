export default async function getTopTraders(page: number) {
  const limit = 6
  try {
    const response = await fetch(
      `https://testnet-api.marsprotocol.io/v2/perps_pnl?chain=neutron&field=total_pnl&order=desc&limit=${limit}&page=${page}`,
    )
    const data = await response.json()
    const offset = (page - 1) * limit

    console.log(data, 'data')
    const processedData = data.data.map((item: any, index: number) => ({
      ...item,
      position: offset + index + 1,
      trader: `Trader ${item.account_id}`,
    }))

    return { data: processedData, total: data.total }
  } catch (error) {
    console.error('Could not fetch top traders data.', error)
    return null
  }
}
