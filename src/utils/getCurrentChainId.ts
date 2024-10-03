import { LocalStorageKeys } from 'constants/localStorageKeys'
import { ChainInfoID } from 'types/enums'

const SUPPORTED_CHAIN_IDS = [ChainInfoID.Osmosis1, ChainInfoID.Neutron1]

export const getCurrentChainId = () => {
  const localStorageChainId = localStorage.getItem(LocalStorageKeys.CURRENT_CHAIN_ID) as ChainInfoID

  if (SUPPORTED_CHAIN_IDS.includes(localStorageChainId)) {
    return localStorageChainId
  }

  return ChainInfoID.Neutron1
}
