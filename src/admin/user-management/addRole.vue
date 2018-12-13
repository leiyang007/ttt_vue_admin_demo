<template>
	<div class="edit-role">
		<div class="nav-list">
			<span class="red-font">Production Planner</span>/
			<a href="javascript:history.go(-1)">
				<span class="yellow-font">Role Management</span>
			</a>
			/<span class="gray-font bh-title">Add Role</span>
		</div>
		<div class="edit-cont">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
				<el-row style="margin-bottom: 0;">
				  <el-col :span="4">
				  	<div class="cont-left">
				  		<span class="red-font">*</span>
				  		<span>Role Name:</span>					
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right">
				  		<el-form-item label="" prop="roleName">
				  			<el-input v-model="ruleForm.roleName" placeholder="Please input contents" style="width: 300px;"></el-input>
				  		</el-form-item>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="4">
				  	<div class="cont-left">
				  		<span>Description:</span>					
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right">
				  		<el-input type="textarea" v-model="description" placeholder="Please input description" style="width: 300px;"></el-input>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="4">
				  	<div class="cont-left">
				  		<span>Select Permission:</span>					
				  	</div>
				  </el-col>
				  <el-col :span="20">
				  	<div class="cont-right table-body">
				  		<ul class="role-table col-xs-offset-2 col-md-offset-1 col-sm-offset-2">
						    <li class="header">
						        <div class="left">Menu</div>
						        <div class="right">Menu permissions</div>
						    </li>
						    <div class="vertical-line"></div>
						    <li class="role-li" v-for="(item,index) in dataTree" :key="item.id" :data-id="item.moudleId">
						        <div class="left h40"  @click="fold(item)">
						            <i :class="{'el-icon-caret-right':item.folded,'el-icon-caret-bottom':!item.folded}"
						               v-cloak v-if="item.list"
						               class="item-icon"></i>					            
						               <span v-if="item.list" v-cloak>{{item.name}}</span>
						        </div>
						        <div class="right h40">
						            <el-checkbox v-if="item.list" @change="checkSecondAll($event,item)" v-model="item.selected"> Menu</el-checkbox>
						        </div>
						        <div class="line"></div>
						        <ul class="second-ui" v-show="item.list&&!item.folded">
						            <li class="h40" v-for="(second,cur) in item.list" :key="second.id">
						            <!--<li class="h40" v-if="second.list.length != []" v-for="(second,cur) in item.list" :key="second.id">-->
						                <div class="left">
						                    <el-checkbox v-model="second.selected" @change="handleCheckAllChange($event,item,second)" v-cloak>
						                        {{second.name}}
						                    </el-checkbox>
						                </div>
						                <div class="right">
						                    <el-checkbox v-for="third in second.list" v-model="third.selected" @change="handleCheckedRoleChange($event,item,second,third)" v-cloak>
						                        {{third.name}}
						                    </el-checkbox>
						                </div>
						                <div class="line"></div>
						            </li>
						        </ul>
						    </li>
						</ul>	
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
		return{
			ruleForm: {
				roleName: null,
			},			
			description: null,
			dataTree: [],
			loading: true,
			rules: {
	          roleName: [
	            { required: true, message: 'Please input a valid Role Name!', trigger: ['blur', 'change'] }
	          ]
	        }
		}
	},	
	methods:{
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
		fold(item){		
            if (typeof item.folded === "undefined") {
                this.$set(item, "folded", true);
            } else {
                item.folded = !item.folded;
            }
        },
        handleCheckAllChange(e,item,second){
        	console.log(JSON.stringify(second))
        	let secondArr = item.list
        	let isCheckFirst = this.isInArray(secondArr,true)
			if(isCheckFirst){
				item.selected = true
			}else{
				item.selected = false
			}
        	if(secondArr){
    			if(e == false){
	    			second.list.forEach(function(event,index){
	    				event.selected = false	    				
	    			})
	    		}else{
	    			second.list.forEach(function(event,index){
	    				event.selected = true
	    			})
	    		}
    		}        	
        },
        handleCheckedRoleChange(e,item,second,third){
        	console.log(JSON.stringify(second))
        	let firstArr = item.list       	       	
        	let isCheckSecond = this.isInArray(second.list,true)       	      	
			if(isCheckSecond){
				second.selected = true
			}else{
				second.selected = false
			}	
			
			let isCheckFirst = this.isInArray(firstArr,true)
			if(isCheckFirst){
				item.selected = true
			}else{
				item.selected = false
			}
			console.log(isCheckFirst)
        },
        checkSecondAll(e,item){
        	console.log(JSON.stringify(item))
        	let secondArr = item.list
        	if(e == false){
        		for(let i=0; i<secondArr.length; i++){
	        		secondArr[i].selected = false
	        		let thirdArr = secondArr[i].list
	        		for(let j=0; j<thirdArr.length; j++){
	        			thirdArr[j].selected = false
	        		}
	        	}
        	}else{
        		for(let i=0; i<secondArr.length; i++){
	        		secondArr[i].selected = true
	        		let thirdArr = secondArr[i].list
	        		for(let j=0; j<thirdArr.length; j++){
	        			thirdArr[j].selected = true
	        		}
	        	}
        	}
        	
        },
        isInArray(arr,value){				//判断元素是否在数组中
		    for(var i = 0; i < arr.length; i++){
		        if(value === arr[i].selected){
		            return true;
		        }
		    }
		    return false;
		},
        saveRole(){
        	let _this = this
        	let parm = {
        		  "id": null,
				  "description": this.description,
				  "roleName": this.ruleForm.roleName,	
				  "moudleTrees": this.dataTree				  			
			}
			console.log(parm)		
			this.$axios.post('/v1/role', parm)
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
			       		_this.$router.push('/tscg_system/role')
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
		getRoleTree(){
			let _this = this			
			
			this.$axios.get('/v1/moudle/findMoudle')
				
			  .then((res) => {	  	
			  	let nowData = res.data
			  	
			  	if(nowData.code == 1){								  	
					_this.dataTree = nowData.data
					_this.loading = false
			  	}else{
			  		console.log(nowData.msg)
			  		_this.$message({
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
		}
	},
	mounted (){
		this.getRoleTree()
		
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
		margin-bottom: 20px;
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