<script setup>
	import { ref } from 'vue'
	import { getRankApi } from '../../../../services'
	
	const officialList = ref([])
	const otherList = ref([])
	
	const getRank = async () => {
		const res = await getRankApi()
		console.log(res.data.list)
		officialList.value = res.data.list.slice(0, 4)
		otherList.value = res.data.list.slice(4)
	}
	getRank()

</script>

<template>
	<view class="box">
		<view class="official">
			<view class="official-list">
				<uni-section title="官方榜" type="line" class="custom-section">
					<uni-card
						v-for="item in officialList"
						:key="item.id"
						:title="item.name"
						:sub-title="item.playCount"
						:extra="item.updateFrequency"
						:thumbnail="item.coverImgUrl"
						@click="onClick" 
						>
						<view class="uni-body">
							<view class="item-song" v-for="(songs, index) in item.tracks" :key="songs.first">
								<text class="songs-title">{{index + 1}}.{{songs.first}}</text> - {{songs.second}}
							</view>
						</view>
					</uni-card>
				</uni-section>
			</view>
		</view>
		<view class="other">
			<uni-section title="其他榜单" type="line" padding>
				<uni-grid class="uni-grids" :column="3" :show-border="false" :square="false" @change="change">
					<uni-grid-item v-for="(item ,index) in otherList" :index="index" :key="item.id">
						<view class="grid-item-box">
							<image class="image" :src="item.coverImgUrl" mode="widthFix" />
						</view>
					</uni-grid-item>
				</uni-grid>
			</uni-section>
		</view>
	</view>
</template>


<style lang="scss" scoped>
.item-song{
	line-height: 48rpx;
	font-size: 12px;
}
.uni-body{
	overflow: hidden;
	height: 150rpx;
}
.songs-title{
	color: #6a6a6a;
	font-size: 12px;
	font-weight: 700;
}
.other{
	padding: 20rpx 0 20rpx 20rpx;
}
.grid-item-box{
	width: 204rpx;
	height: 204rpx;
	.image{
		width: 100%;
		border-radius: 20rpx;
	}
}

.uni-grid-item{
	width: 204rpx;
	margin-bottom: 20rpx;
}
	
.uni-grid-item__box{
	align-items: center;
}
</style>
