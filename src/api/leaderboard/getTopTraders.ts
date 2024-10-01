export default async function getTopTraders() {
  try {
    const response = await fetch(
      `https://testnet-api.marsprotocol.io/v2/perps_pnl?chain=neutron&field=total_pnl&order=desc&limit=100`,
    )
    const data = await response.json()
    const processedData = data.data.map((item: any, index: number) => ({
      ...item,
      position: index + 1,
      trader: `Trader ${item.account_id}`,
    }))

    return processedData
  } catch (error) {
    console.error('Could not fetch top traders data.', error)
    return null
  }
}
