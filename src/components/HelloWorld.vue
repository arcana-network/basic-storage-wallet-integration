<template>
  <div>
    <UploadFile />
    <FileList />
  </div>
</template>

<script>
import UploadFile from '@/components/UploadFile'
import FileList from '@/components/FileList'

export default {
  name: 'HelloWorld',
  components: {
    UploadFile,
    FileList
  }
}
</script>
