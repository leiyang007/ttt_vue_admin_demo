<template>
	<div class="report">
		<div class="nav-list">
			<span class="red-font">Production Planner</span>/<span class="gray-font bh-title">Reports</span>
		</div>
		<div>
			<div class="nav-head-one">
				<ul class="clear">
					<li class="red-font">Tool Usage Report</li>
				</ul>
			</div>
		</div>
		<div class="table-head clear">
			<ul class="clear">
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">Store Name:</span>
					  	<el-select v-model="storeNumber" placeholder="Please choose" @change="changeStoreName" style="width: 200px;">
						    <el-option
						      v-for="item in storeNameList"
						      :key="item.number"
						      :label="item.name"
						      :value="item.number">
						    </el-option>
						</el-select>						
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">Department:</span>
					  	<el-select v-model="department" placeholder="Please choose" @change="changeDepartment" style="width: 200px;">
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
						<span class="oneline">Region:</span>
					  	<el-select v-model="region" placeholder="Please choose" @change="changeRegion" style="width: 200px;">
						    <el-option
						      v-for="item in regionList"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>						
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">District:</span>
					  	<el-select v-model="district" placeholder="Please choose" @change="changeDistrict" style="width: 200px;">
						    <el-option
						      v-for="item in districtList"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>						
					</div>
				</li>
				<!--<li>	
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
				</li>-->
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">Start Date:</span>
					    <el-date-picker
					      v-model="startDate"
					      type="date"
					      value-format="yyyy/MM/dd"
					      style="width: 200px;"
					      @change="getStartDate"
					      placeholder="Start Date">
					    </el-date-picker>
					</div>
				</li>
				<li>	
					<div class="demo-input-suffix">
						<span class="oneline">End Date:</span>
					    <el-date-picker
					      v-model="endDate"
					      type="date"
					      value-format="yyyy/MM/dd"
					      style="width: 200px;"
					      @change="getEndDate"
					      placeholder="End Date">
					    </el-date-picker>
					</div>
				</li>
			</ul> 
			<div class="search-but">
				<el-button type="danger" @click="search">Search</el-button>
				<el-button type="danger" @click="reset">Reset</el-button>
			</div>	
		</div>
		<div class="table-body" style="word-wrap:break-word;">	
			<template>				
			  <el-table ref="multipleTable" v-loading="loading" :data="tableData" tooltip-effect="dark" border :header-cell-style="tableHeaderColor">			    			    
			    <el-table-column prop="storeNumber" label="Store Number" min-width="200">
			    </el-table-column>
			    <el-table-column prop="departmentName" label="Department" min-width="100">
			    </el-table-column>	
			    <el-table-column prop="userName" label="User Name" min-width="100">
			    </el-table-column>
			    <el-table-column prop="lastDate" label="Last System Use Date" min-width="100" :formatter="formatDate">
			    </el-table-column>
			    <el-table-column prop="countNum" label="Count of Usage" min-width="100">
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
	      	storeNumber: null,
	      	storeNameList: [],
	      	department: null,
	      	departmentList: [],
	      	region: null,
	      	regionList: [],
	      	district: null,
	      	districtList: [],
	      	startDate: null,
	      	endDate: null,
			tableData: [],
		}
	},	
	methods:{	
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
		    if (rowIndex === 0) {
		        return 'background-color: #F5F7FA;'
		    }
		},
		formatDate(rows){
			let time = new Date(rows.lastDate)
			return this.moment(time).format("MM/DD/YYYY H:m:s")
		},
		search(){
			this.nowPage = 1
			this.getTableData()
		},
		reset(){
			this.storeNumber = null
			this.department = null
			
			this.startDate = null
			this.endDate = null
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
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },       
		getTableData(){
			let _this = this
			this.loading = true

			let parm = {
				'currentPage': this.nowPage,
				'pageSize': this.pageSize,
				'storeNumber': this.storeNumber,								
				"departmentId": this.department,
				'regionId': this.region,
				'districtId': this.district,
				'startDate': this.startDate,
				'endDate': this.endDate
			}
			console.log(JSON.stringify(parm))

			this.$axios.get('/v1/report/toolUsageReport',{params: parm})
				
			  .then((res) => {			  	
			  	let nowData = res.data

			  	if(nowData.code == 1){
			  		_this.loading = false
			  		//console.log(JSON.stringify(nowData.data.items))
			  		_this.tableData = nowData.data.items
					_this.totalCount = nowData.data.totalNum
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
		getRegionList(){
			this.$axios.get('/qitems/queryRegionList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		this.regionList = nowData.data
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
		getDistrictList(rgId){
			let parm = {
				"regionId": rgId
			}
			this.$axios.get('/qitems/queryDistrictList',{params: parm})
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		this.districtList = nowData.data
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
		getStoreNameList(){
			this.$axios.get('/qitems/queryStoreList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		this.storeNameList = nowData.data
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
		getDepartmentList(){
			this.$axios.get('/qitems/queryDepartmentList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		this.departmentList =  nowData.data
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
		getYearList(){
			this.$axios.get('/qitems/queryYearList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		this.yearList = nowData.data
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
		getStartDate(val){
			console.log(val)
			this.startDateStr = val
		},
		getEndDate(val){
			console.log(val)
			this.endDateStr = val
		},
		changeStoreName(selVal){
			console.log(selVal)
		},
		changeDepartment(selVal){
			console.log(selVal)
			//this.getCommodity(selVal)
		},
		changeRegion(selVal){
			console.log(selVal)
			this.district = null
			this.getDistrictList(selVal)
		},
		changeDistrict(selVal){
			console.log(selVal)			
		}
	},
	mounted (){
		this.getRegionList()
		this.getStoreNameList()
		this.getDepartmentList()
		//this.getCommodity()
		
		this.getTableData()
	}	
}	
</script>

<style scoped>		
.table-head > ul{
	float: left;
}	
.search-but{
	padding-top: 10px;
}
.edit-input{
	border: 1px solid #D9D9D9;
    width: 100%;
    height: 30px;
    border-radius: 5px;
} 
</style>