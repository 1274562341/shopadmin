<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="15">
          <el-input
            placeholder="请输入内容"
            v-model="queryinfo.query"
            clearable
            @clear="getuserlist()"
          >
            <el-button
              @click="getuserlist()"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="dialogVisible = true" type="primary"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch
              @change="userstatechange(scope.row)"
              v-model="scope.row.mg_state"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <!-- {{scope.row}} -->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" @close="close">
      <el-form :model="addform" ref="reference" label-width="70px">
        <el-form-item label="用户名" >
          <el-input v-model="addform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="addform.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="addform.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" >
          <el-input v-model="addform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="adduser">确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryinfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userlist: [],
      total: 0,
      dialogVisible: false,
      addform:{
          'username':'',
          'password':'',
          'email':'',
          'mobile':''
      },
    };
  },
  created() {
    this.getuserlist();
  },
  methods: {
    getuserlist() {
      this.$http.get("users", { params: this.queryinfo }).then((data) => {
        if (data.status !== 200)
          return this.$message.error("获取用户数据失败-请检查接口");
        this.userlist = data.data.data.users;
        this.total = data.data.data.total;
      });
    },
    handleSizeChange(newsize) {
      // console.log(newsize)
      this.queryinfo.pagesize = newsize;
      this.getuserlist();
    },
    handleCurrentChange(newpage) {
      // console.log(newpage)
      this.queryinfo.pagenum = newpage;
      this.getuserlist();
    },
    userstatechange(data) {
      this.$http.put(`users/${data.id}/state/${data.mg_state}`).then((data) => {
        if (data.data.meta.status !== 200)
          return (data.mg_state =
            !data.mg_state && this.$message.error("修改数据失败"));
        this.$message.success("更新状态成功");
      });
    },
    close(){
         this.$refs.reference.resetFields();
    },
    adduser(){
        this.$http.post('users',this.addform).then((res)=>{
            if(res.data.meta.status !== 201)return this.$message.error('用户创建失败')
            this.$message.success('用户创建成功')
        })
    }
}}
</script>

<style scoped></style>
