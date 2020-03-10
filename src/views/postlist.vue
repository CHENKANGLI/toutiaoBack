<template>
  <div class="postlist">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="javascript:;">文章管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 文章表格 -->
    <el-table :data="postList" style="width: 100%;margin-top:30px" border>
      <el-table-column type="index" label="索引" width="50"></el-table-column>
      <el-table-column prop="create_date" label="时间" width="150">
        <template slot-scope="scope">{{scope.row.create_date|dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="800"></el-table-column>
      <el-table-column prop="type" label="类型" width="100">
        <template slot-scope="scope">{{scope.row.type===1?'文章':'视频'}}</template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="200"></el-table-column>
      <el-table-column prop="handle" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top-start">
            <el-button type="success" icon="el-icon-share" @click="share(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" icon="el-icon-delete" @click="deleteThisRow(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- :hide-on-single-page='true' :只有一页时隐藏-->
    <!-- size-change：页码大小；current-change：当前页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2,4,6,8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 弹框 -->
    <el-dialog title="分享" :visible.sync="shareDialogFormVisible">
      <el-form :model="shareForm">
        <el-form-item label="活动名称" :label-width="'200px'">
          <el-input v-model="shareForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="'200px'">
          <el-select v-model="shareForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shareDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="shareDialogFormVisible = false">发 送</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPostlist } from '../apis/article'
import { dateFormat } from '../filters/dateFormat'
export default {
  data () {
    return {
      postList: [],
      pageSize: 2,
      pageIndex: 1,
      total: 0,
      shareDialogFormVisible: false,
      shareForm: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    edit (data) {
      console.log(data)
      // 跳转到编辑页面
      this.$router.push({ path: `publish/${data.id}` })
    },
    share (data) {
      // console.log(data)
      this.shareDialogFormVisible = true
    },
    deleteThisRow (data) {
      // console.log(data)
      this.$confirm(`此操作将永久删除id为${data.id}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.init()
    },
    async init () {
      let res = await getPostlist({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      // 吐了，API忘了写传参，页码这些参数传不过去
      console.log(res)
      if (res.status === 200) {
        this.postList = res.data.data
        this.total = res.data.total
      }
    }
  },
  filters: {
    dateFormat
  }
}
</script>

<style lang="less" scoped>
</style>
