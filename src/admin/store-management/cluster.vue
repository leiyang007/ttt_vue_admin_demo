<template>
  <div class="salesData">
    <div class="nav-list">
      <span class="red-font">Store Management</span> /
      <span class="gray-font">Cluster</span>
    </div>
    <div>
			<div class="nav-head-one">
				<ul class="clear">
					<li class="red-font">Cluster</li>
				</ul>
			</div>
		</div>
    <div class="body-box">
      <div class="table-head clear">
				<ul class="clear" style="float: left; margin-top: 0;">
					<li>	
						<div class="demo-input-suffix">
							<span class="oneline">Cluster Name:</span>
						  	<el-input v-model="clusterName" placeholder="Please input cluster name" style="width: 200px;"></el-input>
						</div>
					</li>				
				</ul> 
				<div class="search-but">
					<el-button type="danger" @click="search">Search</el-button>
					<el-button type="danger" @click="reset">Reset</el-button>
				</div>	
				<div class="add-but">
					<el-button type="danger" @click="openAdd">Add New Cluster</el-button>
				</div>
			</div>
      <div class="table-body">
        <template>
          <el-table ref="multipleTable" key='secondTable' v-loading="loading" :data="tableData" tooltip-effect="dark" border :header-cell-style="tableHeaderColor">
            <el-table-column prop="name" label="Cluster" >
            </el-table-column>
            <el-table-column prop="description" label="Description">
            </el-table-column>
            <el-table-column prop="updateTime" label="Update Time" :formatter="formatDate">
            </el-table-column>
            <el-table-column prop="userName" label="Operator">
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
    <el-dialog title="Cluster Info" :close-on-click-modal="false" width="600px" :visible.sync="dialogAddFormVisible" append-to-body>
      <el-form :model="clusterForm" ref="clusterForm" class="dislog" :rules="rules">
        <el-form-item label="Cluster Name:" prop="name" :label-width="formLabelWidth">
          <el-input v-model="clusterForm.name" autocomplete="off" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="Description:" prop="name" :label-width="formLabelWidth">
          <el-input v-model="clusterForm.description" autocomplete="off" style="width: 80%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible=false">Cancel</el-button>
        <el-button type="danger" @click="submitForm('clusterForm')">OK</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default{
    data(){
      return {
        clusterName: null,
        nowPage: 1,				//当前页
        pageSize: this.GLOBAL.pageSize,			//每页显示条数
        totalCount: 0,			//总条数
        tableData: [],
        loading: true,
        dialogAddFormVisible: false,
        formLabelWidth: '150px',
        clusterForm: {
          id: null,
          name: '',
          description: ''
        },
        rules: {
	          name: [
	            { required: true, message: 'Please fill in the name!', trigger: 'blur' }
	          ],
	          description: [
	            { required: true, message: 'Please fill in the description!', trigger: 'blur' }
	          ],
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
			reset(){
				this.clusterName = null
				this.getTableData()
			},
			formatDate(rows){
				let time = new Date(rows.updateTime)
				return this.moment(time).format("MM/DD/YYYY H:m:s")
			},
      search() {
        this.nowPage = 1
        this.getTableData()
      },
      getTableData() {
        let _this = this
        this.loading = true
        let params = {
          "currentPage": this.nowPage,
          "pageSize": this.pageSize,
          "name": this.clusterName ? this.clusterName : null
        }
        return this.$axios.get('/v1/cluster', {params: params})
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
        this.clusterForm = {
          name: '',
          description: ''
        }
        this.dialogAddFormVisible = true
      },
      openEdit(row) {
        this.clusterForm = {
          id: row.id,
          name: row.name,
          description: row.description
        }
        this.dialogAddFormVisible = true
      },
      openDelete(row) {
        this.$confirm('Delete cluster will can not be rollback, Continue to delete?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.loading = true
          this.$axios.delete('/v1/cluster', {
            params: {
              clusterId: row.id
            }
          })
            .then((res) => {
              this.$message({
                type: 'success',
                message: 'Delete cluster successful!'
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
      },
      submitForm(formName){
      	this.$refs[formName].validate((valid) => {
	          if (valid) {
	            this.clusterFormSave()
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
      },
      clusterFormSave() {
        if (!this.clusterForm.id) {
          this.loading = true
          this.$axios.post('/v1/cluster', {
            name: this.clusterForm.name,
            description: this.clusterForm.description
          })
            .then((res) => {
            	this.$message({
	                message: 'Successfully Saved！',
	                type: 'success'
	              })
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
        } else {
          this.loading = true
          this.$axios.put('/v1/cluster', {
            id: this.clusterForm.id,
            name: this.clusterForm.name,
            description: this.clusterForm.description
          })
            .then((res) => {
            	this.$message({
	                message: 'Successfully Saved！',
	                type: 'success'
	              })
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
        }
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
	width: 150px;
}
</style>
