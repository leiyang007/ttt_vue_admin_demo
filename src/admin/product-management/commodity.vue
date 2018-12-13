<template>
	<div class="balanceOnHand">
		<div class="nav-list">
			<span class="red-font">Production Planner</span>/<span class="gray-font bh-title">Commodity Management</span>
		</div>
		<div>
			<div class="nav-head-one">
				<ul class="clear">
					<li class="red-font">Commodity Management</li>
				</ul>
			</div>
		</div>
		<div class="table-head clear">
			<ul class="clear" style="float: left;">
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">Department:</span>
					  	<el-select v-model="departmentId" placeholder="Please choose" @change="changeDepartment" style="width: 200px;">
						    <el-option
						      v-for="item in departmentList"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select> 
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">Commodity:</span>
					  	<el-input v-model="commodityName" placeholder="Please input contents" style="width: 200px;"></el-input> 
					</div>
				</li>				
			</ul> 
			<div class="search-but">
				<el-button type="danger" @click="search">Search</el-button>
				<el-button type="danger" @click="reset">Reset</el-button>
			</div>	
			<div class="add-but">
				<router-link :to="{path: '/tscg_system/commodityAdd'}">
					<el-button type="danger">Add</el-button>
				</router-link>
			</div>
		</div>
		<div class="table-body" style="word-wrap:break-word;">			
			<template>				
			  <el-table ref="multipleTable" v-loading="loading" :data="tableData" tooltip-effect="dark" border :header-cell-style="tableHeaderColor">			    
			    <el-table-column prop="departmentName" label="Department" min-width="120">
			    </el-table-column>
			    <el-table-column prop="name" label="Commodity" min-width="120">
			    </el-table-column>
			    <el-table-column prop="description" label="Description" min-width="120">
			    </el-table-column>	
			    <el-table-column prop="updateTime" label="Update time" min-width="150" :formatter="formatDate">
			    </el-table-column>	
			    <el-table-column prop="userName" label="Operator" min-width="150">
			    </el-table-column>			    
			    <el-table-column prop="" label="Operating" min-width="150">
			    	<template slot-scope="scope">
			    		<router-link :to="{path: '/tscg_system/commodityEdit',query:{
				    					commodityId: scope.row.id
			    			}}">
			        		<span class="blue-font pointer operating">Edit</span> |
			        	</router-link>
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
	      	loading: true,
	      	departmentId: null,
	      	commodityName: null,
	      	departmentList: []
		}
	},	
	methods:{	
		getDepartmentList(){
			this.$axios.get('/qitems/queryDepartmentList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){
			  		this.departmentList = nowData.data
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
		},
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
		    if (rowIndex === 0) {
		        return 'background-color: #F5F7FA;'
		    }
		},
		formatDate(rows){
			let time = new Date(rows.updateTime)
			return this.moment(time).format("MM/DD/YYYY H:m:s")
		},
		search(){
			this.nowPage = 1
			this.getTableData()
		},
		reset(){
			this.departmentId = null			
			this.commodityName = null					
			this.getTableData()
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
		getTableData(){
			this.loading2 = true
			let parm = {
				  "departmentId": this.departmentId,
				  		  "name": this.commodityName
			}
			console.log(JSON.stringify(parm))
			this.$axios.get('/v1/category',{params: parm})
				
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
		changeDepartment(selVal){
			console.log(selVal)
		},
		deleteRole(rowId){
			this.$confirm('Are you sure you want to delete it?', 'Delete', {
	          confirmButtonText: 'Yes',
	          cancelButtonText: 'Cancel',
	          type: 'warning'
	        }).then(() => {
	           	let parm = rowId
				console.log(JSON.stringify(parm))  
				
				this.$axios.delete('/v1/category', {params: {categoryId:parm}})
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
	},
	mounted (){
		this.getDepartmentList()
		
		this.getTableData()
	}	
}	
</script>

<style scoped>	
.edit-input{
	border: 1px solid #D9D9D9;
    width: 100%;
    height: 30px;
    border-radius: 5px;
} 
.table-head{
	padding-top: 10px;
}
.table-head > ul{
	margin-top: 0;
}
.search-but{
	border-bottom: 1px solid #D7D7D7;
}
.add-but{
	text-align: left; margin: 10px 0 10px;
}

</style>