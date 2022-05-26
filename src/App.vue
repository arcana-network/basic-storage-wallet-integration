<template>
  <p v-if="!loggedIn">Loading.</p>
  <HelloWorld v-else />
</template>

<script>
import HelloWorld from '@/components/HelloWorld'

import getStorageProvider, { getWalletInstance } from '@/lib/storageProvider'

export default {
  name: 'App',
  data: () => ({
    loggedIn: false
  }),
  components: {
    HelloWorld
  },
  async mounted () {
    const provider = await getWalletInstance()
    provider.on('connect', async () => {
      const sp = await getStorageProvider(provider)
      await sp.login()
      this.loggedIn = true
    })
  }
}
</script>
