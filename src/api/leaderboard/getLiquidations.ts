export default async function getLiquidations(page = 1, pageSize = 15) {
  try {
    const offset = (page - 1) * pageSize
    const response = await fetch(
      `https://testnet-api.marsprotocol.io/v2/liquidations/statistics?chain=neutron&product=creditmanager&offset=${offset}`,
    )
    const data = await response.json()

    const accountsData = data.data[0].top_liquidated_accounts
    const amountsData = data.data[0].top_liquidated_amounts

    const amountMap = new Map()
    amountsData.forEach((amountItem: any) => {
      amountMap.set(amountItem.liquidatee_account_id, amountItem)
    })

    const processedData = accountsData.map((accountItem: any, index: number) => {
      const amountItem = amountMap.get(accountItem.liquidatee_account_id)

      return {
        position: offset + index + 1,
        account_id: accountItem.liquidatee_account_id,
        number_liquidations: accountItem.liquidation_count,
        total_liquidated_amount: amountItem ? amountItem.total_liquidated_amount : '0',
        trader: `Trader ${accountItem.liquidatee_account_id}`,
        // denom: amountItem.liquidation_datas[0].liquidated_denom,
      }
    })

    console.log(processedData, 'processedData')
    return processedData
  } catch (error) {
    console.error('Could not fetch liquidations data.', error)
    return null
  }
}
