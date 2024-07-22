<script setup>
	import { ref } from 'vue';
	import { getSongsApi } from '../../services';
	const songsList =ref(null)
	const getSongs=async () => {
    const res = await getSongsApi();
    console.log(res);
    songsList.value = res.result;
}
getSongs()
const toPlay =id=>{
	uni.navigateTo({
		url:`/pages/audio/audio?id=${id}`,
	})
}
</script>

<template>
	<view class="songs">
	        <view class="header">大家都在听</view>
	        <view class="main">
	            <view class="guess" v-for="(item,index) in songsList" :key="item.id">
	                <view class="guepop">
	                    <img :src="item.picUrl" alt=""/>
	                    <view class="gueName">{{item.name}}</view>
	                   <svg t="1721373746970" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4498" width="32" height="32"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z" fill="#666666" p-id="4499"></path><path d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z" fill="#666666" p-id="4500" @click="toPlay(item.id)"></path></svg>
	                </view>
	            </view>
	        </view>
	    </view>
</template>

<style scoped lang="scss">
	.songs{
	        padding: 20rpx 40rpx;
	    }
	    .header{
	        border-left: 10rpx solid #C84341;
	        padding-left: 20rpx;
	    }
	    .main{
	        display: flex;
	        flex-direction: column;
	        margin: 40rpx 0 0;
	        height: 350rpx;
	        flex-wrap: wrap;
	        overflow-x: auto;
	        scrollbar-width:none;
	        .guepop{
	            margin: 10rpx;
	            display: flex;
	            justify-content: center;
	            align-items: center;
	            >img{
	                border-radius: 10rpx;
	                width: 90rpx;
	                height: 90rpx;
	            }
	            .gueName{
	                padding-left: 20rpx;
	                width: 500rpx;
	                height: 80rpx;
	                font-size: 28rpx;
	                display: -webkit-box;
	                -webkit-box-orient: vertical;
	                -webkit-line-clamp: 2;
	                text-overflow: ellipsis;
	                overflow: hidden;
	            }
	        }
	    }
	    .guess{
	        display: flex;
	    }
</style>