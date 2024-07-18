<script setup>
import { useUserStore } from '../../store/userInfo.js';

const useStore = useUserStore();
</script>

<template>
    <view class="mine"> 我的音乐 </view>
    <view class="text" v-if="!useStore.account">
        <navigator url="/pages/login/login">去登陆</navigator>
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
.text {
    @extend .mine;
    font-size: 36rpx;
    font-weight: normal;
    background-color: #f8f8f8;
    color: #000000;
    border-bottom: 1rpx solid #888888;
}
</style>
