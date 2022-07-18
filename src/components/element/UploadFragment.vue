<template>
  <div id="multipart-upload">
    <!-- 拖拽上传 -->
    <!-- <el-upload
      action
      drag
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleChange"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">大小不超过 200M 的视频</div>
    </el-upload> -->
    <!-- 按钮上传 -->
    <el-upload
      action
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleChange"
    >
      <!-- <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">大小不超过 200M 的视频</div> -->
      <el-button size="mini">上传文件</el-button>
    </el-upload>
    <!-- 进度显示 -->
    <!-- <div class="progress-box">
      <span>上传进度：{{ percent.toFixed() }}%</span>
      <el-button type="primary" size="mini" @click="handleClickBtn">{{
        upload | btnTextFilter
      }}</el-button>
    </div> -->

    <!-- 展示上传成功的视频 -->
    <!-- <div v-if="videoUrl">
      <video :src="videoUrl" controls />
    </div> -->
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5'
// import axios from 'axios'

export default {
  name: 'uploadFragment',
  // filters: {
  //   btnTextFilter(val) {
  //     return val ? '暂停' : '继续'
  //   },
  // },
  props: {
    uploadUrl: {
      type: String,
      required: true,
    },
    uploadedUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // percent: 0, // 进度
      // videoUrl: '', //视频链接
      // upload: true, // true上传 false暂停
      // percentCount: 0,
    }
  },
  methods: {
    // 将 File 对象转为 ArrayBuffer
    fileToBuffer(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
          resolve(e.target.result)
        }
        fileReader.readAsArrayBuffer(file)
        fileReader.onerror = () => {
          reject(new Error('转换文件格式发生错误'))
        }
      })
    },
    // 根据文件内容生成 hash 值
    generateFileHash(buffer) {
      const spark = new SparkMD5.ArrayBuffer()
      spark.append(buffer)
      const hash = spark.end()
      return hash
    },
    // 生成chunk
    generateChunk(fileObj) {
      // 将文件按固定大小（2M）进行切片，注意此处同时声明了多个常量
      const chunkSize = 2097152, // 1024*1024
        // 计算切片总数
        chunkListLength = Math.ceil(fileObj.size / chunkSize),
        // 文件后缀名
        suffix = /\.([0-9A-z]+)$/.exec(fileObj.name)[1]
      // 初始切片位置
      let lastChunk = 0
      // 保存所有切片的数组
      const chunkList = []

      for (let i = 0; i < chunkListLength; i++) {
        // 生成切片，这里后端要求传递的参数为字节数据块（chunk）和每个数据块的文件名（fileName）
        const item = {
          chunk: fileObj.slice(lastChunk, lastChunk + chunkSize),
          fileName: `${this.hash}_${i}.${suffix}`, // 文件名规则按照 hash_1.jpg 命名
        }
        lastChunk += chunkSize
        chunkList.push(item)
      }
      return chunkList
    },
    // 生成请求队列
    generateReqQueue() {
      // 根据chunk列表生成请求队列
      let requestList = []
      // requestList.push(uploadRequest)
      requestList = this.chunkList.map((item, index) => async () => {
        const formData = new FormData()
        formData.append('chunk', item.chunk)
        formData.append('filename', item.fileName)
        const { code } = await this.$request({
          url: this.uploadUrl,
          method: 'post',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: formData,
        })
        if (code === '0000') {
          // 上传成功后就删除该 chunk，方便断点续传
          this.chunkList.splice(index, 1)
        }
        // if (res.data.code === '0000') {
        //   if (this.percentCount === 0) {
        //     // 避免上传成功后会删除切片改变 chunkList 的长度影响到 percentCount 的值
        //     this.percentCount = 100 / this.chunkList.length
        //   }
        //   this.percent += this.percentCount // 改变进度
        //   // 上传成功后就删除该 chunk，方便断点续传
        //   this.chunkList.splice(index, 1)
        // }
      })
      return requestList
    },
    // 文件已全部上传
    async uploadCompleted() {
      const { code, msg } = await this.$request({
        url: this.uploadedUrl,
        method: 'get',
        params: { hash: this.hash },
      })
      if (code === '0000') {
        // 视频url赋值
        // this.videoUrl = res.data.path
        this.$message(msg)
      }
    },
    // 分片上传文件
    async uploadFile() {
      // 生成请求队列
      const requestList = this.generateReqQueue()
      // 记录发送的请求个数
      // let requestNum = 0
      // // 文件切片全部发送完毕后，需要请求 '/merge' 接口，把文件的 hash 传递给服务器
      // const emptyQueue = async () => {
      //   // if (!this.upload) return
      //   if (requestNum >= requestList.length) {
      //     // 上传完成
      //     this.uploadCompleted()
      //     return
      //   }
      //   // 根据队列依次发送请求
      //   await requestList[requestNum]()
      //   requestNum++
      //   emptyQueue()
      // }
      // 清空队列
      // emptyQueue()
      // 按照顺序发送请求
      for (let uploadReq of requestList) {
        await uploadReq()
      }
      // console.log('文件已全部上传')
      // 文件已全部上传
      this.uploadCompleted()
      // 同时发送请求
      // await Promise.all(requestList).then(()=>{ this.uploadCompleted() })
    },
    async handleChange(file) {
      if (!file) return
      // this.percent = 0
      // this.videoUrl = ''
      // 获取文件并转成 ArrayBuffer 对象
      const fileObj = file.raw
      let buffer
      try {
        buffer = await this.fileToBuffer(fileObj)
      } catch (e) {
        console.log(e)
      }
      // 根据文件内容生成 hash 值
      this.hash = this.generateFileHash(buffer)
      // 生成chunkList
      this.chunkList = this.generateChunk(fileObj)
      // 分片上传文件
      this.uploadFile()
    },
    // 按下暂停按钮
    // handleClickBtn() {
    //   this.upload = !this.upload
    //   // 如果不暂停则继续上传
    //   if (this.upload) this.uploadFile()
    // },
  },
}
</script>

<style scoped>
.progress-box {
  box-sizing: border-box;
  width: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 8px 10px;
  background-color: #ecf5ff;
  font-size: 14px;
  border-radius: 4px;
}
</style>
