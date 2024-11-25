export default async function getTop5Traders() {
  const limit = 5
  try {
    const response = await fetch(
      `https://testnet-api.marsprotocol.io/v2/perps_pnl?chain=neutron&field=total_pnl&order=desc&limit=${limit}`,
    )
    const data = await response.json()
    const processedData = data.data.map((item: TraderData, index: number) => ({
      ...item,
      position: index + 1,
      trader: `Trader ${item.account_id}`,
    }))

    return {
      data: processedData,
      last_updated: data.last_updated,
    }
  } catch (error) {
    console.error('Could not fetch top traders data.', error)
    return null
  }
}
