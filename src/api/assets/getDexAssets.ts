import { convertAstroportAssetsResponse } from 'utils/assets'

export default async function getDexAssets(chainConfig: ChainConfig) {
  const uri = new URL(chainConfig.endpoints.dexAssets)
  try {
    const assets = await fetch(uri.toString()).then(async (res) => {
      const data = (await res.json()) as AstroportAssetsCached
      return convertAstroportAssetsResponse(data.tokens)
    })
    return assets
  } catch (e) {
    console.error(e)
  }
  return []
}
