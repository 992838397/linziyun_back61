<template>
  <div class="login">
    <div class="container">
      <img src="@/assets/avatar.jpg" class="avatar" alt="" />
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
            >></el-input
          >
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <el-button type="primary" class="login-btn">主要按钮</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          // required:true  必填项    message:不符合验证规则提示信息  trigger:触发时机
          { required: true, message: "请输入11位手机号", trigger: "blur" },
          // pattern:正则
          {
            pattern: /^1[35789]\d{9}$/,
            message: "手机号码是十一位,且1开头",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入3~16位密码", trigger: "blur" },
          {
            pattern: /^.{3,16}$/,
            message: "请输入3-16位密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>