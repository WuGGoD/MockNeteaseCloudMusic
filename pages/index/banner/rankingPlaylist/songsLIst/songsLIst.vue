<script setup>
	import { defineProps } from 'vue'
	import { useMusicStore } from '../../../../../store/musicInfo'
	
	const props = defineProps(['list', "listId"])
	const musicStore = useMusicStore()
	
	const play = id => {
		musicStore.getListId(id)
		uni.navigateTo({
			url: `/pages/index/banner/rankingPlaylist/rankingPlaylist?id=${encodeURIComponent(id)}`,
			success: function () {
				console.log('跳转成功');
			},
			fail: function (err) {
				console.error('跳转失败', err);
			}
		})
	}

</script>

<template>
	<view class="list">
		<view class="list-tit">
			<view class="icon">
				<svg t="1721374876019" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					p-id="4478" id="mx_n_1721374876020" width="28" height="28">
					<path
						d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
						fill="#dc0019" p-id="4479"></path>
					<path
						d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
						fill="#dc0019" p-id="4480"></path>
				</svg>
			</view>
			<text @click="play(listId)">播放全部({{list?.length ? list.length : 0}})</text>
		</view>
		<view class="songs-list">
			<view class="song-item" v-if="list" v-for="(item, index) in list" :key="item.id" @click="play(listId)">
				<text>{{index + 1}}</text>
				<view class="song-detail">
					<view class="song-name">
						<text>{{item.name}}</text>
						<text>{{item.ar[0].name}}</text>
					</view>
					<uni-icons type="forward" size="16" color="grey"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
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
