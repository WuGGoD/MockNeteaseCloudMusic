<script setup>
	import {
		nextTick,
		ref
	} from 'vue'

	import {
		getSearchHotApi
	} from '../../services/index.js'

	import {
		getSearchResultApi
	} from '../../services/index.js'

	import {
		getSearchResultDeatilApi
	} from '../../services/index.js'

	import {
		useUserStore
	} from '../../store/seachDetail.js'
	import searchList from './searchList/searchList.vue'
	import searchDetail from './searchList/searchDetail.vue'


	const userstore = useUserStore()
	const HotDetailList = ref([])
	const showSearch = ref(false)
	const show = ref(0)
	const searchResult = ref([])

	const toggleSearch = () => {
		showSearch.value = !showSearch.value
		if (!showSearch.value) {
			document.querySelector('.uni-input').value = ''
			userstore.keyword = ''
			show.value = 0
		}
	}

	const keydowns = () => {
		const searchWord = userstore.keyword // 获取当前输入的值
		toSearchHistory(searchWord) // 调用 toSearchHistory 函数
	}

	const toSearchHistory = (searchWord) => {
		if (searchWord && !userstore.historyList.includes(searchWord)) {
			userstore.historyList.push(searchWord)
			localStorage.setItem('searchHistory', JSON.stringify(userstore.historyList))
			userstore.keyword = searchWord
			showSearch.value = true
			enterDetail(searchWord)
		} else {
			userstore.keyword = searchWord
			showSearch.value = true
			enterDetail(searchWord)
		}
	}

	const clearHistory = () => {
		userstore.historyList = []; // 重置 historyList
		localStorage.setItem('searchHistory', JSON.stringify([])); // 更新 localStorage
	}

	const clearKeyword = () => {
		userstore.keyword = ''
	}

	const enterDetail = (item) => {
		if (userstore.keyword) {
			// 然后显示详情组件
			show.value = 2
			userstore.getResuletDetailFn()
		}
	}

	const getHotDetailList = async () => {
		const res = await getSearchHotApi()
		HotDetailList.value = res.data
	}
	getHotDetailList()

	const getResuletFn = () => {
		if (userstore.keyword) {
			const getResultList = async () => {
				const res = await getSearchResultApi(userstore.keyword)
				nextTick(() => {
					searchResult.value = res.result.allMatch
				})
			}
			getResultList()
			show.value = 1
		}
	}
	getResuletFn()
</script>

<template>
	<view class="searchPage">
		<!-- 搜索框 -->
		<view class="search-area">
			<view class="searchBar" @click="toggleSearch" v-show="!showSearch">
				<uni-icons type="search" size="20" color="#b3b3b3" class="searchIcon1"></uni-icons>
				请输入要搜索的歌曲/歌手
			</view>

			<view class="searchReal" v-show="showSearch">
				<view class="searchReal-bar">
					<uni-icons type="search" size="20" color="#b3b3b3" class="searchIcon2"></uni-icons>
					<input class="uni-input" focus confirm-type="search" placeholder="请输入要搜索的歌曲/歌手"
						v-model="userstore.keyword" @input="getResuletFn"
						@keydown.enter="keydowns(userstore.keyword)" />
					<uni-icons type="clear" size="20" color="#b3b3b3" class="clearIcon"
						@click="clearKeyword"></uni-icons>
				</view>
				<view class="cancel" @click="toggleSearch">
					取消
				</view>
			</view>
		</view>

		<!-- 初始化搜索内容 -->
		<view class="search-init" v-show="show === 0">
			<!-- 搜索历史 -->
			<view class="search-history">
				<view class="title">
					<view class="left">
						<view class="line"></view>
						搜索历史
					</view>
					<uni-icons type="trash" size="20" @click="clearHistory"
						v-show="userstore.historyList.length > 0"></uni-icons>
				</view>
				<view class="search-history-list">
					<text class="history-list" v-for="(item, index) in userstore.historyList" :key="item"
						@click="toSearchHistory(item)">{{ item }}</text>
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
					<view class="hot-list" v-for="(item, index) in HotDetailList" :key="item"
						@click="toSearchHistory(item.searchWord)">
						<text :class="index <= 2 ? 'red' : '' ">{{ index + 1 }}</text>
						<text class="list">
							{{ item.searchWord }}
						</text>
					</view>
				</view>
			</view>
		</view>

		<searchList v-show="show === 1" :result="searchResult" @callParentFn="toSearchHistory" />

		<searchDetail v-show="show === 2" />
	</view>
</template>

<style lang="scss" scoped>
	.search-area {
		position: sticky;
		top: 90rpx;
		/* 当页面滚动到这个距离时，search-area 会固定在顶部 */
		z-index: 10;
		/* 确保它在页面其他内容的上方 */
		width: 100%;
		/* 确保宽度是100%，而不是使用vw单位，这可能会影响sticky定位 */
		height: 72px;
		/* 确保使用px单位，以避免由于不同屏幕分辨率导致的定位问题 */
		padding: 20px;
		background-color: #ffffff;
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

		.searchIcon1 {
			color: #b3b3b3;
			margin-right: 10rpx;
		}
	}

	.searchReal {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 28rpx;

		.searchReal-bar {
			height: 72rpx;
			font-size: 28rpx;
			background-color: #f8f8f8;
			color: #b3b3b3;
			border-radius: 10rpx;
			flex: 1;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-right: 20rpx;
			padding-left: 20rpx;
		}

		.searchIcon2 {
			color: #b3b3b3;
		}

		.uni-input {
			flex: 1;
			padding-left: 10rpx !important;
			font-size: 28rpx;
		}

		.clearIcon {
			padding-right: 20rpx;
		}
	}

	.search-history,
	.search-hot {
		width: 100vw;
		height: auto;
		padding: 20rpx;
		padding-bottom: 0;

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
		margin-top: 20rpx;

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