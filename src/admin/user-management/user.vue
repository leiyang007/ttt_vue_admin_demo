<template>
	<div class="balanceOnHand">
		<div class="nav-list">
			<span class="red-font">Production Planner</span>/<span class="gray-font bh-title">User Management</span>
		</div>
		<div>
			<div class="nav-head-one">
				<ul class="clear">
					<li class="red-font">User Management</li>
				</ul>
			</div>
		</div>
		<div class="table-head clear">
			<ul class="clear">
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">Username:</span>
						<el-input v-model="userName" placeholder="Please input contents" style="width: 200px;"></el-input>
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">Name:</span>
						<el-input v-model="name" placeholder="Please input contents" style="width: 200px;"></el-input>
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">Role:</span>
						<el-select v-model="roleId" placeholder="Please choose" @change="changeRole" style="width: 200px;">
						    <el-option
						      v-for="item in roleList"
						      :key="item.id"
						      :label="item.value"
						      :value="item.id">
						    </el-option>
						</el-select> 
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">Status:</span>
						<el-select v-model="statusId" placeholder="Please choose" @change="changeStatus" style="width: 200px;">
						    <el-option
						      v-for="item in statusList"
						      :key="item.id"
						      :label="item.value"
						      :value="item.id">
						    </el-option>
						</el-select> 
					</div>
				</li>
			</ul> 
			<div class="add-but">
				<div class="float-left">
					<router-link :to="{path: '/tscg_system/addUser'}">
						<el-button type="danger">Add</el-button>
					</router-link>
				</div>				
				<div class="search-but">
					<el-button type="danger" @click="search">Search</el-button>
					<el-button type="danger" @click="reset">Reset</el-button>
				</div>
			</div>
		</div>
		<div class="table-body" style="word-wrap:break-word;">			
			<template>				
			  <el-table ref="multipleTable" v-loading="loading" :data="tableData" tooltip-effect="dark" border :header-cell-style="tableHeaderColor">			    
			    <el-table-column prop="userName" v-if="" label="Username" min-width="120">
			    </el-table-column>
			    <el-table-column prop="name" v-if="" label="Name" min-width="120">
			    </el-table-column>
			    <el-table-column prop="phone" v-if="" label="Contact Number" min-width="150">
			    </el-table-column>
			    <el-table-column prop="roleName" v-if="" label="Role" min-width="120">
			    </el-table-column>
			    <el-table-column prop="state" v-if="" label="Status" min-width="120">
			    	<template scope="scope">
			              <span v-if="scope.row.state == 0" style="color:#3399FF">Effective</span>
			              <span v-if="scope.row.state != 0" style="color:#FF002F">Invalid</span>
			       </template>
			    </el-table-column>
			    <el-table-column prop="updateTime" v-if="" label="Update Time" min-width="150" :formatter="formatDate">
			    </el-table-column>	
			    <el-table-column prop="updateUser" v-if="" label="Operator" min-width="200">
			    </el-table-column>	
			    <el-table-column prop="" v-if="" label="Operating" min-width="100">
			    	<template slot-scope="scope">
			    		<router-link :to="{path: '/tscg_system/editUser',query:{
				    					userId: scope.row.id
			    			}}">
			        		<span class="blue-font pointer operating">Edit</span>
			        </router-link>
				    </template>	
			    </el-table-column>			    	    
			  </el-table>
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page.sync="nowPage"
			      :page-size="pageSize"
			      layout="prev, pager, next, jumper"
			      :total="totalCount">
			    </el-pagination>
			</template>				
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			nowPage: 1,				//当前页
	      	pageSize: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount: 0,			//总条数      	
	      	userName: null,
	      	name: null,
	      	roleId: null,
	      	roleList: [],
	      	statusId: null,
	      	statusList: [
	      		{
	      			'id': 0,
	      			'value': 'Effective'
	      		},
	      		{
	      			'id': 1,
	      			'value': 'Invalid'
	      		},
	      	],
	      	loading: true
		}
	},	
	methods:{
		getRoleList(){
			this.$axios.get('/qitems/queryRoleList')
				
			  .then((res) => {			  	
			  	let nowData = res.data		  	
			  	
			  	if(nowData.code == 1){
			  		this.roleList = nowData.data
			  	}else{
			  		console.log(nowData.msg)
			  		this.$message({
			          message: nowData.msg,
			          type: 'warning'
			        })
			  	}
			  	
			  })
			  .catch((err) => {
			    console.log(err);
			    this.$message({
		          message: err,
		          type: 'warning'
		        })
			  })
		},
		search(){
			this.nowPage = 1
			this.getTableData()
		},
		reset(){
			this.userName = null
			this.name = null
			this.roleId = null
			this.statusId = null
			this.getTableData()
		},
		changeRole(selVal){
			console.log(selVal)
		},
		changeStatus(selVal){
			console.log(selVal)
		},
		deleteRole(rowId){
			this.$confirm('Are you sure you want to delete it?', 'Log Out', {
	          confirmButtonText: 'Yes',
	          cancelButtonText: 'Cancel',
	          type: 'warning'
	        }).then(() => {
	           	let parm = rowId
				console.log(JSON.stringify(parm))  
				
				this.$axios.delete('/v1/role', {params: {roleId:parm}})
				  .then((res) => {			  	
				  	let nowData = res.data
				  	//console.log(JSON.stringify(nowData))
				  	if(nowData.code == 1){	
				  		console.log(JSON.stringify(nowData.data))
				  		this.$message({
				          message: 'Delete successful！',
				          type: 'success'
				        })	
				        this.getTableData()
				  	}else{
				  		console.log(nowData.errorInfo)
				  		this.$message({
				          message: 'Delete failed!',
				          type: 'warning'
				       })
				  	}
				  	
				  })
				  .catch((err) => {
				    console.log(err);
				    this.$message({
			          message: err,
			          type: 'warning'
			        })
				  })
	          
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: 'Log out request has been cancelled!'
	          });          
	        });
			
		},
		getTableData(){
			this.loading = true
			let status = null
			if(this.statusId != null){
				status = this.statusId.toString()
			}else{
				status = null
			}
			let parm = {
				'currentPage': this.nowPage,
				'pageSize': this.pageSize,
				'userName': this.userName ? this.userName : null,
				'name': this.name ? this.name : null,
				'roleId': this.roleId ? this.roleId : null,
				'status': status
			}
			console.log(JSON.stringify(parm))

			this.$axios.get('/v1/user',{params: parm})
				
			  .then((res) => {			  	
			  	let nowData = res.data		  	
			  	
			  	if(nowData.code == 1){
			  		this.loading = false
			  		this.tableData = nowData.data.items
					this.totalCount = nowData.data.totalNum
			  	}else{
			  		console.log(nowData.msg)
			  		this.$message({
			          message: nowData.msg,
			          type: 'warning'
			        })
			  	}
			  	
			  })
			  .catch((err) => {
			    console.log(err);
			    this.$message({
		          message: err,
		          type: 'warning'
		        })
			  })
		},
		formatDate(rows){
			let time = new Date(rows.updateTime)
			return this.moment(time).format("MM/DD/YYYY H:m:s")
		},		
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
		    if (rowIndex === 0) {
		        return 'background-color: #F5F7FA;'
		    }
		},
		handleSizeChange(val){
    		this.pageSize = val
    		console.log(this.pageSize)
    	},
    	handleCurrentChange(row, event, column) {
    		this.loading = true
            console.log(row)
            this.nowPage = row
            this.getTableData()
        },
	},
	mounted (){
		this.getRoleList()
		
		this.getTableData()
	}	
}	
</script>

<style scoped>	
.table-head{
	padding: 20px;
}
.table-head > ul{
	margin-top: 0; border-bottom: 1px solid #D7D7D7;
}
.add-but{
	margin-top: 10px;
}
</style>