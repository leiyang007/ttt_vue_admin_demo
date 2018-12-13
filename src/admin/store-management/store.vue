<template>
  <div class="salesData">
    <div class="nav-list">
      <span class="red-font">Store Management</span> /
      <span class="gray-font">Store</span>
    </div>
    <div>
			<div class="nav-head-one">
				<ul class="clear">
					<li class="red-font">Store</li>
				</ul>
			</div>
		</div>
    <div class="body-box">
      <div class="table-head clear">
				<ul class="clear" style="float: left; margin-top: 0;">
					<li>	
						<div class="demo-input-suffix">
							<span class="oneline">Store Number:</span>
						  	<el-input v-model="storeNumber" placeholder="Please input store name" style="width: 200px;"></el-input>
						</div>
					</li>
					<li>	
						<div class="demo-input-suffix">
							<span class="oneline">Store Name:</span>
						  	<el-input v-model="storeName" placeholder="Please input store name" style="width: 200px;"></el-input>
						</div>
					</li>
					<li>	
						<div class="demo-input-suffix">
							<span class="oneline">Contact:</span>
						  	<el-input v-model="contact" placeholder="Please input store name" style="width: 200px;"></el-input>
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
				<div class="search-but">
					<el-button type="danger" @click="search">Search</el-button>
					<el-button type="danger" @click="reset">Reset</el-button>
				</div>	
				<div class="add-but">
					<el-button type="danger" @click="openAdd">Add New Store</el-button>
				</div>
			</div>
      <div class="table-body">
        <template>
          <el-table ref="multipleTable" key='secondTable' v-loading="loading" :data="tableData" tooltip-effect="dark" border :header-cell-style="tableHeaderColor">
            <el-table-column prop="number" label="Store Number" >
            </el-table-column>
            <el-table-column prop="name" label="Store Name" >
            </el-table-column>
            <el-table-column prop="address" label="Address" >
            </el-table-column>
            <el-table-column prop="contact" label="Contact" >
            </el-table-column>
            <el-table-column prop="contactTel" label="ContactTel" >
            </el-table-column>
            <el-table-column prop="state" label="State" :formatter="formatState">
            </el-table-column>
            <el-table-column prop="updateTime" label="UpdateTime" :formatter="formatDate">
            </el-table-column>
            <el-table-column prop="userName" label="Operator" >
            </el-table-column>
            <el-table-column label="Operating">
            	<template slot-scope="scope">
				        	<span class="blue-font pointer operating" @click="openEdit(scope.row)">Edit</span> |
				        	<span class="blue-font pointer operating" @click="openDelete(scope.row)">Delete</span> 
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
  </div>
</template>

<script>
  export default{
    data(){
      return {
      	nowPage: 1,				//当前页
        pageSize: this.GLOBAL.pageSize,			//每页显示条数
        totalCount: 0,			//总条数
        storeNumber: null,
        storeName: null,
        contact: null,
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
        tableData: [],
        loading: true,
        storeForm: {
          id: null,
          name: '',
          description: ''
        }
      }
    },
    created() {
      this.getTableData()
    },
    methods: {
    	tableHeaderColor({ row, column, rowIndex, columnIndex }) {
		    if (rowIndex === 0) {
		        return 'background-color: #F5F7FA;'
		    }
			},
			formatState(rows){
				if(rows.state == 0){
					return 'Effective'
				}else{
					return 'Invalid'
				}
			},
			formatDate(rows){
				let time = new Date(rows.updateTime)
				return this.moment(time).format("MM/DD/YYYY H:m:s")
			},
			changeStatus(selVal){
				console.log(selVal)
			},
			reset(){
				this.storeName = null
				this.storeNumber = null
				this.contact = null
				this.statusId = null
				this.getTableData()
			},
      search() {
        this.nowPage = 1
        this.getTableData()
      },
      getTableData() {
        this.loading = true

        let params = {
          "currentPage": this.nowPage,
          "pageSize": this.pageSize,
          "number": this.storeNumber,
          "name": this.storeName,
          "contact": this.contact,
          "state": this.statusId        
        }
        console.log(params)
        return this.$axios.get('/v1/store', {params: params})
          .then((res) => {
            let nowData = res.data
            if (nowData.data && nowData.data.items) {
              this.tableData = nowData.data.items
              this.totalCount = nowData.data.totalNum
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message({
              message: err,
              type: 'warning'
            })
          })
          .finally(()=>{
            this.loading = false
          })
      },
      handleSizeChange(val){
        this.pageSize = val
        console.log(this.pageSize)
      },
      handleCurrentChange(val){
        this.nowPage = val
        console.log('当前页是:'+this.nowPage)
        this.getTableData()
      },
      openAdd() {
        this.$router.push({
          name: 'newStore'
        })
      },
      openEdit(row) {
        this.$router.push({
          name: 'editStore',
          query: {
            number: row.number
          }
        })
      },
      openDelete(row) {
        this.$confirm('Delete store will can not be rollback, Continue to delete?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
        	let parm = row.number
          this.loading = true
          this.$axios.delete('/v1/store', {params: {number:parm}})
            .then((res) => {
              this.$message({
                type: 'success',
                message: 'Delete store successful!'
              });
              return this.getTableData()
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                message: err,
                type: 'warning'
              })
            })
            .finally(() => {
              this.loading = false
              this.dialogAddFormVisible = false
            })
        }).catch(() => {
        	this.$message({
	            type: 'info',
	            message: 'Delete request has been cancelled!'
	          });
        });
      }
    }
  }
</script>
<style scoped>
.table-head {
  padding-top: 10px;
  text-align: left;
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
.demo-input-suffix > span{
	width: 120px;
}
</style>
