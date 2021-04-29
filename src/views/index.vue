<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <!-- logo背景图片 -->
        <div class="logo"></div>
        <!--
           el-menu:整个菜单组件
           unique-opened:true   是否只保持一个子菜单的展开
           router：true        	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
         -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 
            el-submenu：一级菜单项
            index：一级菜单项的唯一标志，这个标志如果一样，就会造成同时展开和合并
           -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- 
              el-menu-item：菜单选项
              index：子项的唯一标志，如果这个值一样，就会同时添加样式和移除样式
             -->
            <el-menu-item index="/login">
              <i class="el-icon-location"></i>
              <span>用户列表</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="el-icon-location"></i>
              <span>用户添加</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="postList">
              <i class="el-icon-location"></i>
              <span>文章列表</span>
            </el-menu-item>
            <el-menu-item index="postPublish">
              <i class="el-icon-location"></i>
              <span>文章添加</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-location"></i>
              <span>栏目列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-location"></i>
              <span>栏目添加</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="el-icon-s-fold toggle-btn"></span>
          <span class="system-title">黑马头条后台管理系统</span>
          <div class="welcome">
            <span>欢迎你</span> &nbsp;&nbsp;
            <span> 退出</span>
          </div>
        </el-header>
        <el-main>
          <!-- 路由渲染的地方 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.index {
  height: 100vh;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>