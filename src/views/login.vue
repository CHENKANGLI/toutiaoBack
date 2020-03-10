<template>
  <div class="login">
      <img src="../assets/avatar.jpg" alt="" class="avatar">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="icon-user"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="icon-key"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="loginBtn" @click="loginSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '../apis/user'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度为4到8个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度为4到8个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginSubmit () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let res = await login(this.loginForm)
          console.log(res)
          if (res.data.message === '登录成功') {
            localStorage.setItem('back_token', res.data.data.token)
            this.$router.push({ path: '/index' })
          } else {
            this.$message.error(res.data.message)
          }
        } else {
          this.$message.error('输入不合法')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    background-color: #ccc;
    position: relative;
  .avatar {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-30%);
    z-index: 999;
    border: 8px solid #fff;
    box-shadow: 0 0 2px #000;
    border-radius: 50%;
  }
  .demo-ruleForm {
    width: 30%;
    padding: 50px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .loginBtn {
    width: 100%;
  }
}
</style>
