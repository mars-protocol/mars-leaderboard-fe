import getFragmentLeaderboardByAddress from 'api/leaderboard/getFragmentLeaderboardByAddress'
import chainConfig from 'config/chain'
import useSWR from 'swr'

export default function useFragmentLeaderboardByAddress(address: string | undefined) {
  return useSWR(
    chainConfig.endpoints.amberBackend && address
      ? `chains/${chainConfig.id}/fragmentLeaderboard/address/${address}`
      : null,
    async () => {
      if (!address) return null
      return await getFragmentLeaderboardByAddress(address)
    },
    {
      revalidateOnFocus: false,
      suspense: false,
    },
  )
}
