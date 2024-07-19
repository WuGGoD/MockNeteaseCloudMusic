<script setup>
	import { nextTick, ref } from 'vue'
	import { getBannerApi, getBallIconApi } from '../../../services'
	
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
	}

const getBanner = async () => {
	const res = await getBannerApi()
	banner.value = res.banners
}

const getBallIcon = async () => {
	const res = await getBallIconApi()
	
	localStorage.setItem('navlist', JSON.stringify(res.data.blocks[1].creatives[0].resources))
	// console.log(navList.value)
}
navList.value = JSON.parse(localStorage.getItem('navlist'))
getBanner()
getBallIcon()

</script>

<template>
	<view class="box">
		<view class="banner">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					:duration="duration">
					<swiper-item v-for="item in banner" :key="item.encodeId">
						<view class="swiper-item uni-bg-red">
							<image :src="item.imageUrl" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view class="nav">
			<view class="nav-item" v-for="item in navList" :key="item.uiElement.mainTitle.title" @click="toRank(item.uiElement.mainTitle.title)">
				<view class="img">
					<image :src="item.uiElement.image.imageUrl" mode="widthFix"></image>
				</view>
				<text>{{item.uiElement.mainTitle.title}}</text>
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