<template>
	<div class="edit-role">
		<div class="nav-list">
			<span class="red-font">Production Planner</span>/
			<a href="javascript:history.go(-1)">
				<span class="yellow-font">User Management</span>
			</a>
			/<span class="gray-font bh-title">Add User</span>
		</div>
		<div class="edit-cont">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
				<el-row>
				  <el-col :span="4">
				  	<div class="cont-left">
				  		<span class="red-font">*</span>
				  		<span>Username:</span>					
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right">
				  		<el-form-item label="" prop="username">
				  			<el-input v-model="ruleForm.username" placeholder="Please Input Username" style="width: 300px;"></el-input>
				  		</el-form-item>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="4">
				  	<div class="cont-left">
				  		<span class="red-font">*</span>
				  		<span>Name:</span>					
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right">
				  		<el-form-item label="" prop="name">
				  			<el-input v-model="ruleForm.name" placeholder="Please Input Name" style="width: 300px;"></el-input>
				  		</el-form-item>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="4">
				  	<div class="cont-left">
				  		<span class="red-font">*</span>
				  		<span>E-mail:</span>					
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right">
				  		<el-form-item label="" prop="email">
				  			<el-input v-model="ruleForm.email" placeholder="Please Input E-mail" style="width: 300px;"></el-input>
				  		</el-form-item>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="4">
				  	<div class="cont-left">
				  		<span class="red-font">*</span>
				  		<span>Contact Number:</span>					
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right">
				  		<el-form-item label="" prop="contactNumber">
				  			<el-input v-model="ruleForm.contactNumber" placeholder="Please Input Contact Number" style="width: 300px;"></el-input>
				  		</el-form-item>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="4">
				  	<div class="cont-left">
				  		<span class="red-font">*</span>
				  		<span>Password:</span>					
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right">
				  		<el-form-item label="" prop="password">
				  			<el-input v-model="ruleForm.password" placeholder="Please Input Password" style="width: 300px;"></el-input>
				  		</el-form-item>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="4">
				  	<div class="cont-left">
				  		<span class="red-font">*</span>
				  		<span>Status:</span>					
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right">
				  		<el-form-item label="" prop="statusId">
					  		<el-select v-model="ruleForm.statusId" placeholder="Please choose" @change="changeStatus" style="width: 300px;">
							    <el-option
							      v-for="item in statusList"
							      :key="item.id"
							      :label="item.value"
							      :value="item.id">
							    </el-option>
							</el-select>  
						</el-form-item>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="4">
				  	<div class="cont-left">
				  		<span class="red-font">*</span>
				  		<span>Select a Role:</span>					
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right">
				  		<el-form-item label="" prop="roleId">
					  		<el-select v-model="ruleForm.roleId" placeholder="Please choose" @change="changeRole" style="width: 300px;">
							    <el-option
							      v-for="item in roleList"
							      :key="item.id"
							      :label="item.value"
							      :value="item.id">
							    </el-option>
							</el-select> 
						</el-form-item>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="4">
				  	<div class="cont-left">
				  		<span class="red-font">*</span>
				  		<span>storeName:</span>					
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right">
				  		<el-form-item label="" prop="storeNumber">
					  		<el-select v-model="ruleForm.storeNumber" placeholder="Please choose" @change="changeStore" style="width: 300px;">
							    <el-option
							      v-for="item in storeNameList"
							      :key="item.number"
							      :label="item.name"
							      :value="item.number">
							    </el-option>
							</el-select>  
						</el-form-item>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="4">
				  	<div class="cont-left">
				  		<span>departmentName:</span>					
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right">
				  		<el-select v-model="ruleForm.departmentId" placeholder="Please choose" @change="changeDepartment" style="width: 300px;">
						    <el-option
						      v-for="item in departmentList"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>  
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="4">
				  	<div class="cont-left"></div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right">
				  		<div style="margin: 30px 0 50px;">
							<el-button type="danger" @click="submitForm('ruleForm')">Save</el-button>
							<a href="javascript:history.go(-1)">
								<el-button type="info" style="margin-left: 10px;">Cancel</el-button>
							</a>
						</div>
				  	</div>
				  </el-col>
				</el-row>
			</el-form>	
		</div>
		
	</div>
</template>

<script>
export default{
	data(){
		var CheckTel = (rule, value, callback) => {
	        if (!value) {
		          callback(new Error('Please enter your telephone number!'));
		        } else if (!Number.isInteger(parseInt(value))) {
		          callback(new Error('The telephone number must be a number!'));
		        } else {
		          callback();
        	}
	    }
		return{
			ruleForm: {
				username: null,
				name: null,
				email: null,
				contactNumber: null,
				password: null,
				statusId: null,
				roleId: null,
				storeNumber: null,
				departmentId: null
			},			
	      	roleList: [],
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
	      	storeNameList: [],	      	
	      	departmentList: [],
			loading: true,
			rules: {
	          username: [
	            { required: true, message: 'Please fill in the user name!', trigger: 'blur' }
	          ],
	          name: [
	            { required: true, message: 'Please fill in the name!', trigger: 'blur' }
	          ],
	          email: [
	            { required: true, message: 'Please fill in the email!', trigger: 'blur' },
	            { type: 'email', message: 'Please enter the correct email address!', trigger: ['blur'] }
	          ],
	          contactNumber: [	            
	            { required: true, validator: CheckTel, trigger: 'blur' }
	          ],
	          password: [
	            { required: true, message: 'Please fill in the password!', trigger: 'blur' }
	          ],	
	          statusId: [
	            { required: true, message: 'Please choose one item!', trigger: 'change' }
	          ],
	          roleId: [
	            { required: true, message: 'Please choose one item!', trigger: 'change' }
	          ],
	          storeNumber: [
	            { required: true, message: 'Please choose one item!', trigger: 'change' }
	          ]
	        }
		}
	},	
	methods:{
		getRoleList(){
			this.$axios.get('/qitems/queryRoleList')
				
			  .then((res) => {			  	
			  	let nowData = res.data		  	
			  	
			  	if(nowData.code == 1){
			  		this.roleList = nowData.data
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
			  		this.departmentList = nowData.data
			  		//选择部门时加上none选项
					this.departmentList.unshift({
							  'id': null,
							'name': 'none'
					})
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
		submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            this.saveRole()
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	    },
		saveRole(){
			let _this = this
        	let parm = {
				  "userName": this.ruleForm.username,
				  "password": this.ruleForm.password,	
				  "storeNumber": this.ruleForm.storeNumber,
        		  "state": this.ruleForm.statusId,
				  "departmentId": this.ruleForm.departmentId,
				  "roleId": this.ruleForm.roleId,	
				  "name": this.ruleForm.name,				  			
				  "email": this.ruleForm.email,				  			
				  "phone": this.ruleForm.contactNumber,				  			
			}
			console.log(parm)		
			this.$axios.post('/v1/user', parm)
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
			  	if(nowData.code == 1){	
			  		console.log(JSON.stringify(nowData.data))
			  		this.$message({
			          message: 'Successfully Saved！',
			          type: 'success'
			        })
			  		setTimeout(function(){
			       		_this.$router.push('/tscg_system/user')
			        },1000)
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
		changeRole(selVal){
			console.log(selVal)
		},
		changeStatus(selVal){
			console.log(selVal)
		},
		changeStore(selVal){
			console.log(selVal)
		},
		changeDepartment(selVal){
			console.log(selVal)
		}
	},
	mounted (){
		this.getRoleList()
		this.getStoreNameList()
		this.getDepartmentList()
				
	}	
}	
</script>

<style lang="less" scoped>	
.edit-role .edit-cont{
	padding-top: 20px;
	.cont-left{
	text-align: right; padding-right: 20px; margin-top: 10px;
	}
	.cont-right{
		text-align: left; padding-left: 20px;
	}
	.el-row{
		margin-bottom: 10px;
	}		
	.role-table {
	    border: 1px solid #e0e0e0;
	    border-bottom: none;
	    padding: 0;
	    position: relative;
	}	
	.header {
	    height: 40px;
	    line-height: 40px;
	    border-bottom: 1px solid #e7e7e7;
	    background: #F8F8F9;
	    text-align: center;
	}	
	.vertical-line {
	    width: 1px;
	    height: 100%;
	    background: #ddd;
	    position: absolute;
	    left: 30%;
	    top: 0
	}	
	.left {
	    width: 28%;
	    float: left;
	    padding-left: 10px;
	    user-select: none;
	    cursor: pointer;
	}	
	.one {
	    padding-left: 20px;
	}	
	.right {
	    width: 70%;
	    float: left;
	    padding-left: 30px;
	    box-sizing: border-box;
	}	
	.item-icon {
	    margin-left: -5px;
	    padding: 5px;
	}	
	.line {
	    clear: both;
	    width: 100%;
	    height: 1px;
	    background: #e0e0e0;
	}
	.h40{
	    height: 39px;
	    line-height: 39px;
	}
	[v-cloak] {
	    display: none;
	}
	.role-li{
		padding-bottom: 3px;
	}
	.el-checkbox+.el-checkbox{
	    margin-left: 0px;
	}
	.el-checkbox{
		margin-right: 30px;
	}
}


</style>