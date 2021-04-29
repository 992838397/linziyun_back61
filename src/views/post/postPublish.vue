<template>
  <div class="postPublish">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">文章管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>文章添加</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容卡片 -->
    <el-card class="box-card" style="margin-top: 20px">
      <!-- 表单 -->
      <el-form ref="post" :model="post" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="post.title"></el-input>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item label="类型">
          <el-radio-group v-model="post.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容">
          <VueEditor :config="config" v-if="post.type == 1" />

          <el-upload action="" class="upload-demo" v-else>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频</div>
          </el-upload>
        </el-form-item>
        <!-- 文件上传 -->
      </el-form>
      <el-button type="primary" @click="postPublish">提交</el-button>
    </el-card>
  </div>
</template>

<script>
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  components: { VueEditor },
  data() {
    return {
      post: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1,
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.url);
          },
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.url);
          },
        },
      },
    };
  },
  methods: {
    postPublish() {
      console.log(this.post);
    },
  },
};
</script>

<style>
</style>