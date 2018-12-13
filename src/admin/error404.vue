<template>
	<div>
		<div class="error404">
			<h1 class="yellow-font">404</h1>
			<span>Page not found, </span>
			<a href="javascript:history.go(-1)">
				<span class="green-font">Click back!</span>
			</a>
		</div>
		
	</div>
</template>

<script>
</script>

<style scope lang="less">
.error404{		
	position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -290px;
    margin-top: -300px;
    .yellow-font{
    	margin: 15% 100px 0 100px; 
    	font-size: 100px;
    }
}		
</style>