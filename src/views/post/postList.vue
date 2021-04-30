<template>
  <div class="postList">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">文章管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容卡片 -->
    <el-card class="box-card" style="margin-top: 20px">
      <!-- 表格 -->
      <el-table :data="postList" style="width: 100%" border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="title" label="标题" width="480">
        </el-table-column>

        <el-table-column prop="type" label="类型" width="180">
          <template slot-scope="scope">
            {{ scope.row.type == 1 ? "文章" : "视频" }}
          </template>
        </el-table-column>

        <el-table-column prop="user.nick" label="作者"> </el-table-column>

        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { posteditList } from "@/apis/post.js";
export default {
  data() {
    return {
      postList: [],
      pageIndex: 1, //当前显示的页码
      pageSize: 4, //当前显示的数据数量
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      };
      let res = await posteditList(data);
      this.postList = res.data.data;
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.init();
    },
  },
};
</script>

<style>
</style>