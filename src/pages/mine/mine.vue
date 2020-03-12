<template>
    <div class="mine">
        <div class="page-header van-nav-bar--box">
       	<div class="status-bar"></div>
           <van-nav-bar  @click-left="$router.go(-1)" >
           	<img class="nav-bar-back " slot="left" src="@img/icon/0.png" />
           	<div class="nav-bar__title toe" slot="title">个人中心</div>
           </van-nav-bar>
        </div>
        <div class="page-body">
            <div class="page-body-inner ">
                个人中心
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Mine',
    components: {

    },
    data() {
        return {
        }
    },
    activated() {
    },
    mounted() {
    },
    methods: {

    },
}

</script>
<style scoped lang="less">
.mine {

    @{deep}.page-body {
        padding-top: 0;
        border-top: 0;
        
        .page-body-inner{
            padding-left: 25px;
            padding-right: 25px;
        }
    }
}

</style>
