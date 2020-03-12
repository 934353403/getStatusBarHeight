<template>
	<div class="home">
		<div class="page-header van-nav-bar--box">
			<div class="status-bar"></div>
		    <van-nav-bar  @click-left="$router.go(-1)" >
		    	<img class="nav-bar-back " slot="left" src="@img/icon/0.png" />
		    	<div class="nav-bar__title toe" slot="title">首页</div>
                <div slot="right">右侧</div>
		    </van-nav-bar>
		</div>
		<div class="page-body">
			<div class="page-body-inner ">
				123
			</div>
		</div>
	</div>
	</div>
</template>
<script>
export default {
	name: 'Home',
	components: {},
	data() {
		return {
		}
	},
	created() {},
	mounted() {},
	activated() {},
	methods: {},
}

</script>
<style lang="less" scoped>
.home {

	@{deep}.page-body {
		.page-body-inner {

		}
	}
}

</style>
