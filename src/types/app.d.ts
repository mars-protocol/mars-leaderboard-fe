type BigNumber = import('bignumber.js').BigNumber

type TableType = 'balances' | 'strategies' | 'perps'

interface ChainConfig {
  name: string
  id: string
  swapFee: number
  contracts: {
    redBank: string
    incentives: string
    oracle: string
    params: string
    creditManager: string
    accountNft: string
    perps: string
    pyth: string
    swapper: string
    dualitySwapper: string
    structuredPoints: string
  }
  endpoints: {
    rest: string
    rpc: string
    fallbackRpc?: string
    fallbackRpcs?: string[]
    routes?: string
    amberBackend: string
  }
  queries: {
    allAssetParams: string
    allMarkets: string
    allCoinBalances: string
  }
}

interface FragmentLeaderboardEntry {
  rank: number
  wallet: string
  total_fragments: string
}

interface FormatOptions {
  minDecimals?: number
  maxDecimals?: number
  thousandSeparator?: boolean
  decimals?: number
  abbreviated?: boolean
  rounded?: boolean
  prefix?: string
  suffix?: string
}
