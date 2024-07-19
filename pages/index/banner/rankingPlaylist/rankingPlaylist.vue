<script setup>
	import {
		nextTick,
		ref
	} from 'vue'
	import {
		getRankDetailApi
	} from '../../../../services'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import commentVue from './comment/comment.vue'
	import songsLIstVue from './songsLIst/songsLIst.vue'

	const id = ref('')
	const playList = ref(null)
	const type = ref('')
	const show = ref(false)

	onLoad((option) => {
		id.value = option.id
		getRankDetail(id.value)
	})


	const getRankDetail = async (id) => {
		const res = await getRankDetailApi(id)
		nextTick(() => {
			playList.value = res.playlist
		})
	}
</script>

<template>
	<view class="box" v-if="playList">
		<view class="header">
			<view class="bg">
				<image :src="playList.coverImgUrl" mode="widthFix"></image>
			</view>
			<view class="content">
				<view class="content-top">
					<view class="img">
						<image :src="playList.coverImgUrl" mode="widthFix"></image>
					</view>
					<view class="top-title">
						<text class="top-tit">{{playList.name}}</text>
						<view class="tit-img">
							<image src="http://p1.music.126.net/kMuXXbwHbduHpLYDmHXrlA==/109951168152833223.jpg" mode=""></image>
							<text>网易云音乐</text>
						</view>
					</view>
				</view>
				<view class="content-middle">
					{{playList.description}}
				</view>
				<view class="content-bottom">
					<view class="bottom-text"><uni-icons type="redo-filled" size="22"
							color="white"></uni-icons>{{playList.shareCount}}</view>
					<view class="bottom-text" @click="show = true"><uni-icons type="chat-filled" size="22"
							color="white"></uni-icons>{{playList.commentCount}}</view>
					<view class="bottom-text"><uni-icons type="folder-add-filled" size="22"
							color="white"></uni-icons>{{playList.subscribedCount}}</view>
				</view>
			</view>
		</view>

		<songsLIstVue :list="playList.tracks"></songsLIstVue>
		<commentVue v-if="show" :id="playList.id" @hide="show = false"></commentVue>
	</view>
</template>

<style lang="scss" scoped>
	.box {
		width: 100%;
		height: 100vh;
		overflow: auto;
	}

	.header {
		height: 460rpx;
		overflow: hidden;
		position: relative;
	}

	.bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-size: cover;
		filter: blur(20px);

		>image {
			width: 100%;
		}
	}

	.content {
		padding: 30rpx;
		position: relative;
		z-index: 1;
	}

	.content-top {
		height: 240rpx;
		display: flex;
	}

	.img {
		width: 240rpx;
		height: 240rpx;
		flex-shrink: 0;
		border-radius: 20rpx;
		overflow: hidden;
		margin-right: 20rpx;

		image {
			width: 100%;
		}
	}

	.top-title {
		flex: 1;

		.top-tit {
			font-size: 16px;
			font-weight: 700;
			color: #FFFFFF;
		}

		.tit-img {
			margin-top: 20rpx;
			display: flex;
			align-items: center;

			>image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}

			>text {
				color: #FFFFFF;
				font-size: 12px;
			}
		}
	}

	.content-middle {
		height: 60rpx;
		margin: 20rpx 0;
		color: #FFFFFF;
		font-size: 12px;
		overflow: hidden;
	}

	.content-bottom {
		display: flex;
		height: 70rpx;
		margin: 20rpx 0;

		.bottom-text {
			width: 200rpx;
			height: 70rpx;
			background: rgba(255, 255, 255, 0.5);
			border-radius: 35rpx;
			margin-right: 30rpx;
			font-size: 12px;
			color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.list-tit {
		height: 100rpx;
		display: flex;
		align-items: center;

		.icon {
			margin: 0 10rpx 0 20rpx;
		}

		>text {
			font-size: 12px;
		}
	}

	.song-item {
		height: 128rpx;
		border-top: 2rpx solid #cccccc;
		padding: 0 10rpx 0 30rpx;
		display: flex;
		align-items: center;

		>text {
			font-size: 16px;
			font-weight: 700;
			// line-height: 128rpx;
			margin-right: 20rpx;
		}

		.song-detail {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.song-name {
				display: flex;
				flex-direction: column;

				>text:nth-child(1) {
					font-size: 14px;
					line-height: 20px;
				}

				>text:nth-child(2) {
					font-size: 12px;
					color: #999999;
				}
			}
		}
	}
</style>