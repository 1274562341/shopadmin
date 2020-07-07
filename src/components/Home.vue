<template>
  <el-container>
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="logo" />
        <span>电商后台管理系统demo</span>
      </div>
      <el-button @click="exit" type="danger">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside :width="collapse ? '64px' : '200px' ">
          <div class="none_aside" @click="nono_aswide">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse = 'collapse'	
          :collapse-transition="false"
          router
          :default-active='activepath'
          >
          <el-submenu v-for="item in leftaside" :key="item.id" :index="item.id+''">
            <template slot="title">
              <i :class="fontico[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>

            <el-menu-item @click="svavpath('/'+subitem.path)" :index="'/'+subitem.path" :key="subitem.id" v-for="subitem in item.children">
                <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{subitem.authName}}</span>
            </template>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data() {
        return {
            leftaside:[],
            fontico:{
                '125':'iconfont icon-bussiness-man',
                '103':'iconfont icon-Notvisible',
                '101':'iconfont icon-integral',
                '102':'iconfont icon-similar-product',
                '145':'iconfont icon-pic',

            },
            collapse:false,
            activepath:''
        }
    },
    created() {
        this.getaside(),
        this.activepath = window.sessionStorage.getItem('activepath')
    },
  methods: {
    exit() {
      window.sessionStorage.clear();
      this.$router.push("/Login");
    },
    getaside(){
        this.$http.get('menus').then(data=>{
            if(data.status !== 200) return this.$message.error('数据获取失败-请重新登录')
            this.leftaside =  data.data.data
            console.log(data)
        })
    },
    nono_aswide(){
        this.collapse = !this.collapse
    },
    svavpath(path){
        window.sessionStorage.setItem('activepath',path)
        this.activepath = window.sessionStorage.getItem('activepath')
    }
  },
};
</script>

<style scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header img {
  width: 50px;
  height: 50px;
}
.el-header > div {
  display: flex;
  align-items: center;
}
.el-header span {
  margin-left: 15px;
}
.el-aside {
  background-color: #333744;
}
.el-aside .el-menu{
    border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
.el-container {
  height: 100vh;
}
.iconfont{
    margin-right: 10px;
}
.none_aside{
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
