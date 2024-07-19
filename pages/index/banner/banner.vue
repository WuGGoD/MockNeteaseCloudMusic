<script setup>
	import { nextTick, ref } from 'vue'
	import { getBannerApi } from '../../../services'
	
	const banner = ref([])
	const indicatorDots = ref(true)
	const autoplay = ref(true)
	const interval = ref(5000)
	const duration = ref(500)
	const navList = ref([
		{title: '每日推荐', url: 'https://p1.music.126.net/4DpSgAVpJny4Ewf-Xw_WQQ==/109951163986641971.jpg'},
		{title: '私人FM', url: 'http://p1.music.126.net/Shi7cRT1bDhwpVDM7AOFXg==/109951165265330616.jpg'},
		{title: '歌单', url: 'http://p1.music.126.net/uG5p6CnwAHrLqOkaSeRlnA==/109951163986649164.jpg'},
		{title: '排行榜', url: 'http://p1.music.126.net/SDFC6A3X2wzUCavYyeGIOg==/109951163986649670.jpg'},
		{title: '有声书', url: 'http://p1.music.126.net/Kb4oK0m_ocs3FR3lo-r9yg==/109951167319110429.jpg'},
	])
	
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
	
	const to = (val) => {
		if (val === '排行榜') {
			uni.navigateTo({
				url:'/pages/index/banner/rank/rank'
			})
		}
	}

const getBanner = async () => {
	const res = await getBannerApi()
	// console.log(res.data.banners)
	banner.value = res.data.banners
	console.log(banner.value)
}

getBanner()

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
			<view class="nav-item" v-for="item in navList" :key="item.url" @click="to(item.title)">
				<view class="img">
					<image :src="item.url" mode="widthFix"></image>
				</view>
				<text>{{item.title}}</text>
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
	width: 100%;
	height: 150rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20rpx;
	margin-top: 20rpx;
}
.nav-item{
	width: 20%;
	height: 150rpx;
	padding: 10rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	font-size: 12px;
	.img{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background: #c84341;
	}
}

</style>