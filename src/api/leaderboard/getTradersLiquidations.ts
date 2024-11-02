export default async function getTradersLiquidations() {
  try {
    const limit = 6
    const response = await fetch(
      `https://testnet-api.marsprotocol.io/v2/liquidations/statistics?chain=neutron&product=creditmanager&limit=${limit}`,
    )
    const data = await response.json()
    const topLiquidations = data.data[0].top_liquidated_amounts

    const processedData = topLiquidations.map((liquidation: LiquidationAmount, index: number) => {
      return {
        position: index + 1,
        account_id: liquidation.liquidatee_account_id,
        total_liquidated_amount: liquidation.total_liquidated_amount,
        trader: `Trader ${liquidation.liquidatee_account_id}`,
      }
    })

    return processedData
  } catch (error) {
    console.error('Could not fetch liquidations data.', error)
    return null
  }
}
