<template>
	<div class="balanceOnHand">
		<div class="nav-list">
			<span class="red-font">Production Planner</span>/<span class="gray-font bh-title">Role Management</span>
		</div>
		<div>
			<div class="nav-head-one">
				<ul class="clear">
					<li class="red-font">Role Management</li>
				</ul>
			</div>
		</div>
		<div class="search-head clear">
			<ul class="clear">
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">Role Name:</span><!--搜索下拉框-->
						<el-input v-model="roleName" placeholder="Please input contents" style="width: 200px;"></el-input>
					</div>
				</li>
			</ul> 
			<div class="search-but">
				<el-button type="danger" @click="search">Search</el-button>
				<el-button type="danger" @click="reset">Reset</el-button>
			</div>	
			<div class="add-but">
				<router-link :to="{path: '/tscg_system/addRole'}">
					<el-button type="danger">Add</el-button>
				</router-link>
			</div>
		</div>
		<div class="table-body" style="word-wrap:break-word;">		
			<template>				
			  <el-table ref="multipleTable" v-loading="loading" :data="tableData" tooltip-effect="dark" border :header-cell-style="tableHeaderColor">			    
			    <el-table-column prop="roleName" v-if="" label="Role Name" min-width="120">
			    </el-table-column>
			    <el-table-column prop="description" v-if="" label="Description" min-width="120">
			    </el-table-column>
			    <el-table-column prop="updateTime" v-if="" label="Update Time" min-width="200" :formatter="formatDate">
			    </el-table-column>	
			    <el-table-column prop="userName" v-if="" label="Operator" min-width="200">
			    </el-table-column>	
			    <el-table-column prop="" v-if="" label="Operating" min-width="200">
			    	<template slot-scope="scope">
			    		<router-link :to="{path: '/tscg_system/editRole',query:{
				    					roleId: scope.row.id
			    			}}">
			        		<span class="blue-font pointer operating">Edit</span> |
			        	</router-link>
			    		<!--<router-link v-if="scope.row.isSys != true" :to="{path: '/tscg_system/editRole',query:{
				    					roleId: scope.row.id
			    			}}">
			        		<span class="blue-font pointer operating">Edit</span> |
			        	</router-link>-->
			        	<!--<span class="blue-font pointer">Member</span> |-->
			        	<span class="blue-font pointer operating" @click="deleteRole(scope.row.id)">Delete</span> 
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
	      	roleName: null,
	      	loading: true
		}
	},	
	methods:{
		search(){
			this.nowPage = 1
			this.getTableData()
		},
		reset(){
			this.roleName = null
			this.getTableData()
		},
		deleteRole(rowId){
			this.$confirm('Are you sure you want to delete it?', 'Delete', {
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
				          message: nowData.errorInfo,
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
	            message: 'Delete request has been cancelled!'
	          });          
	        });
			
		},
		getTableData(){
			this.loading = true
			let parm = {
				'currentPage': this.nowPage,
				'pageSize': this.pageSize,
				'roleName': this.roleName ? this.roleName : null,
			}
			console.log(JSON.stringify(parm))

			this.$axios.get('/v1/role',{params: parm})
				
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
		this.getTableData()
	}	
}	
</script>

<style scoped>	
.search-head{
	padding: 20px;
}
.search-head > ul{
	float: left;
}
.add-but{
	text-align: left; margin-top: 10px;
}
.search-but {
    border-bottom: 1px solid #D7D7D7;
}
</style>