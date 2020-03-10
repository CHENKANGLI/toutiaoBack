<template>
  <div class="index">
    <el-container>
      <el-aside>
        <div class="logo"></div>
        <el-menu
          :router="true"
          :unique-opened="true"
          default-active="1-1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-more"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/index/userlist" class="el-icon-document">&nbsp;用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-more"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/index/postlist" class="el-icon-document">&nbsp;文章列表</el-menu-item>
            <el-menu-item index="/index/publish" class="el-icon-s-promotion">&nbsp;发布文章</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-more"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item index="/index/catelist" class="el-icon-document">&nbsp;栏目列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="el-icon-s-unfold"></span>
          <span class="title">黑马头条后台管理系统</span>
          <span class="welcome">欢迎您，user<span class="el-icon-switch-button"></span></span>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.index {
  width: 100%;
  height: 100%;
  > .el-container {
    width: 100%;
    height: 100%;
    > .el-aside {
      background-color: #545c64;
      .el-menu {
        border-right: none;
      }
    }

    .el-header {
      background-color: #545c64;
      text-align: center;
      line-height: 50px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-icon-s-unfold {
          font-size: 50px;
      }
      .title {
          font-size: 40px;
      }
      .welcome {
          font-size: 20px;
          .el-icon-switch-button {
              margin-left: 20px;
              font-size: 30px;
          }
      }
    }
    .logo {
      height: 60px;
      background: url(../assets/logo.png);
      background-size: cover;
      background-color: #fff;
    }
  }
}
</style>
