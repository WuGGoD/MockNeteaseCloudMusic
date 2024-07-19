<script setup>
import { ref } from 'vue';
const popup = ref(null);
const open = () => {
    popup.value.open('left');
};
const goSearchPage = () => {
    //在起始页面跳转到test.vue页面并传递参数
    uni.navigateTo({
        url: '/pages/searchPage/searchPage',
    });
};
</script>

<template>
    <!-- 头部搜索 -->
    <view class="search">
        <uni-icons type="bars" size="30" @click="open"></uni-icons>
        <uni-popup
            class="popup"
            ref="popup"
            type="left"
            border-radius="10px 10px 0 0">
            <view class="popup">
                <button type="primary" size="mini">去登录</button>
            </view>
        </uni-popup>
        <view class="searchBar" @click="goSearchPage">
            <uni-icons
                type="search"
                size="20"
                color="#b3b3b3"
                class="searchIcon"></uni-icons>
            搜索
        </view>
    </view>
</template>

<style lang="scss" scoped>
.search {
    width: 100vw;
    height: 132rpx;
    padding: 30rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}

.searchBar {
    flex: 1;
    height: 72rpx;
    font-size: 28rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10rpx;
    color: #b3b3b3;
    background-color: #eeeeee;
    border-radius: 10rpx;

    .searchIcon {
        color: #b3b3b3;
        margin-right: 20rpx;
    }
}

.popup {
    width: 600rpx;
    height: 100vh;
    padding: 20rpx;
    background-color: #ffffff !important;
}
</style>
