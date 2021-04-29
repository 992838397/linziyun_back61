<template>
  <div class="login">
    <div class="container">
      <img src="@/assets/avatar.jpg" class="avatar" alt="" />
      <!-- 
        el-form 属性说明:
        :model :  他是当前表单所绑定数据源对象,后期表单元素中绑定的户数,就是这个数据对象中某一个属性
        他就是我们需要收集的表单数据对象
        :reles:表单元素的验证规则
       -->
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
        <el-button type="primary" class="login-btn" @click="login"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/apis/user";
export default {
  data() {
    return {
      loginForm: {
        username: "13035808046",
        password: "116616",
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
  methods: {
    login() {
      // 在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。
      // 我们在真正进行提交之前，应该根据用户的验证规则进行数据校验，如果校验通过才发起请求，否则中止本次请求并给出提示
      // 表单有一个validate方法可以实现用户用户的校验，它要传入一个函数做为参数，当校验完成的时候，会将校验的结果以参数的形式传递给这个回调函数
      // 细节:await要在最近的函数快里面加async,*u
      this.$refs.loginForm.validate(async (valid, obj) => {
        if (valid) {
          let res = await userLogin(this.loginForm);
          if (res.data.message == "登录成功") {
            // 提示用户
            this.$message("恭喜您,登录成功啦");
            // 设置token,前置到导航使用
            localStorage.setItem("linziyun_back", res.data.data.token);
            // 跳转页面
            this.$router.push({ name: "index" });
          } else {
            this.$message({
              message: "登录失败,请重新登入哦",
              type: "warning",
            });
          }
        } else {
          // 提示用户
          this.$message.error("用户密码校验失败");
        }
      });
    },
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