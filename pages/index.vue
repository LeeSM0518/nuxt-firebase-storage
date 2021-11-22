<template>
  <el-container>
    <el-main>
      <el-upload
        class='avatar-uploader'
        action='#'
        list-type='picture-card'
        :on-success='handleSuccess'>
        <i slot='default' class='el-icon-plus'></i>
        <div slot='file' slot-scope='{file}'>
          <img class='el-upload-list__item-thumbnail' :src='file.url' alt=''>
        </div>
      </el-upload>
      <el-button @click='uploadFiles'>upload to server</el-button>
      <el-button @click='downloadFile'>download from server</el-button>
      <div v-if='downloadFiles.length !== 0'>
        <img v-for='file in downloadFiles' :key='file' :src='file' class='avatar'>
      </div>
    </el-main>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      uploadedFiles: [],
      uploadedPaths: [],
      downloadFiles: []
    }
  },
  methods: {
    handleSuccess(_, file) {
      this.uploadedFiles.push(file.raw)
    },
    async uploadFiles() {
      console.log(this.uploadedFiles)
      this.uploadedPaths = await this.$uploadFiles(this.uploadedFiles)
      console.log(this.uploadedPaths)
      // for (const file of this.uploadedFiles) {
      //   try {
      //     const storageRef = this.$fire.storage.ref(`image/${file.name}`)
      //     await storageRef.put(file)
      //     console.log(`uploaded file : ${file.name}`)
      //   } catch (e) {
      //     console.log(e.message)
      //   }
      // }
    },
    async downloadFile() {
      this.downloadFiles = await this.$downloadFiles(this.uploadedPaths)
      console.log(this.downloadFiles)
      // for (const file of this.uploadedFiles) {
      //   try {
      //     const storageRef = await this.$fire.storage.ref(`image/${file.name}`)
      //     const url = await storageRef.getDownloadURL()
      //     this.downloadFiles.push(url)
      //     console.log(`downloaded file : ${file.name}`)
      //   } catch (e) {
      //     console.log(e.message)
      //   }
      // }
    }
  }
}
</script>

<style>
</style>
