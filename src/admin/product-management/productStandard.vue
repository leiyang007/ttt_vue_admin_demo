<template>
	<div class="salesData">
		<div class="nav-list">
			<span class="red-font">Production Planner</span>/<span class="gray-font">Product Standard</span>
		</div>
		<div>
			<div class="nav-head">
				<ul class="clear">
					<li :class="{active:index==nowIndex}" v-for="(item,index) in navHeadList" @click="selected(index)">{{ item.name }}</li>
				</ul>
			</div>
		</div>
		<div class="body-box">
<!--页面一-----------------------by stroe------------------------------------>		
			<div class="tabPage" v-if="showTab1">
				<div class="table-head clear">
					<ul class="clear">
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">Store Name:</span>
							    <el-select v-model="storeNumber" placeholder="Please choose" @change="chooseStoreName" style="width: 200px;">
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
							    <el-select v-model="departmentId" placeholder="Please choose" @change="chooseDepartment" style="width: 200px;">
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
							    <el-select v-model="commodity2" placeholder="Please choose" @change="changeCommodity2" style="width: 200px;">
								    <el-option
								      v-for="item in commodityList2"
								      :key="item.id"
								      :label="item.value"
								      :value="item.id">
								    </el-option>
								</el-select>
							</div>
						</li>
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">Item:</span><!--搜索下拉框-->
								<el-select v-model="itemData" filterable placeholder="Please choose" @change="changeItem" style="width: 200px;">
								    <el-option
								      v-for="item in itemList"
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
							    <el-input v-model="companyText2" placeholder="Please input contents" style="width: 200px;"></el-input>
							</div>
						</li>
					</ul> 
					<div class="search-but">
						<el-button type="danger" @click="search2">Search</el-button>
						<el-button type="danger" @click="reset2">Reset</el-button>
					</div>	
				</div>
				<div class="table-body">
					<div class="table-top-set">				
						<el-popover
						    placement="bottom"
						    title="Column"
						    width="220"
						    trigger="click">
						    <div class="porpover">
						    	<ul class="check-column">
						    		<li><el-checkbox v-model="showStoreNumber2">Store Number</el-checkbox></li>
						    		<li><el-checkbox v-model="showStoreName2">Store Name</el-checkbox></li>
						    		<li><el-checkbox v-model="showDepartment2">Department</el-checkbox></li>
						    		<li><el-checkbox v-model="showCommodity2">Commodity</el-checkbox></li>				    		
						    		<li><el-checkbox v-model="showCode2">UPC/PLU</el-checkbox></li>				    		
						    		<li><el-checkbox v-model="showItem2">Item</el-checkbox></li>
						    	</ul>
						    </div>
						    <div class="table-column-set gray-font" slot="reference">
								<i class="el-icon-setting" style="color: #C9C9C9;"></i>
								Customized View
							</div>
						  </el-popover>
					</div>			
					<template>				
					  <el-table ref="multipleTable" key='secondTable' v-loading="loading2" :data="tableData2" tooltip-effect="dark" border :header-cell-style="tableHeaderColor">			    
					    <el-table-column prop="storeNumber" v-if="showStoreNumber2" label="Store Number" min-width="100">
					    </el-table-column>
					    <el-table-column prop="storeName" v-if="showStoreName2" label="Store Name" min-width="120">
					    </el-table-column>
					    <el-table-column prop="departmentName" v-if="showDepartment2" label="Department" min-width="120">
					    </el-table-column>
					    <el-table-column prop="categoryName" v-if="showCommodity2" label="Commodity" min-width="150">
					    </el-table-column>
					    <el-table-column prop="code" v-if="showCode2" label="UPC/PLU" min-width="150">
					    </el-table-column>				    
					    <el-table-column prop="productName" v-if="showItem2" label="Item" min-width="200">
					    	<template slot-scope="scope">
					        	<div class="line-1" style="width: 100%; height: 25px; -webkit-box-orient: vertical;" :title="scope.row.productName">{{ scope.row.productName }}</div>
						    </template>
					    </el-table-column>
					    <el-table-column prop="accelerator" label="Accelerator %" min-width="150">
					    	<template slot-scope="scope">
					        	<input class="edit-input" v-if="scope.row.edit" v-model="scope.row.accelerator" autofocus="autofocus">
						        <div class="div-text" ref="menuBorder" v-if="!scope.row.edit">{{ scope.row.accelerator }}</div>
						    </template>
					    </el-table-column>
					    <el-table-column prop="minShelfStandard" label="Min. Shelf Standard" min-width="150">
					    	<template slot-scope="scope">
					        	<input class="edit-input" v-if="scope.row.edit" v-model="scope.row.minShelfStandard">
						        <div class="div-text" ref="menuBorder" v-if="!scope.row.edit">{{ scope.row.minShelfStandard }}</div>
						    </template>
					    </el-table-column>
					    <el-table-column prop="safetyStock" label="Safety Stock" min-width="150">
					    	<template slot-scope="scope">
					        	<input class="edit-input" v-if="scope.row.edit" v-model="scope.row.safetyStock">
						        <div class="div-text" ref="menuBorder" v-if="!scope.row.edit">{{ scope.row.safetyStock }}</div>
						    </template>
					    </el-table-column>
					    <el-table-column prop="" label="Operating" min-width="150">
					    	<template slot-scope="scope">
					        	<div v-if="!scope.row.edit">
					        		<span class="blue-font pointer operating" @click="editRow(scope.row)">Edit</span>
					        	</div>
					        	<div v-if="scope.row.edit">
					        		<span class="blue-font pointer operating" @click="saveRow(scope.row)">Save</span> | 
					        		<span class="blue-font pointer operating" @click="cancelEdit(scope.row)">Cancel</span>				        		
					        	</div>
						    </template>
					    </el-table-column>			   
					  </el-table>
					    <el-pagination
					      @size-change="handleSizeChange2"
					      @current-change="handleCurrentChange2"
					      :current-page.sync="nowPage2"
					      :page-size="pageSize2"
					      layout="prev, pager, next, jumper"
					      :total="totalCount2">
					    </el-pagination>
					</template>				
				</div>
			</div>			
<!--页面二------------------------Batch Operation----------------------------------->				
			<div class="tabPage" v-if="showTab2">
				<div class="table-head clear">
					<ul class="clear" style="float: left;">
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">Department:</span>
							  	<el-select v-model="departmentIdBatch" placeholder="Please choose" @change="changeDepartment" style="width: 200px;">
								    <el-option
								      v-for="item in departmentBatchList"
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
							  	<el-select v-model="commodityBatch" placeholder="Please choose" @change="changeCommodity" style="width: 200px;">
								    <el-option
								      v-for="item in commodityBatchList"
								      :key="item.id"
								      :label="item.value"
								      :value="item.id">
								    </el-option>
								</el-select>  
							</div>
						</li>			
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">Item:</span><!--搜索下拉框-->
								<el-select v-model="itemDataBatch" filterable placeholder="Please choose" @change="changeItemDataBatch" style="width: 200px;">
								    <el-option
								      v-for="item in batchItemList"
								      :key="item.id"
								      :label="item.value"
								      :value="item.id">
								    </el-option>
								</el-select>
							</div>
						</li>
					</ul> 				
					<div class="add-but">				
						<div class="search-but batch-search">
							<el-button type="danger" @click="searchBatch" style="margin-top: 10px;">Search</el-button>
							<el-button type="danger" @click="resetBatch">Reset</el-button>
						</div>
					</div>	
				</div>
				<div class="table-body">	
					<el-row>
					  <el-col :span="5">
					  	<div style="text-align: left; padding: 10px;">Apply To Store</div>
					  	<div class="grid-content bg-purple" v-loading="loading">
					  		<span v-if="stroeList.length == 0" style="color: #8C939D;">{{ stroeResult }}</span>
					  		<ul>
					  			<li v-for="(item,index) in stroeList">
					  				<template>
									  <el-checkbox v-model="item.checked" :data-number="item.number">{{ item.name }}</el-checkbox>
									</template>
					  			</li>
					  		</ul>
					  	</div>
					  </el-col>
					  <el-col :span="19">
					  	<div class="grid-content bg-purple-light" style="padding-top: 50px;">
					  		<ul class="batch-ul clear">
								<li>	
									<div class="batch-input">
										<span class="oneline">Accelerator %:</span>
									  	 <el-input v-model="acceler" placeholder="Please input contents" style="width: 200px;"></el-input>
									</div>
								</li>
								<li>	
									<div class="batch-input">
										<span class="oneline">Min. Shelf Standard:</span>
									  	<el-input v-model="minshelf" placeholder="Please input contents" style="width: 200px;"></el-input>
									</div>
								</li>			
								<li>	
									<div class="batch-input">
										<span class="oneline">Safety Stock:</span>
									    <el-input v-model="safetystock" placeholder="Please input contents" style="width: 200px;"></el-input>
									</div>
								</li>
							</ul> 
							<div class="batch-button"> 
								<el-button type="danger" @click="batchSave">Save</el-button>
								<el-button type="info" @click="batchReset">Reset</el-button>
							</div>
					  	</div>
					  </el-col>
					</el-row>			
				</div>
			</div>

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
			nowPage2: 1,				//当前页
	      	pageSize2: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount2: 0,			//总条数	      	 			
	      	/*第一页数据*/
	      	itemList: [],		//远程下拉框
	      	commodity2: null,
	      	companyText2 : null,
	      	itemData: '',
	      	commodityList2: [],
	      	storeNumber: null,
	      	storeNameList: [],	
	      	departmentId: null,
	      	departmentList: [],	 
	      	editBefore: {					//编辑前数据
	      		'accelerator': null,
	      		'minShelfStandard': null,
	      		'safetyStock': null,
	      	},
	      	editAfter: {					//编辑后数据
	      		'accelerator': null,
	      		'minShelfStandard': null,
	      		'safetyStock': null,
	      	},			
	      	showStoreNumber2: true,			//day表头显示控制
	      	showStoreName2: true,			//day表头显示控制
			showCommodity2: true,		//day表头显示控制
			showCode2: true,		//day表头显示控制
			showDepartment2: true,				//day表头显示控制
			showItem2: true,			//day表头显示控制  	
			tableData2: [],			
			loading2: true,	//开发时打开注释
	      	/*第一页数据end*/	      	
	      	showTab1: true,
	      	showTab2: false,
	      	navHeadList: [
	      		{	      			
	      			name: 'By Store'
	      		},
	      		{
	      			name: 'Batch Operation'
	      		},
	      	],
	      	nowIndex: 0,
	      	/*第二页数据*/				
			departmentIdBatch: null,
			commodityBatch: null,
			itemDataBatch: null,
			batchItemList: [],
			stroeList: [],
			departmentBatchList: [],
			commodityBatchList: [],
			loading: false,
			acceler: null,
			minshelf: null,
			safetystock: null,
			stroeResult: 'Please search',
		}
	},	
	methods:{		
/*--------------------------------------------页面Batch Operation-----------------------------------------------------------*/
		searchBatch(){
			if(this.itemDataBatch){
				this.getStoreList()
			}else{
				this.$message({
			          message: 'Please select Item!',
			          type: 'warning'
			       })
			}					
		},
		resetBatch(){
			this.commodityBatch = null
			this.departmentIdBatch = null
			this.itemDataBatch = null
			
			this.stroeList = []
			//this.getStoreList()
		},
		batchSave(){
			if(this.stroeList.length != 0){
				if(this.acceler == null && this.minshelf == null && this.safetystock == null){
					this.$message({
				          message: 'No changes detected！',
				          type: 'warning'
				       })
				}else{
					this.postBatch()
				}	
			}else{
				this.$message({
				          message: 'Please choose store！',
				          type: 'warning'
				       })
			}							
		},
		postBatch(){
			let arr = []
			for(let i=0; i<this.stroeList.length; i++){
				if(this.stroeList[i].checked == true){
					arr.push({
						"storeNumber": this.stroeList[i].number
					})
				}
			}
			let data = {
				  "productId": this.itemDataBatch,
				  "accelerator": this.acceler,
				  "minShelfStandard": this.minshelf,
				  "safetyStock": this.safetystock,
				  "storeNumbers": arr				
			}
			this.$axios.put('/v1/productStandard', data)
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		console.log(JSON.stringify(nowData.data))
			  		this.$message({
			          message: 'Successfully Saved！',
			          type: 'success'
			       })	
			  	}else{
			  		console.log(nowData.errorInfo)
			  		this.$message({
			          message: 'Data anomaly',
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
		batchReset(){
			this.acceler = null
			this.minshelf = null
			this.safetystock = null
			
			for(let i=0; i<this.stroeList.length; i++){
				if(this.stroeList[i].checked == true){
					this.stroeList[i].checked = false
				}
			}
		},
		getStoreList(){
			this.loading = true
			let parm = {
				    "categoryId": this.commodityBatch,
				  "departmentId": this.departmentIdBatch,
				     "productId": this.itemDataBatch
			}
			console.log(JSON.stringify(parm))
			this.$axios.get('/v1/productStandard/findStore',{params: parm})
				
			  .then((res) => {			  	
			  	let nowData = res.data

			  	if(nowData.code == 1){
			  		if(nowData.data.length == 0)  this.stroeResult = 'No Data'
			  		
			  		let arr = nowData.data
			  		for(let i=0; i<arr.length; i++){
			  			arr[i].checked = false
			  		}
			  		this.stroeList = arr
			  		console.log(JSON.stringify(this.stroeList))
			  		this.loading = false
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
		changeDepartment(val){
			console.log(val)
			this.commodityBatch = null     //每次选择部门时，清空类别和商品
			this.itemDataBatch = null
			this.getCommodityBatch(val)
			this.stroeList = []
			this.stroeResult = 'Please search'
		},
		getCommodityBatch(dpId){
			let parm = dpId
			this.$axios.get('/qitems/queryCommodityList',{params: {'departmentId':parm}})
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		this.commodityBatchList = nowData.data
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
		changeCommodity(val){
			console.log(val)
			this.itemDataBatch = null     //每次选择类别时，清空商品
			this.getItemBatch(val)
			this.stroeList = []
			this.stroeResult = 'Please search'
		},
		changeItemDataBatch(val){
			console.log(val)
		},
		getItemBatch(cdId){
			let parm = cdId
			this.$axios.get('/qitems/queryItemList',{params: {'categoryId':parm}})
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		this.batchItemList = nowData.data
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
/*--------------------------------------------------页面By Store-----------------------------------------*/
		editRow(row){
			this.editBefore.accelerator = row.accelerator
			this.editBefore.minShelfStandard = row.minShelfStandard
			this.editBefore.safetyStock = row.safetyStock
			row.edit = true
		},
		cancelEdit(row){
			row.edit = false
			
			row.accelerator = this.editBefore.accelerator
			row.minShelfStandard = this.editBefore.minShelfStandard
			row.safetyStock = this.editBefore.safetyStock
		},
		saveRow(row){
			this.editAfter.accelerator = row.accelerator
			this.editAfter.minShelfStandard = row.minShelfStandard
			this.editAfter.safetyStock = row.safetyStock
			
			if(this.editAfter.accelerator == this.editBefore.accelerator && this.editAfter.minShelfStandard == this.editBefore.minShelfStandard && this.editAfter.safetyStock == this.editBefore.safetyStock){
				this.$message({
			          message: 'No changes detected！',
			          type: 'warning'
			        })
				row.edit = false
			}else{
				this.postRowData(row)
			}						
		},	
		postRowData(row){
			let data = {
				  //"categoryId": row.accelerator,
				  "productId": row.productId,
				  "accelerator": row.accelerator,
				  "minShelfStandard": row.minShelfStandard,
				  "safetyStock": row.safetyStock,
				  "storeNumbers": [
				    {
				      "storeNumber": row.storeNumber
				    }
				  ]					
			}
					
			this.$axios.put('/v1/productStandard', data)
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		console.log(JSON.stringify(nowData.data))
			  		this.$message({
			          message: 'Successfully Saved！',
			          type: 'success'
			        })	
			        row.edit = false
			  	}else{
			  		console.log(nowData.errorInfo)
			  		this.$message({
			          message: 'Data anomaly',
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
		getItemDate(){
			this.$axios.get('/qitems/queryItemList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		this.itemList = nowData.data
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
			let parm = dpId
			this.$axios.get('/qitems/queryCommodityList',{params: {'departmentId':parm}})
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	if(nowData.code == 1){	
			  		this.commodityList2 = nowData.data
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
			  		this.departmentList = this.departmentBatchList = nowData.data
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
		changeItem(val){
			console.log(val)
		},
	    search2(){
	    	this.nowPage2 = 1
	    	this.getTableData2()
	    },
	    reset2(){
			this.commodity2 = null
			this.itemData = null
			this.companyText2 = null
			this.storeNumber = null
			this.departmentId = null
			
			this.getCommodity()			//重置重新查询类别
			this.getTableData2()
		},
		changeCommodity2(selVal){
			console.log(selVal)
		},
		chooseStoreName(selVal){
			console.log(selVal)
		},
		chooseDepartment(selVal){
			this.departmentId = selVal
			this.commodity2 = null         			//每次选择部门时，清空类别
			this.getCommodity(this.departmentId)	//部门和类别联动查询
			console.log(selVal)
		},
		getTableData2(){
			let _this = this
			this.loading2 = true
			let parm = {				  
				  "currentPage": this.nowPage2,	
				  "pageSize": this.pageSize2,
				  "categoryId": this.commodity2 ? this.commodity2 : null,
				  "departmentId": this.departmentId ? this.departmentId : null,
				  "code": this.companyText2 ? this.companyText2 : null,
				  "productId": this.itemData ? this.itemData : null,
				  //"productName": this.itemData2 ? this.itemData2 : null,
				  "storeNumber": this.storeNumber ? this.storeNumber : null,
			}
			console.log(JSON.stringify(parm))
			this.$axios.get('/v1/productStandard',{params: parm})
				
			  .then((res) => {			  	
			  	let nowData = res.data
				let arr = []
			  	if(nowData.code == 1){
			  		_this.loading2 = false
			  		arr = nowData.data.items
			  		arr.forEach(function(v){
			  			v.edit = false
			  				/*v.mEdit = false
			  				v.sEdit = false
			  				v.aEdit = false*/
					})
			  		_this.tableData2 = arr
					_this.totalCount2 = nowData.data.totalNum
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
		handleSizeChange2(val){
    		this.pageSize2 = val
    		console.log(this.pageSize2)
    	},
    	handleCurrentChange2(val){
    		this.nowPage2 = val
    		console.log('当前页是:'+this.nowPage2)
    		this.getTableData2()
    	}, 
    	selected(index){
    		this.nowIndex = index
    		if(index == 0){		
    			this.showTab1 = true
    			this.showTab2 = false		      	   			
    		}else{				
    			this.showTab2 = true
    			this.showTab1 = false
    		}
    	}
	},
	mounted (){
		this.getItemDate()		
		this.getCommodity()	
		this.getStoreNameList()
		this.getDepartmentList()	
	
		this.getTableData2()					
	}	
}	
</script>
<style scoped lang="less">
.upload-but {
    text-align: left; padding-left: 110px; margin-bottom: 20px;
}
.file-input{
	opacity: 0;  width: 0px; position: absolute; top: -94px; left: -234px;
}
.download{
	margin: 10px; color: #3366FF;
}
.download:hover{
	color: #FF4D34;
}
.edit-input{
	border: 1px solid #D9D9D9;
    width: 100%;
    height: 30px;
    border-radius: 5px;
} 
.batch-search{
	border-bottom: 1px solid #D7D7D7;
}
.batch-input span{
	width: 200px; display: inline-block; text-align: right; padding-right: 10px;
}
.batch-ul li{
	margin-top: 20px; text-align: left;
}
.bg-purple{
	border: 1px solid gainsboro; height: 400px; text-align: left; padding: 15px; overflow: auto;
}
.batch-button{
	margin-top: 50px; padding-left: 140px; text-align: left;
}
</style>