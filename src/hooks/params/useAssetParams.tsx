import useSWRImmutable from 'swr/immutable'

import getAssetParams from 'api/params/getAssetParams'
import chainConfig from 'config/chain'

export default function useAssetParams() {
  return useSWRImmutable(
    `chains/${chainConfig.id}/assets/params`,
    () => getAssetParams(chainConfig),
    {
      suspense: true,
    },
  )
}
