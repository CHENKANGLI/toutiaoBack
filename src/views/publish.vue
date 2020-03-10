<template>
  <div class="publish">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="javascript:;">文章管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-form ref="publish" :model="post" label-width="80px">
        <!-- 文本框 -->
        <el-form-item label="标题:">
          <el-input v-model="post.title"></el-input>
        </el-form-item>
        <!-- 单选按钮 -->
        <el-form-item label="类型:">
          <el-radio-group v-model="post.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 富文本编辑器 -->
        <el-form-item label="内容:">
          <VueEditor :config="config" v-if="post.type===1" ref="wildeditor"/>
          <!-- 上传文件组件 -->
          <el-upload
          class="upload-demo"
          v-if="post.type===2"
          action="http://127.0.0.1:3000/upload"
          :headers="getToken()"
          :on-success="handlesuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>
        <!-- 复选框 -->
        <el-form-item label="栏目:">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="post.categories" @change="handleCheckedCatesChange">
            <el-checkbox v-for="cate in catelist" :label="cate.id" :key="cate.id">{{cate.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 照片墙 -->
        <el-form-item label="封面:">
          <el-upload
            action="http://localhost:3000/upload"
            :headers="getToken()"
            list-type="picture-card"
            :on-success="uploadWP"
            :on-remove="removeWP"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'

import { getCatelist, postPublish, getArticleById } from '../apis/article'
export default {
  data () {
    return {
      checkAll: false,
      catelist: [],
      isIndeterminate: false,
      post: {
        title: '',
        content: '',
        categories: [],
        type: 1,
        cover: []
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.getToken(), // 调用方法返回 Authorization: token
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            console.log('pic' + res)
            insert('http://localhost:3000' + res.data.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.getToken(),
          uploadSuccess (res, insert) {
            console.log('mov' + res)
            insert('http://localhost:3000' + res.data.data.url)
          }
        }
      }
    }
  },
  components: {
    VueEditor
  },
  async mounted () {
    let res = await getCatelist()
    // console.log(res)
    this.catelist = res.data.data.splice(2)

    // 获取文章详情
    let obj = this.$route.params
    if (obj.id) {
      let post = await getArticleById(obj.id)
      console.log(post)
      this.post = post.data.data// 将数据赋给post对象，将获取到的数据渲染到页面
      // console.log(this.post)
      // 设置文本框内容
      if (this.post.type === 1) {
        this.$refs.wildeditor.editor.clipboard.dangerouslyPasteHTML(0, this.post.content)
      }
      // 复选框勾选状态
      this.post.categories = this.post.categories.map(value => {
        return value.id
      })
      // 全选复选框
      if (this.post.categories.length === this.catelist.length || this.post.categories.length === 0) {
        this.isIndeterminate = false
      } else if (this.post.categories.length < this.catelist.length) {
        this.isIndeterminate = true
      }
    }
  },
  methods: {
    // 复选框：全选和全不选
    handleCheckAllChange (val) {
      this.post.categories = val ? this.catelist.map(value => {
        return value.id
      }) : []
      this.isIndeterminate = false
    },
    // 复选框：根据选项判断全选框的显示样式
    handleCheckedCatesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.catelist.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.catelist.length
    },
    // 照片墙文件上传成功后的处理函数
    uploadWP (response, file, fileList) {
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
      this.post.cover.push({ id: response.data.id })
    },
    // 照片墙文件移除成功后的处理函数
    removeWP (response, file, fileList) {
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
      // file即是当前被用户删除的封面
      // 移除封面图片关键在于将数据从post.cover中删除
      let id = file.response.data.id
      for (let i = 0; i < this.post.cover.length; i++) {
        if (this.post.cover[i].id === id) {
          this.post.cover.splice(i, 1)
          break
        }
      }
    },
    // 视频文件上传成功后的钩子
    handlesuccess (response, file, fileList) {
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
      if (response.message === '文件上传成功') {
        this.post.content = 'http://127.0.0.1:3000' + response.data.url
      }
    },
    // 获取token值
    getToken () {
      let token = localStorage.getItem('back_token')
      return { Authorization: token }
    },
    // 点击按钮发布文章
    async onSubmit () {
      if (this.post.type === 1) {
        this.post.content = this.$refs.wildeditor.editor.root.innerHTML
      }
      // 处理栏目分类
      this.post.categories = this.post.categories.map(value => {
        return { id: value }
      })
      let res = await postPublish(this.post)
      console.log(res)
      if (res.data.message === '文章发布成功') {
        this.$message.success('文章发布成功')
        this.$router.push({ name: 'postlist' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 20px;
}
</style>
