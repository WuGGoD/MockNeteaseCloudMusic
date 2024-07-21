<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import {
    loginCellPhone,
    loginCaptCha,
    emailLogin,
    qrKey,
    qrCreate,
    qrCheck,
} from '../../services/index.js';
import { useUserStore } from '../../store/userInfo.js';

let timer;

const userStore = useUserStore();

const loginMethod = ref(0);
const methods = ref(['手机号登陆', '邮箱登录', '二维码登录']);

const phone = ref('');
const captCha = ref('');
//手机号登陆
async function login() {
    if (loginMethod.value === 0) {
        //表单校验
        const res = await loginCaptCha(phone.value, captCha.value);
        console.log(res);
		uni.setStorageSync('curCookie', res.cookie);
		userStore.getAccount(res.cookie);
		// userStore.account = res.account;
		uni.showToast({
			title: '登录成功,即将返回个人页面',
			icon: 'success',
		});
		const timeOut = setTimeout(() => {
				uni.switchTab({
					url: '/pages/mine/mine',
				});
			}, 1000);
		}
}
async function sendCode() {
    const code = await loginCellPhone(phone.value);
    console.log(code);
}

//邮箱登录
const email = ref('');
const password = ref('');
async function emailMethod() {
    const res = await emailLogin(email.value, password.value);
    // console.log(res.cookie);
    uni.setStorageSync('curCookie', res.cookie);
    userStore.getAccount(res.cookie);
    // userStore.account = res.account;
    uni.showToast({
        title: '登录成功,即将返回个人页面',
        icon: 'success',
    });
    const timeOut = setTimeout(() => {
        uni.switchTab({
            url: '/pages/mine/mine',
        });
    }, 1000);
}

//二维码登录
const qrUrl = ref('');
async function qrLogin() {
    clearInterval(timer);
    const qr = await qrKey();
    console.log(qr.data);
    const key = qr.data.unikey;
    const create = await qrCreate(key);
    qrUrl.value = create.data.qrimg;
    timer = setInterval(async () => {
        const check = await qrCheck(key);
        console.log(check);
        if (check.code === 803) {
            userStore.getAccount();
            clearInterval(timer);
            uni.showToast({
                title: '登录成功,即将返回个人页面',
                icon: 'success',
            });
            const timeOut = setTimeout(() => {
                uni.switchTab({
                    url: '/pages/mine/mine',
                });
            }, 1000);
        }
    }, 2000);
}

watch(
    () => loginMethod.value,
    () => {
        if (loginMethod.value === 2) {
            qrLogin();
        } else {
            clearInterval(timer);
        }
    },
    {
        immediate: true,
    }
);
</script>

<template>
    <view class="mine"> 我的音乐 </view>
    <view class="login">
        <view class="loginMethod">
            <view :class="['phone', { show: loginMethod === 0 }]">
                <view class="inps">
                    <input
                        type="tel"
                        class="telInp"
                        v-model="phone"
                        placeholder="请输入手机号" />
                    <view>
                        <input
                            type="text"
                            class="capchatInp"
                            v-model="captCha"
                            placeholder="请输入验证码" />
                        <button class="capchatBtn" @click="sendCode">
                            发送验证码
                        </button>
                    </view>
                </view>
                <button class="login" @click="login">登录</button>
            </view>
            <view :class="['email', { show: loginMethod === 1 }]">
                <view class="inps">
                    <input
                        type="email"
                        class="eamilInp"
                        placeholder="请输入邮箱"
                        v-model="email" />
                    <input
                        type="password"
                        class="passwordInp"
                        placeholder="请输入密码"
                        v-model="password" />
                </view>
                <button class="login" @click="emailMethod">登录</button>
            </view>
            <view :class="['qrCode', { show: loginMethod === 2 }]">
                <img :src="qrUrl" alt="" />
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
        width: 400rpx;
        height: 400rpx;
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
