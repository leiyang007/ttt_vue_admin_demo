<template>
  <div class="salesData">
    <div class="nav-list">
      <span class="red-font">Store Management</span> /
      <span class="gray-font">Region</span>
    </div>
    <div>
			<div class="nav-head-one">
				<ul class="clear">
					<li class="red-font">Region</li>
				</ul>
			</div>
		</div>
    <div class="body-box">
      <div class="table-head clear">
				<ul class="clear" style="float: left; margin-top: 0;">
					<li>	
						<div class="demo-input-suffix">
						  	<el-input v-model="filterText" placeholder="Type to filter" style="width: 200px;"></el-input>
						</div>
					</li>				
				</ul> 
				<div class="search-but">
					<el-button type="danger" @click="openAddRegion">Add New Region</el-button>
				</div>	
			</div>
      <div class="table-body">
        <el-tree
          class="filter-tree"
          :data="regions"
          :props="defaultProps"
          :load="loadDistrict"
          :filter-node-method="filterNode"
          lazy
          ref="regionTree">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span v-if="node.level == 1">
              <el-button
                type="text"
                size="mini"
                @click.stop="() => openAddDistrict(node, data)">
                Add District
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => openEditRegion(node, data)">
                Edit
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => openDeleteRegion(node, data)">
                Delete
              </el-button>
            </span>
            <span v-if="node.level == 2">
              <el-button
                type="text"
                size="mini"
                @click.stop="() => openEditDistrict(node, data)">
                Edit
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop="() => openDeleteDistrict(node, data)">
                Delete
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <el-dialog title="Region Info" :close-on-click-modal="false" width="600px" :visible.sync="dialogRegionFormVisible" append-to-body>
      <el-form :model="regionForm" ref="regionForm" class="dislog" :rules="rules1">
        <el-form-item label="Region Name" prop="name" :label-width="formLabelWidth">
          <el-input v-model="regionForm.name" autocomplete="off" style="width: 80%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRegionFormVisible=false">Cancel</el-button>
        <el-button type="danger" @click="submitForm1('regionForm')">OK</el-button>
      </div>
    </el-dialog>
    <el-dialog title="District Info" :close-on-click-modal="false" width="600px" :visible.sync="dialogDistrictFormVisible" append-to-body>
      <el-form :model="districtForm" ref="districtForm" class="dislog" :rules="rules2">
        <el-form-item label="District Name" prop="name" :label-width="formLabelWidth">
          <el-input v-model="districtForm.name" autocomplete="off" style="width: 80%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDistrictFormVisible=false">Cancel</el-button>
        <el-button type="danger" @click="submitForm2('districtForm')">OK</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        regionForm: {
          id: null,
          name: null
        },
        districtForm: {
          id: null,
          name: null
        },
        filterText: '',
        formLabelWidth: '150px',
        regions: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          isLeaf: (data, node) => {
            return node.level > 1
          }
        },
        dialogRegionFormVisible: false,
        dialogDistrictFormVisible: false,
        rules1: {
	          name: [
	            { required: true, message: 'Please fill in the name!', trigger: 'blur' }
	          ]
	       },
        rules2: {
	          name: [
	            { required: true, message: 'Please fill in the name!', trigger: 'blur' }
	          ]
	        }
      };
    },
    created() {
      this.loadRegion()
    },
    watch: {
      filterText(val) {
        this.$refs.regionTree.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      loadRegion() {
        this.loading = true
        let params = {
        }
        return this.$axios.get('/qitems/queryRegionList', {params: params})
          .then((res) => {
            this.regions = res.data.data
          })
          .catch((err) => {
          })
          .finally(()=>{
            this.loading = false
          })
      },
      loadDistrict(node, resolve) {
        if (node.level === 0) {
          resolve([])
          return
        }
        this.loading = true
        let params = {
          regionId: node.data.id
        }
        return this.$axios.get('/qitems/queryDistrictList', {params: params})
          .then((res) => {
            resolve(res.data.data)
          })
          .catch((err) => {
          })
          .finally(()=>{
            this.loading = false
          })
      },
      openAddRegion() {
        this.regionForm = {
          id: null,
          name: null
        }
        this.dialogRegionFormVisible = true
      },
      openEditRegion(node, data) {
        this.regionForm = data
        this.dialogRegionFormVisible = true
      },
      openDeleteRegion(node, data) {
        this.$confirm('Delete region will can not be rollback, continue to delete?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.loading = true
          this.$axios.delete('/v1/region', {
            params: {
              regionId: data.id
            }
          })
            .then((res) => {
            	let nowData = res.data	
            	if(nowData.code == 1){
            		this.$message({
	                type: 'success',
	                message: 'Delete region successful!'
	              });
	              this.loadRegion()
            	}else{
            		this.$message({
	                message: nowData.errorInfo,
	                type: 'warning'
	              })
            	}             
            })
            .catch((err) => {
              this.$message({
                message: 'Fail',
                type: 'warning'
              })
            })
            .finally(() => {
              this.loading = false
            })
        }).catch(() => {
        	this.$message({
	            type: 'info',
	            message: 'Delete request has been cancelled!'
	          });
        });
      },
      submitForm1(formName){
      	this.$refs[formName].validate((valid) => {
	          if (valid) {
	            this.regionFormSave()
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
      },
      regionFormSave() {
        if (!this.regionForm.id) {
          this.loading = true
          this.$axios.post('/v1/region', {
            name: this.regionForm.name
          })
            .then((res) => {
            	this.$message({
	                message: 'Successfully Saved！',
	                type: 'success'
	              })
              this.loadRegion()
            })
            .catch((err) => {
              this.$message({
                message: 'Fail',
                type: 'warning'
              })
            })
            .finally(() => {
              this.loading = false
              this.dialogRegionFormVisible = false
            })
        } else {
          this.loading = true
          this.$axios.put('/v1/region', {
            id: this.regionForm.id,
            name: this.regionForm.name
          })
            .then((res) => {
            	this.$message({
	                message: 'Successfully Saved！',
	                type: 'success'
	              })
              this.loadRegion()
            })
            .catch((err) => {
              this.$message({
                message: 'Fail',
                type: 'warning'
              })
            })
            .finally(() => {
              this.loading = false
              this.dialogRegionFormVisible = false
            })
        }
      },
      openAddDistrict(node, data) {
        this.districtForm = {
          regionId: data.id,
          id: null,
          name: null
        }
        this.dialogDistrictFormVisible = true
      },
      openEditDistrict(node, data) {
        this.districtForm = data
        this.dialogDistrictFormVisible = true
      },
      openDeleteDistrict(node, data) {
        this.$confirm('Delete district will can not be rollback, continue to delete?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.loading = true
          this.$axios.delete('/v1/district', {
            params: {
              districtId: data.id
            }
          })
            .then((res) => {
              this.$message({
                type: 'success',
                message: 'Delete district successful!'
              });
              this.loadRegion()
            })
            .catch((err) => {
              this.$message({
                message: 'Fail',
                type: 'warning'
              })
            })
            .finally(() => {
              this.loading = false
            })
        }).catch(() => {
        	this.$message({
	            type: 'info',
	            message: 'Delete request has been cancelled!'
	          });
        });
      },
      submitForm2(formName){
      	this.$refs[formName].validate((valid) => {
	          if (valid) {
	            this.districtFormSave()
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
      },
      districtFormSave() {
        if (!this.districtForm.id) {
          this.loading = true
          this.$axios.post('/v1/district', {
            regionId: this.districtForm.regionId,
            name: this.districtForm.name
          })
            .then((res) => {
            	this.$message({
	                message: 'Successfully Saved！',
	                type: 'success'
	              })
              this.loadRegion()
            })
            .catch((err) => {
              this.$message({
                message: 'Fail',
                type: 'warning'
              })
            })
            .finally(() => {
              this.loading = false
              this.dialogDistrictFormVisible = false
            })
        } else {
          this.loading = true
          this.$axios.put('/v1/district', {
            regionId: this.districtForm.regionId,
            id: this.districtForm.id,
            name: this.districtForm.name
          })
            .then((res) => {
            	this.$message({
	                message: 'Successfully Saved！',
	                type: 'success'
	              })
              this.loadRegion()
            })
            .catch((err) => {
              this.$message({
                message: 'Fail',
                type: 'warning'
              })
            })
            .finally(() => {
              this.loading = false
              this.dialogDistrictFormVisible = false
            })
        }
      }
    }
  };
</script>
<style scoped>
.table-head {
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.search-but{
	border-bottom: 1px solid #D7D7D7;
}
.el-tree{
	width: 50%; min-width: 500px; min-height: 300px; border: 1px solid gainsboro; border-radius: 5px; padding: 20px;
}
.el-button--mini, .custom-tree-node{
	font-size: 16px;
}
.el-button--text:hover{
	color: #A71D5D;
}
</style>
