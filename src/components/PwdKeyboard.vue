<!--
 * @Author: sly
 * @LastEditTime: 2019年11月26日10:01:32
 * @Description: 密码键盘输入框
 -->
<template>
    <!-- 密码键盘组件封装 -->
    <div class="pwd_keyboard">
        <van-popup class="pwd_show" v-model="$parent.showPayPwd" position="bottom" :style="{ height: '480px' }">
            <van-nav-bar title="请输入交易密码"/>
            <van-password-input :value="value" @focus="showKeyboard = true" info="忘记密码？找回并完成支付"/>
            <van-number-keyboard :show="showKeyboard" @blur="showKeyboard = true" :maxlength="6" @input="onInput" @delete="onDelete" />
        </van-popup>
    </div>
</template>

<script>
    export default {
        props: {
            onInput: {
                type: Function,
                required: true
            },
            onDelete: {
                type: Function,
                required: true
            },
            value: '',
        },
        data() {
            return {
                showKeyboard: true,//显示密码框/键盘
            }
        },
        mounted() {

        },
        methods: {
        },
    }
</script>

<style scoped lang="less">
    .pwd_keyboard {
        .pwd_show {
            .van-icon-arrow-left {
                color: #000;
                font-size: 16px;
            }

            .van-password-input {
                width: 95%;
                margin: 20px auto;
            }

            .van-password-input__info {
                text-align: center;
                font-size: 15px;
                font-weight: 400;
                color: #5EB4FC;
            }
        }
    }
</style>
