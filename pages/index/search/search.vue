<script setup>
	import {
		ref,
		computed
	} from 'vue'
	import {
		useUserStore
	} from '../../../store/userInfo'
	import {
		getUserDetail,
		logout
	} from '../../../services'
	const user = useUserStore()
	const popup = ref(null)
	const open = () => {
		popup.value.open('left')
	}

	const goSearchPage = () => {
		uni.navigateTo({
			url: '/pages/searchPage/searchPage',
		})
	}

	// const userInfo = ref(null)
	const goLogin = async () => {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	goLogin()
	const goUserInfo = () => {
		uni.switchTab({
			url: '/pages/mine/mine'
		})
	}

	// 判断是否显示登录按钮或用户信息
	const showLoginBtn = computed(() => !user.account)
	
	const userLogout = async ()=>{
		const res = await logout()
		uni.showToast({
			title:"退出成功"
		})
		const timeout = setTimeout(()=>{
			uni.hideToast()
			clearTimeout(timeout)
		},1000)
	}
</script>

<template>
	<!-- 头部搜索 -->
	<view class="search">
		<uni-icons type="bars" size="30" @click="open"></uni-icons>
		<uni-popup class="popup" ref="popup" type="left" border-radius="10px 10px 0 0">
			<!-- 去登录 -->
			<view class="goLogin" v-if="showLoginBtn">
				<button type="primary" size="mini" class="loginBtn" @click="goLogin">去登录</button>
			</view>

			<!-- 登录后的用户信息 -->
			<view class="userInfo" v-else>
				<!-- 用户信息 -->
				<view class="user">
					<view class="profilePhoto" @click="goUserInfo">
						<image :src="user.verify?.avatarUrl" mode="widthFix"></image>
					</view>
					<view class="name">{{ user.verify?.nickName }}</view>
					<button type="primary" size="mini" class="exitLoginBtn">退出登录</button>
				</view>
			</view>
		</uni-popup>
		<view class="searchBar" @click="goSearchPage">
			<uni-icons type="search" size="20" color="#b3b3b3" class="searchIcon"></uni-icons>
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

	.loginBtn,
	.exitLoginBtn {
		background-color: #c84341 !important;
	}

	.goLogin {
		width: 600rpx;
		height: 100vh;
		padding: 20rpx;
		background-color: #ffffff !important;
	}

	.userInfo {
		width: 600rpx;
		height: 100vh;
		background-color: #ffffff !important;
	}

	.user {
		width: 100%;
		height: 180rpx;
		padding: 20rpx;
		background-color: #eeeeee;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.profilePhoto {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		background-color: #dddddd;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.name {
		font-size: 32rpx;
		line-height: 150rpx;
		margin-left: 40rpx;
		margin-right: 100rpx;
	}
</style>