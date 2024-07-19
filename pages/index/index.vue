<script setup>

import section from '../section.vue'
import search from './search/search.vue'
import bannerVue from './banner/banner.vue'
</script>


<template>
	<view class="content">
		<!-- 推荐歌单组件 -->
		<section />
		<!-- 搜索组件 -->
		<search />
		<!-- 轮播图组件 -->
		<bannerVue />
	</view>
</template>



<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>