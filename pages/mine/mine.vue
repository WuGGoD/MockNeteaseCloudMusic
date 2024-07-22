<script setup>
import { ref, watch, nextTick } from 'vue';
import { useUserStore } from '../../store/userInfo.js';
import { getUserDetail, getPlayList } from '../../services/index.js';

const userStore = useUserStore();

const playList = ref(null);
const userDetail = async () => {
    console.log(userStore.account);
    const detail = await getUserDetail(userStore.account.id);
    const list = await getPlayList(userStore.account.id);
    playList.value = list.playlist;
    nextTick();
};

watch(
    () => userStore.verify,
    () => {
        if (userStore.verify) {
            userDetail();
        }
    },
    {
        deep: true,
        immediate: true,
    }
);

const goPlayList = id => {
    uni.navigateTo({
        url: `/pages/index/banner/rankingPlaylist/rankingPlaylist?id=${id}`,
    });
};
</script>

<template>
    <view class="mine"> 我的音乐 </view>
    <view class="text" v-if="!userStore.verify">
        <navigator url="/pages/login/login">去登陆</navigator>
    </view>
    <view class="scroll" v-if="userStore.verify">
        <view
            class="header"
            :style="{
                backgroundImage: `url(${userStore.verify?.backgroundUrl})`,
            }">
            <image
                class="avatar"
                :src="userStore.verify?.avatarUrl"
                mode="aspectFill"></image>
            <view class="nickname">
                {{ userStore.verify?.nickname }}
            </view>
            <view class="desc">
                <view class="desc-tag">
                    <text class="bold">{{ userStore.verify?.followeds }}</text>
                    关注
                </view>
                <view class="desc-tag">
                    <text class="bold">{{ userStore.verify?.follows }}</text>
                    粉丝
                </view>
                <view class="desc-tag">
                    <text class="bold">Lv.{{ userStore.verify?.level }}</text>
                    等级
                </view>
                <view class="desc-tag">
                    <text class="bold">
                        {{ userStore.verify?.listenSongs }}首
                    </text>
                    听歌
                </view>
            </view>
        </view>
        <uni-list>
            <uni-list-item
                v-for="item in playList"
                :key="item.id"
                :title="item.name"
                :note="`${item.trackCount}首·${item.playCount}次播放`"
                :thumb="item.coverImgUrl"
                thumb-size="lg"
                clickable="true"
                @click="goPlayList(item.id)">
            </uni-list-item>
        </uni-list>
    </view>
</template>

<style lang="scss" scoped>
.mine {
    width: 100%;
    height: 100rpx;
    color: #ffffff;
    font-size: 50rpx;
    font-weight: bold;
    background-color: #fc3d49;
    text-align: center;
    line-height: 100rpx;
}
.text {
    @extend .mine;
    font-size: 36rpx;
    font-weight: normal;
    background-color: #f8f8f8;
    color: #000000;
    border-bottom: 1rpx solid #888888;
}
.header {
    height: 450rpx;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
.avatar {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
    border: 1px solid #ffffff;
    margin: 100rpx auto 20rpx;
    display: block;
}
.nickname {
    text-align: center;
    color: #ffffff;
    font-weight: bold;
}
.desc {
    display: flex;
    justify-content: center;
    color: #cfc4c4;
    font-size: 14px;
    padding: 20rpx 0;
}
.desc-tag {
    margin: 0 20rpx;
}
.bold {
    font-weight: bold;
    margin-right: 10rpx;
    color: #ffffff;
}
</style>
