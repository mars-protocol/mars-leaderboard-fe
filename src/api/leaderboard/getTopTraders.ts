export default async function getTopTraders(page = 1, pageSize = 15) {
  try {
    const offset = (page - 1) * pageSize
    const response = await fetch(
      `https://testnet-api.marsprotocol.io/v2/perps_pnl?chain=neutron&field=total_pnl&order=desc&limit=${pageSize}&offset=${offset}`,
    )
    const data = await response.json()
    const processedData = data.data.map((item: any, index: number) => ({
      ...item,
      position: offset + index + 1,
      trader: `Trader ${item.account_id}`,
    }))
    return processedData
  } catch (error) {
    console.error('Could not fetch top traders data.', error)
    return null
  }
}
