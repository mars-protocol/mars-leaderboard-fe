import chainConfig from 'config/chain'
import { FETCH_TIMEOUT } from 'constants/query'
import { fetchWithTimeout } from 'utils/fetch'
import { getUrl } from 'utils/url'

export default async function getFragmentLeaderboard(page = 1) {
  try {
    const baseUrl = chainConfig.endpoints.amberBackend
    const path = `/fragments/leaderboard?chain=neutron&page=${page}&limit=25`

    // const url = getUrl(`${baseUrl}/fragments/leaderboard?chain=neutron&page=${page}&limit=25`)

    const url = getUrl(baseUrl, path)
    const response = await fetchWithTimeout(`${baseUrl}${path}`, FETCH_TIMEOUT)
    // const response = await fetchWithTimeout(url, FETCH_TIMEOUT)

    if (!response.ok) return []
    const data = await response.json()
    console.log(data, 'datadatadatadata')

    return data
  } catch (error) {
    console.error('Could not fetch fragment leaderboard.', error)
    return []
  }
}
// https://amberfi-backend.prod.mars-dev.net/v2/fragments/leaderboard?chain=neutron&page=1&limit=25
