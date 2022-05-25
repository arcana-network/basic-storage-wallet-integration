import { StorageProvider } from '@arcana/storage'
import { WalletProvider, AppMode } from '@arcana/wallet'

let storageProvider

export default async function getStorageProvider () {
  const wallet = new WalletProvider({
    appId: process.env.VUE_APP_ARCANA_APP_ID,
    inpageProvider: false /* sets window.arcana.provider and tries to set window.ethereum to the provider */
  })
  await wallet.init({ appMode: AppMode.Widget, position: 'right' })
  const provider = wallet.getProvider()

  if (!storageProvider) {
    storageProvider = new StorageProvider({
      appId: process.env.VUE_APP_ARCANA_APP_ID,
      gateway: 'https://gateway-dev.arcana.network/api/v1/',
      provider
    })
  }

  return storageProvider
}
