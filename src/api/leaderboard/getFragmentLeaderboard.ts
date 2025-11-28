import chainConfig from 'config/chain'
import { FETCH_TIMEOUT } from 'constants/query'
import { fetchWithTimeout } from 'utils/fetch'

export default async function getFragmentLeaderboard(page = 1) {
  try {
    const baseUrl = chainConfig.endpoints.amberBackend
    const path = `/fragments/leaderboard?chain=neutron&page=${page}&limit=25`

    const response = await fetchWithTimeout(`${baseUrl}${path}`, FETCH_TIMEOUT)

    if (!response.ok) {
      return {
        data: [],
        page: page,
        limit: 25,
        total: 0,
        last_updated: 0,
      }
    }
    const data = await response.json()

    return data
  } catch (error) {
    console.error('Could not fetch fragment leaderboard.', error)
    return {
      data: [],
      page: page,
      limit: 25,
      total: 0,
      last_updated: 0,
    }
  }
}
