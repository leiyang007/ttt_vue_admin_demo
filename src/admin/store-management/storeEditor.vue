<template>
	<div class="edit-role">
		<div class="nav-list">
      <router-link class="red-font" :to="{name: 'storeList'}">Store Management</router-link> /
      <span class="gray-font">{{title}}</span>
		</div>
		<div class="edit-cont">
      <el-form :model="storeForm" :rules="rules" ref="storeForm" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="Store Number" prop="number">
              <el-input v-model="storeForm.number" :disabled="!newStore" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="Store Name" prop="name">
            <el-input v-model="storeForm.name" autocomplete="off"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Contact">
              <el-input v-model="storeForm.contact" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Contact Tel">
              <el-input v-model="storeForm.contactTel" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Region" prop="regionId">
              <el-select class="w100p" v-model="storeForm.regionId" filterable clearable placeholder="Select Region">
                <el-option
                  v-for="region in regions"
                  :key="region.id"
                  :label="region.name"
                  :value="region.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="District" prop="districtId">
              <el-select class="w100p" v-model="storeForm.districtId" filterable clearable placeholder="Select District">
                <el-option
                  v-for="district in districts"
                  :key="district.id"
                  :label="district.name"
                  :value="district.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="Address">
              <el-input v-model="storeForm.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Department & Cluster" label-width="200px" style="font-weight: bold;">
            </el-form-item>
            <el-form-item v-for="(department,index) in storeForm.dc" :prop="'dc.' + index + '.clusterId'" 
            	:rules="{
			      required: true, message: 'Please choose one Cluster!', trigger: 'change'
			    }"
            	 :label="department.departmentName" :key="department.departmentId" label-width="200px">           	 
              <el-select v-model="department.clusterId" filterable placeholder="Select Cluster">
                <el-option
                  v-for="cluster in clusters"
                  :key="cluster.id"
                  :label="cluster.name"
                  :value="cluster.id">
                </el-option>               
              </el-select>
            </el-form-item>
            <el-form-item>
              	<el-button type="danger" @click="submitForm('storeForm')">Save</el-button>
				<a href="javascript:history.go(-1)">
					<el-button type="info" style="margin-left: 10px;">Cancel</el-button>
				</a>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
		</div>

	</div>
</template>

<script>
export default{
	data() {
		return {
      		newStore: true,
		  	title: '',
      		clusters: [],
      		departments: [],
		    storeForm: {
		        number: '',
		        name: '',
		        dc: [],
		        description: '',
		        address: '',
		        contact: '',
		        contactTel: '',
		        regionId: '',
		        districtId: ''
		    },
		    regions: [],
		    districts: [],
		    rules: {
	          number: [
	            { required: true, message: 'Please fill in the Store Number!', trigger: 'blur' }
	          ],
	          name: [
	            { required: true, message: 'Please fill in the Store Name!', trigger: 'blur' }
	          ],
	          regionId: [
	            { required: true, message: 'Please choose one Region!', trigger: 'change' }
	          ],
	          districtId: [
	            { required: true, message: 'Please choose one District!', trigger: 'change' }
	          ],
	          clusterId: [
	            { required: true, message: 'Please choose one Cluster!', trigger: 'change' }
	          ],	          
	     }
		}
	},
	methods:{
		submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            this.storeFormSave()
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	    },
	    storeFormSave() {
	    	let _this = this
	      if (this.newStore) {
	        this.loading = true
	        this.$axios.post('/v1/store', this.storeForm)
	          .then((res) => {
	            if (res.data.code == 1) {
	              this.$message({
	                message: 'Successfully Saved！',
	                type: 'success'
	              })
	              this.loadStore()
	              setTimeout(function(){
			       		_this.$router.push({name: 'storeList'})
			        },1000)
	            } else {
	              this.$message({
	                message: res.data.errorInfo,
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
	      } else {
	        this.loading = true
	        this.$axios.put('/v1/store', this.storeForm)
	          .then((res) => {
	            if (res.data.code == 1) {
	              this.$message({
	                message: 'Successfully Saved！',
	                type: 'success'
	              })
	              this.loadStore()
	              setTimeout(function(){
			       		_this.$router.push({name: 'storeList'})
			        },1000)
	            } else {
	              this.$message({
	                message: res.data.errorInfo,
	                type: 'warning'
	              })
	            }
	          })
	          .catch((err) => {
	            console.log(err);
	            this.$message({
	              message: 'Fail',
	              type: 'warning'
	            })
	          })
	          .finally(() => {
	            this.loading = false
	          })
	      }
	    },
	    updateTitle() {
	      if (this.$route.name == 'newStore') {
	        this.newStore = true
	        this.title = 'New Store'
	      } else if (this.$route.name == 'editStore') {
	        this.newStore = false
	        this.title = 'Edit Store'
	      }
	    },
	    loadStore() {
	      if (this.$route.query.number) {
	        this.loading = true
	        this.$axios.get('/v1/store/' + this.$route.query.number)
	          .then((res) => {
	            this.storeForm = res.data.data
	            var dc = []
	            if (this.departments) {
	              for (var i in this.departments) {
	                var dcRow = {
	                  departmentId: this.departments[i].id,
	                  departmentName: this.departments[i].name,
	                  clusterId: null
	                }
	                for (var j in this.storeForm.dc) {
	                  if (this.storeForm.dc[j].departmentId == dcRow.departmentId) {
	                    dcRow.clusterId = this.storeForm.dc[j].clusterId
	                    break
	                  }
	                }
	                dc.push(dcRow)
	              }
	              this.storeForm.dc = dc
	            }
	          })
	          .catch((err) => {
	            console.log(err);
	          })
	          .finally(() => {
	            this.loading = false
	          })
	      }
	    },
	    loadDepartment() {
	      this.loading = true
	      this.$axios.get('/qitems/queryDepartmentList')
	        .then((res) => {
	          let nowData = res.data
	          this.departments = nowData.data
	          if (!this.newStore) {
	            this.loadStore()
	          } else {
	            if (this.departments) {
	              var dc = []
	              for (var i in this.departments) {
	                var dcRow = {
	                  departmentId: this.departments[i].id,
	                  departmentName: this.departments[i].name,
	                  clusterId: null
	                }
	                dc.push(dcRow)
	              }
	              this.storeForm.dc = dc
	            }
	          }
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
	        })
	    },
	    loadCluster() {
	      this.loading = true
	      this.$axios.get('/qitems/queryClusterList')
	        .then((res) => {
	          let nowData = res.data
	          if (nowData.data) {
	            this.clusters = nowData.data
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
	    loadRegion() {
	      this.loading = true
	      this.regions = []
	        this.$axios.get('/qitems/queryRegionList')
	        .then((res) => {
	          if (res.data.data) {
	            this.regions = res.data.data
	          }
	        })
	        .catch((err) => {
	          this.$message({
	            message: 'Fail',
	            type: 'warning'
	          })
	        })
	        .finally(()=>{
	          this.loading = false
	        })
	    },
	    loadDistrict(regionId) {
	      let params = {
	        regionId: regionId
	      }
	      this.loading = true
	      return this.$axios.get('/qitems/queryDistrictList', {params: params})
	        .then((res) => {
	          this.districts = res.data.data
	        })
	        .catch((err) => {
	        })
	        .finally(()=>{
	          this.loading = false
	        })
	    }
	},
	created (){
	    this.updateTitle()
	    this.loadDepartment()
	    this.loadCluster()
	    this.loadRegion()
	},
	mounted (){

	},
  watch: {
	  '$route'(to, form) {
	    this.updateTitle()
    },
	  'storeForm.regionId'(to, form) {
	    this.loadDistrict(to)
    }
  }
}
</script>

<style lang="less">
  .edit-cont {
    padding-top: 20px;
    max-width: 800px;
  }
  .el-form-item__content {
    text-align: left;
  }
  .w100p {
    width: 100%;
  }
</style>
