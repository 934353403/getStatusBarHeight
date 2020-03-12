<template>
    <div class="getVerificationCode">
        <!-- 获取验证码组件 -->
        <button v-if="time>0">{{time}}s 后重新获取</button>
        <button v-else @click="getCode">获取验证码</button>
    </div>
</template>
<script>
export default {
    props: {
        //手机号
        phone_number: {
            type: [Number, String],
            required: true
        },
        //请求验证码的类型 1：找回密码 2：修改支付密码 3:注册
        sendstatus: {
            type: [Number, String],
            required: true
        }
    },
    data() {
        return {
            time: 0, //倒计时

        }
    },
    mounted() {},
    methods: {
        //获取验证码
        getCode() {
            if (!/^1[0123456789]\d{9}$/.test(this.phone_number)) {
                this.$toast('手机号码输入有误');
            } else {
                this.axios.post('/api/login/send_code', {
                        phone: this.phone_number,
                        type: this.sendstatus,
                    })
                    .then((res) => {
                        if (res.status == 1) {
                            this.$toast('验证码发送成功')
                            this.time = 60; //显示倒计时
                            var auth_timetimer = setInterval(() => {
                                this.time--;
                                if (this.time <= 0) {
                                    clearInterval(auth_timetimer);
                                    this.time = 0;
                                }
                            }, 1000);
                        }
                    })
            }
        },

    },
}

</script>
<style scoped lang="less">
.getVerificationCode {
    button {
        display: block;
        border: none;
        font-size: 28px;
        font-weight: 400;
        color: #c517ae;
        background: transparent;
    }
}

</style>
