<script setup>
import search from './search/search.vue'
import bannerVue from './banner/banner.vue'
import radar from '../section/radar.vue';

</script>

<template>
    <view class="content">
        <!-- 搜索组件 -->
        <search />
        <!-- 轮播图组件 -->
        <bannerVue />
        <!-- 推荐歌单组件 -->
        <radar />
    </view>
</template>

<style>
.content {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>