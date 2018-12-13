<template>
	<div class="balanceOnHand">
		<div class="nav-list">
			<span class="red-font">Production Planner</span>/<span class="gray-font bh-title">Product Managment</span>
		</div>
		<div>
			<div class="nav-head-one">
				<ul class="clear">
					<li class="red-font">Product Managment</li>
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
						<span class="oneline">Cluster:</span>
					  	<el-select v-model="clusterId" placeholder="Please choose" @change="changecluster" style="width: 200px;">
						    <el-option
						      v-for="item in clusterList"
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
					  	<el-select v-model="commodity" placeholder="Please choose" @change="changeCommodity" style="width: 200px;">
						    <el-option
						      v-for="item in commodityList"
						      :key="item.id"
						      :label="item.value"
						      :value="item.id">
						    </el-option>
						</el-select>  
					</div>
				</li>			
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">UPC/PLU:</span>
					    <el-input v-model="companyText" placeholder="Please input contents" style="width: 200px;"></el-input>
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">Item:</span>
						<el-input v-model="itemData" placeholder="Please input contents" style="width: 200px;"></el-input>
					</div>
				</li>
			</ul> 				
			<div class="add-but">
				<div class="float-left">
					<router-link :to="{path: '/tscg_system/productAdd'}">
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
			    <el-table-column prop="cluster" label="Cluster" min-width="120">
			    	<template slot-scope="scope">
			    		<el-popover
						  placement="right"
						  trigger="hover">
						  <el-table :data="scope.row.clusterList">
						    <el-table-column width="100" property="id" label="id"></el-table-column>
						    <el-table-column width="100" property="name" label="name"></el-table-column>
						    <el-table-column width="200" property="description" label="description"></el-table-column>
						  </el-table>
						  <el-button class="cluster-num" slot="reference">{{ scope.row.clusterList.length }}</el-button>
						</el-popover>
				    </template>	
			    </el-table-column>
			    <el-table-column prop="departmentName" label="Department" min-width="100">
			    </el-table-column>
			    <el-table-column prop="categoryName" label="Commodity" min-width="100">
			    </el-table-column>
			    <el-table-column prop="code" label="UPC/PLU" min-width="120">
			    </el-table-column>
			    <el-table-column prop="productName" label="Item" min-width="200">
			    </el-table-column>
			    <el-table-column prop="productDesc" label="Description" min-width="200">
			    </el-table-column>	
			    <el-table-column prop="updateTime" label="Update time" min-width="150" :formatter="formatDate">
			    </el-table-column>	
			    <el-table-column prop="userName" label="Operator" min-width="100">
			    </el-table-column>			    
			    <el-table-column prop="" label="Operating" min-width="100">
			    	<template slot-scope="scope">
			    		<router-link :to="{path: '/tscg_system/productEdit',query:{
				    					productId: scope.row.id
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
	      	commodity: null,
	      	clusterId: null,
	      	companyText: null,
	      	itemData: null,
	      	departmentList: [],
	      	commodityList: [],
	      	clusterList: [],
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
		getClusterList(){
			this.$axios.get('/qitems/queryClusterList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		this.clusterList = nowData.data
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
		getCommodity(){
			this.$axios.get('/qitems/queryCommodityList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		this.commodityList = nowData.data
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
			this.clusterId = null			
			this.commodity = null					
			this.companyText = null					
			this.itemData = null					
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
			this.loading = true
			let parm = {
				    "categoryId": this.commodity,
				  "departmentId": this.departmentId,
				  		  "code": this.companyText,
				   "productName": this.itemData,
				     "clusterId": this.clusterId,
				   "currentPage": this.nowPage,
				      "pageSize": this.pageSize
			}
			console.log(JSON.stringify(parm))
			this.$axios.get('/v1/product',{params: parm})
				
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
		changeStoreName(selVal){
			console.log(selVal)
		},
		changeCommodity(selVal){
			console.log(selVal)
		},
		changecluster(selVal){
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
				
				this.$axios.delete('/v1/product', {params: {id:parm}})
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
		this.getClusterList()
		this.getCommodity()
		
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
	margin-top: 0; border-bottom: 1px solid #D7D7D7;
}
.add-but{
	margin-top: 10px;
}
.el-popover__reference{
	padding: 5px 20px;
}
</style>