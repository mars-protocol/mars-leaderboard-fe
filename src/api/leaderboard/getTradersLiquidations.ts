export default async function getTradersLiquidations() {
  try {
    const limit = 6
    const response = await fetch(
      `https://testnet-api.marsprotocol.io/v2/liquidations/statistics?chain=neutron&product=creditmanager&limit=${limit}`,
    )
    const data = await response.json()
    const accountsData = data.data[0].top_liquidated_accounts
    const amountsData = data.data[0].top_liquidated_amounts

    const processedData = accountsData.map((accountItem: LiquidationAccount, index: number) => {
      const amountItem = amountsData.find(
        (item: LiquidationAccount) =>
          item.liquidatee_account_id === accountItem.liquidatee_account_id,
      )

      return {
        position: index + 1,
        account_id: accountItem.liquidatee_account_id,
        number_liquidations: accountItem.liquidation_count,
        total_liquidated_amount: amountItem ? amountItem.total_liquidated_amount : '0',
        trader: `Trader ${accountItem.liquidatee_account_id}`,
      }
    })

    return processedData
  } catch (error) {
    console.error('Could not fetch liquidations data.', error)
    return null
  }
}
