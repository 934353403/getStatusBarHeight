<template>
	<div class="no-data-c">
		<template v-if="type==1">
			<img class="img" src="@img/icon/no-data1.png" />
			<div class="tip-text flex aic jcc">竟然没有交易记录</div>
		</template>
		<template v-else-if="type==2">
			<img class="img" src="@img/icon/no-data2.png" />
			<div class="tip-text flex aic jcc">哎呀,我们没有捕捉到数据,歇会再来</div>
		</template>
		<template v-else-if="type==3">
			<img class="img" src="@img/icon/no-data3.png" />
			<div class="tip-text flex aic jcc">老板,暂时没有要查阅的消息</div>
		</template>
		<template v-else-if="type==4">
			<img class="img" src="@img/icon/no-data4.png" />
			<div class="tip-text flex aic jcc">哎呀,你暂时还没有等级呢</div>
		</template>
        <template v-else-if="type==5">
        	<img class="img" src="@img/icon/no-data1.png" />
        	<div class="tip-text flex aic jcc">暂无数据</div>
        </template>
	</div>
</template>
<script>
export default {
	name: 'NoData',
	props: {
		type: {
			type: String,
			required: true,
			default: 1
		},
	},
	data() {
		return {}
	},
	created() {},
	mounted() {},
	computed: {},
	watch: {

	}
}

</script>
<style lang="less" scoped>
.no-data-c {
	text-align: center;
	padding-top: 100px;

	.img {
		height: 380px;
	}

	.tip-text {
		font-size: 28px;
		color: #fff;
		height: 144px;

	}
}

</style>
