import { DEFAULT_SETTINGS } from 'constants/defaultSettings'
import { LocalStorageKeys } from 'constants/localStorageKeys'
import useLocalStorage from 'hooks/localStorage/useLocalStorage'
import chainConfig from 'config/chain'

export default function useDisplayCurrency() {
  return useLocalStorage<string>(
    `${chainConfig.id}/${LocalStorageKeys.DISPLAY_CURRENCY}`,
    DEFAULT_SETTINGS.displayCurrency,
  )
}
