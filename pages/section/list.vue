<script setup>
import { defineProps } from 'vue';
const props = defineProps(['songList' ,'nameList']);
import { ref } from 'vue';
const toDetail =id =>{
	// console.log(id)
	uni.navigateTo({
		url:`/pages/index/banner/rankingPlaylist/rankingPlaylist?id=${id}`,
	})
}
</script>

<template>
    <view class="section">
        <view class="section-header ">
            <view class="section-header-line"> </view>
            <view class="section-header-content" v-for="(name ,index) in nameList" :key="index">
                <span>{{name}}</span>
            </view>
        </view>
        <view class="section-content" >
            <view
                class="section-content-playlist"
                v-for="item in songList"
                key="item.id">
                <view class="section-content-playitem" @click="toDetail(item.id)">
                    <img :src="item.picUrl" alt="" />
                </view>
                <view class="playlist-item-name">
                    {{ item.name }}
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped lang="scss">
.section {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .section-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 24rpx 20rpx;
        font-weight: 400;
        .section-header-line {
            width: 8rpx;
            height: 24rpx;
            border-radius: 20rpx;
            background-color: #c84341;
        }
        .section-header-content {
			 display: flex;
			justify-content: space-between;
            span {
                margin-left: 20rpx;
            }
        }
    }
    .section-content {
        // overflow-x:auto;
		// overflow-y: hidden;
		position: relative;
		white-space: nowrap;
        display: flex;
        padding: 0 10rpx 20rpx;
        font-size: 14px;
        .section-content-playlist {
			 display: inline-block;
			   vertical-align: top; /* 垂直居中对齐 */
            flex-shrink: 0;
            padding: 0 10rpx 20rpx;
            width: auto;
			overflow: auto;
            .section-content-playlist::-webkit-scrollbar {
                display: none; /* 隐藏滚动条 */
            }
            .section-content-playitem {
                width: 240rpx;
                margin-right: 20rpx;
                img {
                    width: 240rpx;
                    height: 240rpx;
                    border-radius: 10rpx;
                }
            }
            .playlist-item-name {
                font-size: 24rpx;
                width: 240rpx;
				height: 70rpx;
				text-wrap: wrap;
            }
        }
    }
}
.section-content::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 */
}
</style>
