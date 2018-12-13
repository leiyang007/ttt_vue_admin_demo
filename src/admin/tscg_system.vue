<template>
	<div class="admin-system">
		<div class="admin-header">
			<div class="header">
				<router-link :to="{path: '/tscg_system/adminIndex'}">
					<div class="float-left logo-admin" title="Back to the front page">
						<span class="red-font">tSCG</span> Production Planning Management System
					</div>
				</router-link>
				<div class="header-right-list float-right">
					<ul>
						<li v-if="roleId != 3 && roleId != 4"><!--超级管理员1、品牌管理员2和其他用户-->
							<span>{{ roleName }}</span>
						</li>
						<li v-if="roleId == 3"><!-- 店铺管理员(经理)3-->
							<i class="el-icon-third-31shoucangdedianpu1" style="font-size: 30px;"></i>
							<span>{{ storeNumber }}</span>
							<span>({{ storeName }})</span>
						</li>
						<li v-if="roleId == 4"><!--部门管理员4 -->
							<i class="el-icon-third-31shoucangdedianpu1" style="font-size: 30px;"></i>
							<span>{{ storeNumber }}</span>
							<span>-{{ storeName }}</span>
							<span>({{ departmentName }})</span>
						</li>
						<li>
							<el-dropdown trigger="hover">
						      <span class="el-dropdown-link">
						      	<i class="el-icon-third-yonghu1" style="font-size: 25px;"></i>
						        {{ username }}
						        <i class="el-icon-arrow-down el-icon--right"></i>
						      </span>
						      <el-dropdown-menu slot="dropdown">
						        <!--<el-dropdown-item>Change Password</el-dropdown-item>-->
						        <el-dropdown-item>
						        	<div @click="logout">Log Out</div>
						        </el-dropdown-item>
						      </el-dropdown-menu>
						    </el-dropdown>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="admin-left-nav float-left">			
			<el-row class="tac">			  
			  <el-col :span="12">		  	
			    <el-menu :default-active="indexMenu" unique-opened class="el-menu-vertical-demo"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
			    	@open="handleOpen" 
			    	@close="handleClose">
			    	<el-submenu :index="item.uri" v-if="menuData != 'null'" v-for="(item,index) in menuData">
				        <template slot="title" v-if="item.selected">
				          <i class="el-icon-menu"></i>
				          <span :title="item.name" class="line-1">{{ item.name }}</span>
				        </template>
				        <el-menu-item-group>
				          <router-link v-if="val.selected" :to="{path: '/tscg_system/'+val.uri}" v-for="(val,key) in item.list">
				          	<el-menu-item :index="val.uri" class="line-1" :title="val.name">{{ val.name }}</el-menu-item>
				          </router-link>
				        </el-menu-item-group>
				    </el-submenu>
			    </el-menu>
			  </el-col>
			</el-row>
		</div>
		<div class="admin-right-nav">
			<router-view></router-view>
		</div>
		<div class="admin-foot">
			Copyright © 2018 the Stores Consulting Group
		</div>
	</div>
</template>

<script>
  export default {
  	data (){
  		return {
  			menuData: this.common.LStorage.getItem("menuTree") ? this.common.LStorage.getItem("menuTree") : 'null',
  			indexMenu:'',
  			userInfo: this.common.LStorage.getItem("userInfo"),
  			username: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").userName : 'null',
  			storeName: this.common.LStorage.getItem("userInfo").store ? this.common.LStorage.getItem("userInfo").store.name : 'null',
  			storeNumber: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").storeNumber : 'null',
  			departmentName: this.common.LStorage.getItem("userInfo").departmentName ? this.common.LStorage.getItem("userInfo").departmentName : 'null',
  			roleId: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").roleId : 'null',
  			roleName: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").roleName : 'null',
  		}
  	},
    methods: {
     returnBack(){
      	window.location.reload()
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
      	let _this = this
      	
      	this.$confirm('Are you sure you want to log out?', 'Log Out', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          
          	_this.common.LStorage.clear()  //清楚本地存储

	      	_this.$message({
	          message: 'You have been successfully logged out!',
	          type: 'success'
	        })
			setTimeout(function(){
	       		_this.$router.push('/')
	        },700)
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Log out request has been cancelled!'
          });          
        });      			
     }    
    },   
    mounted(){    	
    	let nowIndex = window.location.pathname
    	console.log(nowIndex.substring(13))
  		this.indexMenu = nowIndex.substring(13)  		
		//console.log(this.menuData)
  		//二级菜单页面刷新导航能正确显示
  		if(nowIndex.indexOf('editRole') > -1 || nowIndex.indexOf('addRole') > -1){
  			this.indexMenu = 'role'
  		}else if(nowIndex.indexOf('editUser') > -1 || nowIndex.indexOf('addUser') > -1){
  			this.indexMenu = 'user'
  		}else if(nowIndex.indexOf('commodityAdd') > -1 || nowIndex.indexOf('commodityEdit') > -1){
  			this.indexMenu = 'commodity'
  		}else if(nowIndex.indexOf('productAdd') > -1 || nowIndex.indexOf('productEdit') > -1){
  			this.indexMenu = 'product'
  		} else if(nowIndex.indexOf('newStore') > -1 || nowIndex.indexOf('editStore') > -1){
  			this.indexMenu = 'store'
  		} 				
    }
  }	
</script>

<style scope>
.admin-system{
	height: 100%;
}	
.admin-system .prompt-info{	/*提示字体颜色*/
	color: #999;
}
.admin-system .el-pagination{  /*分页样式显示*/
	margin: 20px 0;
}
.admin-system .el-dropdown{  /*右侧导航菜单*/
	color: #fff; cursor: pointer;
}
.admin-system .el-table .cell i:hover{
	color: deepskyblue; cursor: pointer; font-size: 18px;
}
.admin-system .el-table .cell i{
	cursor: pointer; font-size: 18px;
}
.admin-system .content-nav{
	border-bottom: 1px dashed #C9C9C9; padding-bottom: 5px; color: #909399; text-align: left; overflow: hidden;
}
.admin-system .content-nav ul li{
	float: left; margin-right: 5px;
}

/*头部样式	*/
.admin-system .header{
	height: 70px; border-bottom: 1px solid #B1B4B5; line-height: 70px;
}
.admin-system .header .logo-admin{
	height: 100%; color: #FFFFFF; padding-left: 30px;
}
.admin-system .header-right-list{
	height: 70px;
}
.admin-system .header-right-list ul{
	height: 70px; line-height: 70px; 
}
.admin-system .header-right-list ul li{
	float: left; margin-right: 15px; padding-right: 15px; color: #fff;
}
.admin-system .header-right-list ul li i{
	position: relative; top: 3px;
}
.admin-system .header-right-list ul li:after{
	content: '|'; position: relative; left: 14px; font-size: 23px;
}
.admin-system .header-right-list ul li:last-child:after{
	content: '';
}
.admin-system .header-right-list ul li a{
	color: #fff;
}
.admin-system .header-right-list ul li a:hover{
	color: dodgerblue;
}
.admin-system .header-right-list ul li:last-child{
	border-right: none;
}
.admin-system .admin-header{
	position: fixed;
    width: 100%;
    z-index: 99;
}
.admin-system .admin-header .header{
	background-color: #333333;
}
/*头部样式end	*/
	
/*左侧导航样式	*/

.admin-system .admin-left-nav{
	width: 236px; height: 100%; background-color: #545C64; position: fixed; top: 70px; z-index: 99; overflow-y: auto;
}
.admin-system .admin-left-nav .el-col-12{
	width: 100%; margin-bottom: 100px;
}
.admin-system .admin-left-nav .el-menu{
	border-right: none;
}
.admin-system .admin-left-nav .el-submenu:last-child .el-menu{
	margin-bottom: 30px;
}
.el-menu-item-group>ul {
    padding: 0;
}
.admin-system .admin-left-nav .el-menu li{
	text-align: left;
}
.admin-system .admin-left-nav .el-menu-item.is-active{
	background-color: #434A50!important;
}
.admin-system .el-submenu__title{
	padding: 0 10px!important;
}
.admin-system .el-submenu__icon-arrow{
	right: 13px!important;
}
.admin-system .el-submenu .el-menu-item{
	min-width: 250px;
    display: block;
}
.admin-system .el-submenu__title .line-1 {
    display: inline-block;
    width: 155px;
}
/*左侧导航样式end	*/

/*右侧导航样式	*/
.admin-system .admin-right-nav{
	padding: 15px 20px 100px; position: fixed; bottom: 0; overflow: auto; top: 70px; left: 236px; right: 0;
}
/*右侧导航样式end	*/

.admin-system .admin-foot{
	background-color: #F2F2F2; height: 54px; line-height: 54px; text-align: center; position: fixed; bottom: 0px; width: 100%; border-top: 1px solid #E4E4E4;
}

</style>