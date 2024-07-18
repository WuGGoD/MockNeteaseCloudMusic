<script setup>
import { ref } from 'vue';
import { loginCellPhone, loginCaptCha } from '../../services/index.js';
import { useUserStore } from '../../store/userInfo.js';

const useStore = useUserStore();

const loginMethod = ref(0);

const phone = ref(0);
const captCha = ref(0);

const methods = ref(['手机号登陆', '邮箱登录', '二维码登录']);
async function login() {
    if (loginMethod.value === 0) {
        const code = await loginCellPhone({ phone: phone.value });
        console.log(code);
        const res = await loginCaptCha({ captCha: captCha.value });
        console.log(res);
    }
}
</script>

<template>
    <view class="mine"> 我的音乐 </view>
    <view class="login">
        {{ phone }}
        <view class="loginMethod">
            <view :class="['phone', { show: loginMethod === 0 }]">
                <view class="inps">
                    <input
                        type="tel"
                        class="telInp"
                        v-model.number="phone"
                        placeholder="请输入手机号" />
                    <view>
                        <input
                            type="text"
                            class="capchatInp"
                            v-model.number="captCha"
                            placeholder="请输入验证码" />
                        <button class="capchatBtn">发送验证码</button>
                    </view>
                </view>
                <button class="login" @click="login">登录</button>
            </view>
            <view :class="['email', { show: loginMethod === 1 }]">
                <view class="inps">
                    <input
                        type="email"
                        class="eamilInp"
                        placeholder="请输入邮箱" />
                    <input
                        type="password"
                        class="passwordInp"
                        placeholder="请输入密码" />
                </view>
                <button class="login" @click="login">登录</button>
            </view>
            <view :class="['qrCode', { show: loginMethod === 2 }]">
                <img src="" alt="" />
            </view>
        </view>
        <view class="options">
            <view
                v-for="(item, index) in methods"
                :key="item"
                @click="loginMethod = index">
                {{ item }}
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.mine {
    width: 100%;
    height: 100rpx;
    color: #ffffff;
    font-size: 50rpx;
    font-weight: bold;
    background-color: #fc3d49;
    text-align: center;
    line-height: 100rpx;
}
.phone,
.email,
.qrCode {
    display: none;
}
.capchatInp {
    width: 350rpx;
    height: 80rpx;
}
.inps {
    padding: 60rpx 30rpx;

    > input,
    view {
        height: 80rpx;
        width: calc(100% - 10rpx);
        margin-bottom: 30rpx;
        display: block;
    }

    input {
        border-radius: 20rpx;
        border: 1px solid #888888;
    }
    view {
        display: flex;
        align-items: center;
    }
    button {
        flex: 1;
        margin: 0 30rpx;
        display: block;
        height: 80rpx;
        border-radius: 20rpx;
        background-color: #fc3d49;
    }
}

.show {
    display: block;
}

.qrCode {
    height: 420rpx;
    position: relative;

    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300rpx;
        height: 300rpx;
    }
}

button {
    margin: 0 30rpx;
    display: block;
    width: calc(100% - 60rpx);
    height: 80rpx;
    border-radius: 20rpx;
    background-color: #fc3d49;
}

.options {
    margin-top: 60rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 24rpx;
    padding: 0 100rpx;
}
</style>
