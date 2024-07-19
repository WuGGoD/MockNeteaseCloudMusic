<script setup>
import { defineProps } from 'vue';

const props = defineProps(['songList']);
</script>

<template>
    <view class="section">
        <view class="section-header">
            <view class="section-header-line"> </view>
            <view class="section-header-content">
                <span>推荐歌单</span>
            </view>
        </view>
        <view class="section-content">
            <view
                class="section-content-playlist"
                v-for="item in songList"
                key="item.id">
                <view class="section-content-playitem">
                    <img :src="item.picUrl" alt="" />
                </view>
                <view class="playlist-item-name">
                    {{ item.name }}
                </view>
            </view>
        </view>
    </view>
</template>

<style>
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
            span {
                margin-left: 20rpx;
            }
        }
    }
    .section-content {
        overflow: auto;
        display: flex;
        padding: 0 10rpx 20rpx;
        font-size: 14px;
        .section-content-playlist {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            flex-shrink: 0;
            padding: 0 10rpx 20rpx;
            overflow: auto;
            .section-content-playlist::-webkit-scrollbar {
                display: none;
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
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>
