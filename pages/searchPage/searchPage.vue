<script setup>
	import {
		ref
	} from 'vue'
	import {
		getSearchHotApi
	} from '../../services/index.js'

	const HotDetailList = ref([])
	const HistorylList = ref([])

	const toSearchHistory = (item) => {
		if (!HistorylList.value.includes(item.searchWord)) {
			HistorylList.value.push(item.searchWord)
		}
	}

	const clearHistory = () => {
		HistorylList.value = []
	}

	const getHotDetailList = async () => {
		const res = await getSearchHotApi()
		HotDetailList.value = res.data.data
	}
	getHotDetailList()
</script>

<template>
	<view class="searchPage">
		<!-- 搜索框 -->
		<view class="search-area">
			<view class="searchBar" @click="goSearchPage">
				<uni-icons type="search" size="20" color="#b3b3b3" class="searchIcon"></uni-icons>
				请输入要搜索的歌曲/歌手
			</view>

<!-- 			<view class="searchReal">
				<uni-icons type="search" size="20" color="#b3b3b3" class="searchIcon"></uni-icons>
				<input class="uni-input" confirm-type="search" placeholder="请输入要搜索的歌曲/歌手" />
			</view> -->
		</view>
		<!-- 搜索历史 -->
		<view class="search-history">
			<view class="title">
				<view class="left">
					<view class="line"></view>
					搜索历史
				</view>
				<uni-icons type="trash" size="20" @click="clearHistory" v-show="HistorylList.length > 0"></uni-icons>
			</view>
			<view class="search-history-list">
				<text class="history-list" v-for="(item, index) in HistorylList">{{ item }}</text>
			</view>
		</view>
		<!-- 热门搜索 -->
		<view class="search-hot">
			<view class="title">
				<view class="left">
					<view class="line"></view>
					热门搜索
				</view>
			</view>
			<view class="search-hot-list">
				<view class="hot-list" v-for="(item, index) in HotDetailList" @click="toSearchHistory(item)">
					<text :class="index <= 2 ? 'red' : '' ">{{ index + 1 }}</text>
					<text class="list">
						{{ item.searchWord }}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.search-area {
		width: 100vw;
		height: 72rpx;
		padding: 20rpx;
	}

	.searchBar {
		height: 72rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #b3b3b3;
		background-color: #f8f8f8;
		border-radius: 10rpx;

		.searchIcon {
			color: #b3b3b3;
			margin-right: 20rpx;
		}
	}

	.searchReal {
		height: 72rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #b3b3b3;
		background-color: #f8f8f8;
		border-radius: 10rpx;
		padding-left: 10rpx;

		.searchIcon {
			color: #b3b3b3;
			margin-right: 20rpx;
		}

		.uni-input {
			flex: 1;
		}
	}

	.search-history,
	.search-hot {
		width: 100vw;
		height: auto;
		padding: 20rpx;
		margin-top: 20rpx;
		margin-bottom: 40rpx;

		.title {
			width: auto;
			height: auto;
			font-weight: normal;
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.line {
				width: 8rpx;
				height: 24rpx;
				border-radius: 5rpx;
				background-color: #c84341;
				margin-right: 12rpx;
			}

			.left {
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
		}
	}

	.search-history-list {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 40rpx;

		.history-list {
			color: #333;
			padding: 5rpx 10rpx;
			background-color: #eeeeee;
			font-size: 26rpx;
			border-radius: 30rpx;
			margin-right: 15rpx;
			margin-bottom: 15rpx;
		}
	}

	.search-hot-list {
		display: flex;
		flex-direction: column;
		justify-content: center;

		.hot-list {
			font-weight: bold;
		}

		.list {
			font-size: 30rpx;
			line-height: 60rpx;
			margin-left: 10rpx;
			font-weight: normal;
		}
	}

	.red {
		color: #c84341;
	}
</style>