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
          <VueEditor :config="config" v-if="post.type == 1" ref="myeditor" />
          <!--
                action:必传参数 
                headers:传递token
                on-success:成功后的回调
             -->
          <el-upload
            :action="this.axios.defaults.baseURL + '/upload'"
            :headers="getToken()"
            :on-success="handlerSuccess"
            class="upload-demo"
            v-else
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频</div>
          </el-upload>
        </el-form-item>
        <!-- 栏目全选 -->
        <el-form-item label="栏目">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="checkedCcates"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="city in cateList"
              :label="city.id"
              :key="city.id"
              >{{ city.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>

        <!-- 封面 -->
        <el-form-item label="封面">
          <el-upload
            :action="this.axios.defaults.baseURL + '/upload'"
            :headers="getToken()"
            list-type="picture-card"
            :on-success="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-button type="primary" @click="postPublish">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
import axios from "@/utils/request.js";
import { getCateList, postPublish } from "@/apis/post";
export default {
  components: { VueEditor },
  data() {
    return {
      axios,
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
          url: axios.defaults.baseURL + "/upload",
          name: "file",
          // 传递token
          headers: this.getToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert(axios.defaults.baseURL + res.data.data.url);
          },
        },

        // 上传视频的配置
        // uploadVideo: {
        //   url: "http://localhost:3000/upload",
        //   name: "file",
        //   uploadSuccess(res, insert) {
        //     insert("http://localhost:3000" + res.data.url);
        //   },
        // },
      },

      checkAll: false, //全选
      isIndeterminate: false, //不确定的
      // checkedCities: false, //复选框的按钮
      cateList: [],
      checkedCcates: [], //// 当前用户所选择的复选框选项值的集合：id集合
    };
  },
  async mounted() {
    let res = await getCateList();
    this.cateList = res.data.data;
    // 头条和关注不参与选择
    if (localStorage.getItem("linziyun_back")) {
      this.cateList.splice(0, 2);
    } else {
      this.cateList.splice(0, 1);
    }
  },
  methods: {
    // 封面上传成功的回调 文件上传成功时的钩子
    handlePictureCardPreview(res) {
      // 上传成功,我们添加到cover里面去  以id的形式
      // 这里注意，后台接口需要的数据是上传成功之后的id
      this.post.cover.push({
        id: res.data.id,
      });
      console.log(res);
    },
    // 封面 文件列表移除文件时的钩子
    handleRemove(res, file) {
      // 因为后台要求我们返回id,所以删除的时候也删除id就行了
      let id = res.response.data.id;
      this.post.cover = this.post.cover.filter((v) => {
        return v.id !== id;
      });
    },

    // 这是全选
    // 逻辑:  点击全选,就是把所有的id都选上,全不选,空数组
    handleCheckAllChange(val) {
      this.checkedCcates = val
        ? this.cateList.map((v) => {
            return v.id;
          })
        : [];
      this.isIndeterminate = false;
    },
    // 如果全部选中,全选就会选中,否则没有
    handleCheckedCitiesChange(val) {
      let checkedCount = val.length;
      // 如果栏目长度全部选中,就是等于栏目的长度的话,就为true,也就是选中全选
      this.checkAll = checkedCount === this.cateList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cateList.length;
    },

    // 上传成功的回调
    handlerSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.post.content = response.data.url;
    },
    // 点击提交按钮  发送请求
    async postPublish() {
      if (this.post.type == 1) {
        this.post.content = this.$refs.myeditor.editor.root.innerHTML;
      }
      // 栏目数据进行改造，改造为对象的形式 [1,2,3] >> [{id:1},{id:2},{id:3}]
      this.post.categories = this.checkedCcates.map((v) => {
        return { id: v };
      });

      let res = await postPublish(this.post);
      if (res.data.message == "文章发布成功") {
        this.$message.success(res.data.message);
        this.$router.push({ name: "postList" });
      }
    },
    // 获取token
    getToken() {
      let token = localStorage.getItem("linziyun_back");
      return { Authorization: token };
    },
  },
};
</script>

<style>
</style>