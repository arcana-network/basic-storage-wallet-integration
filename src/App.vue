<template>
  <p v-if="!loggedIn">Loading.</p>
  <HelloWorld v-else />
</template>

<script>
import HelloWorld from '@/components/HelloWorld'

import getStorageProvider from '@/lib/storageProvider'

export default {
  name: 'App',
  data: () => ({
    loggedIn: false
  }),
  components: {
    HelloWorld
  },
  async mounted () {
    const sp = await getStorageProvider()
    await sp.login()
    this.loggedIn = true
  }
}
</script>
