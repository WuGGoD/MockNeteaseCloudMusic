<script setup>
	import { nextTick, ref } from 'vue'
	import { getBannerApi, getIconApi } from '../../../services'
	import { useUserStore } from '../../../store/userInfo'
	
	const userStore = useUserStore()
	const banner = ref([])
	const indicatorDots = ref(true)
	const autoplay = ref(true)
	const interval = ref(5000)
	const duration = ref(500)
	const navList = ref([])
	
	const changeIndicatorDots = (e) => {
			indicatorDots.value = !indicatorDots.value
	}
	const changeAutoplay = (e) => {
			autoplay.value = !autoplay.value
	}
	const intervalChange = (e) => {
			interval.value = e.target.value
	}
	const durationChange = (e) => {
			duration.value = e.target.value
	}
	
	const toRank = (val) => {
		if (val === '排行榜') {
			uni.navigateTo({
				url:'/pages/index/banner/rank/rank'
			})
		}
		if (val === '每日推荐') {
			if (userStore.account) {
				
				uni.navigateTo({
					url:'/pages/index/banner/recommend/recommend'
				})
			} else {
				uni.showToast({
					title: '请先登录',
					duration: 2000,
					icon: 'fail'
				})
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
	}

// const getAllDataIcon = async () => {
// 	const res = await getAllDataApi()
// 	localStorage.setItem('data', JSON.stringify(res.data.blocks))
// 	if (!localStorage.getItem('data')) {
// 		navList.value = res.data.blocks[1].creatives[0].resources
// 		banner.value = res.data.blocks[0].extInfo.banners
// 	} else {
// 		navList.value = JSON.parse(localStorage.getItem('data'))[1].creatives[0].resources
// 		banner.value = JSON.parse(localStorage.getItem('data'))[0].extInfo.banners
// 	}
// 	// console.log(res.data.blocks)
// }

const getBanner = async () => {
	const res = await getBannerApi()
	const res1 = await getIconApi()
	localStorage.setItem('banner', JSON.stringify(res.banners))
	localStorage.setItem('icon', JSON.stringify(res1.data))
	console.log(res.banners, res1.data)
	if (!localStorage.getItem('banner') || !localStorage.getItem('icon')) {
		navList.value = res1.data
		banner.value = res.banners
	} else {
		navList.value = JSON.parse(localStorage.getItem('icon'))
		banner.value = JSON.parse(localStorage.getItem('banner'))
	}
	// console.log(res.data.blocks)
}
// console.log(JSON.parse(localStorage.getItem('data'))[0].extInfo.banners)


getBanner()

</script>

<template>
	<view class="box">
		<view class="banner">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					:duration="duration">
					<swiper-item v-for="item in banner" :key="item.targetId">
						<view class="swiper-item uni-bg-red">
							<image :src="item.imageUrl" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view class="nav">
			<view class="nav-item" v-for="item in navList" :key="item.name" @click="toRank(item.name)">
				<view class="img">
					<image :src="item.iconUrl" mode="widthFix"></image>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>



<style lang="scss" scoped>
.box{
	width: 100%;
	.banner {
		width: 100%;
		padding: 20rpx;
	}
}
.swiper {
	border-radius: 20rpx;
	overflow: hidden;
}
.uni-margin-wrap, .swiper, .swiper-item {
	width: 100%;
	height: 264rpx;
}
.uni-swiper-dots-horizontal{
	bottom: 60rpx!important;
}

image{
	width: 100%;
}

.nav{
	height: 150rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20rpx;
	white-space: nowrap;
	overflow-x: auto;
	scrollbar-width: none;
}
.nav-item{
	width: 150rpx;
	height: 150rpx;
	padding: 10rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	font-size: 12px;
	flex-shrink: 0;
	.img{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background: #c84341;
	}
}

</style>