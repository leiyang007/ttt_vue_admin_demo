<template>
	<div>
		<h1 class="green-font">
			Hello <span class="blue-font">{{ user }}</span>,
			Welcome to tSCG system!
		</h1>
	</div>
</template>

<script>
  export default {
    data() {
      return {
      	user: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").userName : 'null'
      }
    },
    methods: {
      
    },
    created (){
    	
    }
  }
</script>

<style scope>
h1{
	margin: 100px 0;
}	
</style>