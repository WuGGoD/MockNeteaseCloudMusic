<script setup>
	import {
		useUserStore
	} from '../../../store/seachDetail.js'
	const detail = useUserStore()
	const playMusic = (item) => {
		console.log(item.id);
	}
</script>

<template>
	<view class="searchDetail">
		<view class="detail" v-for="item in detail.searchResultDetail" :key="item.id" @click="playMusic(item)">
			<view class="detail-item">
				<view class="song">{{ item.name }}</view>
				<view class="album">专辑: {{ item.album.name }}</view>
				<view class="name">{{ item.artists[0].name }} {{ item.artists[1]?.name }}</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.detail-item {
		width: 100%;
		height: auto;
		font-size: 30rpx;
		line-height: 40rpx;
		padding-left: 10rpx;
		border-bottom: 2rpx dashed #dddddd;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 20rpx;
	}

	.detail:first-child {
		margin-top: 40rpx;
	}

	.detail:last-child {
		border-bottom: none;
	}
</style>