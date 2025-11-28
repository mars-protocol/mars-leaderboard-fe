import chainConfig from 'config/chain'
import { FETCH_TIMEOUT } from 'constants/query'
import { fetchWithTimeout } from 'utils/fetch'

export default async function getFragmentLeaderboardByAddress(address: string) {
  try {
    const baseUrl = chainConfig.endpoints.amberBackend
    const path = `/fragments/leaderboard?chain=neutron&address=${address}`

    const response = await fetchWithTimeout(`${baseUrl}${path}`, FETCH_TIMEOUT)

    if (!response.ok) return null
    const data = await response.json()

    if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
      return data.data[0] as FragmentLeaderboardEntry
    }

    return null
  } catch (error) {
    console.error('Could not fetch fragment leaderboard by address.', error)
    return null
  }
}
