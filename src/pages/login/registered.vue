<template>
    <div class="registered">
        <div class="page-header van-nav-bar--box">
        	<div class="status-bar"></div>
            <van-nav-bar  @click-left="$router.go(-1)" >
            	<img class="nav-bar-back " slot="left" src="@img/icon/0.png" />
            	<div class="nav-bar__title toe" slot="title">注册</div>
            </van-nav-bar>
        </div>
        <div class="page-body">
            <div class="page-body-inner ">
                注册
            </div>
        </div>
    </div>
</template>

<script>
	export default {
	    components: {
	    },
		data(){
			return{
			}
		},
		mounted(){
		},
		methods:{
		},
	}
</script>

<style scoped lang="less">
    .registered{
        .page-body{
            padding-top: 0;
            border-top: 0;
        }
    }
</style>
