import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

const getYearAndMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}-${now.getMonth() + 1}`
}

const generateFilePath = (fileType) => {
  const fileName = uuidv4()
  return `files/${getYearAndMonth()}/${fileName}.${fileType}`
}

const objectStorage = {
  install(Vue) {
    Vue.prototype.$uploadFiles = async function(fileList) {
      try {
        const pathList = []
        for (const file of fileList) {
          const fileType = file.type.split('/')[1]
          const filePath = generateFilePath(fileType)
          const storageRef = this.$fire.storage.ref(filePath)
          await storageRef.put(file)
          pathList.push(filePath)
        }
        return pathList
      } catch (e) {
        console.log(e.message)
        return []
      }
    }

    Vue.prototype.$downloadFiles = async function(pathList) {
      try {
        const urlList = []
        for (const path of pathList) {
          const storageRef = this.$fire.storage.ref(path)
          urlList.push(await storageRef.getDownloadURL())
        }
        return urlList
      } catch (e) {
        console.log(e.message)
        return []
      }
    }
  }
}

Vue.use(objectStorage)
