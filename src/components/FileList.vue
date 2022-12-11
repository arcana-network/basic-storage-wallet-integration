<template>
  <table>
    <thead>
      <tr>
        <th>DID</th>
        <th>Uploaded On</th>
        <th>Size</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in files" :key="file.did">
        <td>
          {{ file.did }}
        </td>
        <td>
          {{ file.uploaded_on }}
        </td>
        <td>
          {{ file.size }} bytes
        </td>
        <td class="button-container">
          <button @click.prevent="download(file)">Download</button>
          <button @click.prevent="deleteFile(file)">Delete</button>
          <button @click.prevent="share(file)">Share</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.button-container > * {
  margin-left: 4px;
  margin-right: 4px;
}
</style>

<script>
import getStorageProvider from '@/lib/storageProvider'

let downloader, access

export default {
  name: 'FileList',
  data: () => ({
    files: []
  }),
  async mounted () {
    const sp = await getStorageProvider()
    downloader = await sp.getDownloader()
    access = await sp.getAccess()
    this.files = await sp.myFiles()
  },
  methods: {
    download (file) {
      downloader.download(file.did).catch(e => window.alert(e))
    },
    async deleteFile (file) {
      await access.deleteFile(file.did).catch(e => window.alert(e))
      window.alert('File deleted. Reload to see the new file list.')
    },
    async share (file) {
      const addr = window.prompt('Enter an address:')
      await access.share(file.did, [addr], null).catch(e => window.alert(e))
      window.alert('File shared.')
    }
  }
}
</script>
