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
        <td>
          <button @click.prevent="download(file)">Download</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import getStorageProvider from '@/lib/storageProvider'

let downloader

export default {
  name: 'FileList',
  data: () => ({
    $downloader: null,
    files: []
  }),
  async mounted () {
    const sp = await getStorageProvider()
    downloader = await sp.getDownloader()
    this.files = await sp.myFiles()
  },
  methods: {
    download (file) {
      downloader.download(file.did).catch(e => console.error(e))
    }
  }
}
</script>
