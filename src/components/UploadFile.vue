<template>
  <form @submit.prevent="onSubmit">
    <label for="upload-file-input">File Picker ➡</label>
    &nbsp;
    <input id="upload-file-input" type="file" ref="inputEl" />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import getStorageProvider from '@/lib/storageProvider'

export default {
  name: 'UploadFile',
  methods: {
    async onSubmit () {
      const sp = await getStorageProvider()
      const uploader = await sp.getUploader()
      uploader.onSuccess = () => {
        window.alert('File uploaded.')
      }
      for (const file of this.$refs.inputEl.files) {
        await uploader.upload(file)
      }
    }
  }
}
</script>
