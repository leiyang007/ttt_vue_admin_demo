<template>
	<div class="report">
		<div class="nav-list">
			<span class="red-font">Production Planner</span>/<span class="gray-font bh-title">Reports</span>
		</div>
		<div>
			<div class="nav-head-one">
				<ul class="clear">
					<li class="red-font">Items Without Sales Report</li>
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
						<span class="oneline">Fiscal Week :</span>
					    <el-select v-model="seleYear" placeholder="year" @change="getYearText()" style="width: 90px;">
						    <el-option
						      v-for="item in yearList"
						      :key="item.value"
						      :label="item.text"
						      :value="item.value">
						    </el-option>
						</el-select> 
					    <el-select v-model="seleWeek" placeholder="week" @change="getWeekText()" style="width: 105px;">
						    <el-option
						      v-for="item in weekList"
						      :key="item.value"
						      :label="item.text"
						      :value="item.value">
						    </el-option>
						</el-select> 
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
			    <el-table-column prop="departmentName" label="Department" min-width="100">
			    </el-table-column>
			    <el-table-column prop="categoryName" label="Commodity" min-width="100">
			    </el-table-column>
			    <el-table-column prop="code" label="UPC/PLU" min-width="120">
			    </el-table-column>
			    <el-table-column prop="productName" label="Item" min-width="200">
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
	      	commodity: null,
	      	commodityList: [],
	      	seleWeek: this.getNowYearAndWeek().week.toString(),
	      	weekList: [],
	      	seleYear: this.getNowYearAndWeek().year,
	      	yearList: [],
			tableData: [],
		}
	},	
	methods:{	
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
		    if (rowIndex === 0) {
		        return 'background-color: #F5F7FA;'
		    }
		},
		search(){
			this.nowPage = 1
			this.getTableData()
		},
		reset(){
			this.storeNumber = null
			this.department = null
			this.commodity = null
			
			this.seleYear = this.getNowYearAndWeek().year
			this.seleWeek = this.getNowYearAndWeek().week.toString()
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
				'categoryId': this.commodity,				
				"departmentId": this.department,				
				'year': this.seleYear ? this.seleYear : null,
				'week': this.seleWeek ? this.seleWeek : null
			}
			console.log(JSON.stringify(parm))

			this.$axios.get('/v1/report/itemsWithoutSalesReports',{params: parm})
				
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
		getCommodity(dpId){
			let parm = {
				"departmentId": dpId
			}
			this.$axios.get('/qitems/queryCommodityList',{params: parm})
				
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
		getWeek(seleYear){
			let parm = seleYear
			this.$axios.get('/qitems/queryYearWeekList?year='+parm)
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
			  	if(nowData.code == 1){	
			  		//console.log(JSON.stringify(nowData.data))
			  		this.weekList = nowData.data

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
		getYearText(){
			console.log(this.seleYear)
			this.getWeek(this.seleYear)
		},
		getWeekText(){
			console.log(this.seleWeek)
		},
		changeCommodity(selVal){
			console.log(selVal)
		},
/*		changeRegion(selVal){
			console.log(selVal)
			this.getDistrictList(selVal)
		},
		changeDistrict(selVal){
			console.log(selVal)			
		},*/
		changeStoreName(selVal){
			console.log(selVal)
		},
		changeDepartment(selVal){
			console.log(selVal)
			this.getCommodity(selVal)
		},
		getNowYearAndWeek(){
	         var today = new Date();
	         var year = today.getFullYear()
			  var firstDay = new Date(today.getFullYear(),0, 1);
			  var dayOfWeek = firstDay.getDay(); 
			  var spendDay= 1;
			  if (dayOfWeek !=0) {
			    spendDay=7-dayOfWeek+1;
			  }
			  firstDay = new Date(today.getFullYear(),0, 1+spendDay);
			  var d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
			  var result =Math.ceil(d/7);
				
			  var obj = {
			  		year: year,
			  		week: result-1
			  }

			  //console.log('当前日期是第'+result+1+'周')
			  return obj;			  
		}
	},
	mounted (){
		this.getRegionList()
		this.getStoreNameList()
		this.getDepartmentList()
		this.getCommodity()
		this.getYearList()
		
		this.getTableData()
		this.getWeek(this.seleYear)
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