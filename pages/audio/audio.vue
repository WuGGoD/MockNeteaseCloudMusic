<script setup>
import { ref, watch, computed } from 'vue';
import { singleSong } from '../../services';
import { useMusicStore } from '../../store/musicInfo';

const curIndex = ref(10);

const songUrl = ref('');
const songDetail = ref(null);
const audioManager = uni.createInnerAudioContext();
audioManager.autoplay = true;

const useStore = useMusicStore();
useStore.getSongs().then(() => {
    songDetail.value = useStore.playList[curIndex.value];
    console.log(songDetail.value);
    console.log(songDetail.value.al.picUrl);

    watch(
        () => songDetail.value,
        async () => {
            uni.setNavigationBarTitle({
                title: songDetail.value?.name,
            });
            const res = await singleSong(songDetail.value?.al.id);
            console.log(9999999, res);
        },
        {
            deep: true,
            immediate: true,
        }
    );
    watch(
        () => curIndex.value,
        () => {
            songDetail.value = useStore.playList[curIndex.value];
        },
        {
            immediate: true,
        }
    );
});
const playBtnSrc = computed(() => {
    return audioManager.paused
        ? '../../static/icon/zanting.png'
        : '../../static/icon/bofang.png';
});
const playPause = () => {
    if (audioManager.paused) {
        audioManager.play();
        return;
    }
    audioManager.pause();
};
</script>

<template>
    <view class="bg">
        <view
            class="blur"
            :style="{ backgroundImage: `url(${songDetail?.al.picUrl})` }">
        </view>
        <view class="rotate">
            <view class="discs">
                <view class="img">
                    <image
                        style="width: 800rpx"
                        :src="songDetail?.al.picUrl"
                        mode=""></image>
                </view>
            </view>
        </view>
        <view class="control">
            <view class="icons-bar">
                <uni-icons type="heart" size="40" color="#ffffff"></uni-icons>
                <uni-icons type="chat" size="40" color="#ffffff"></uni-icons>
            </view>
            <view class="progress">
                <view class="time"> 00:00 </view>
                <slider
                    activeColor="#10AEFF"
                    backgroundColor="#ffffff"
                    block-color="#ffffff"
                    block-size="10" />
                <view class="time"> 03:00 </view>
            </view>
            <view class="play-bar">
                <image
                    v-if="audioManager.loop"
                    class="icon"
                    src="../../static/icon/suiji.png"
                    mode="widthFix"></image>
                <uni-icons
                    v-else
                    class="icon"
                    type="loop"
                    color="#ffffff"></uni-icons>
                <uni-icons
                    class="icon"
                    type="arrow-left"
                    color="#ffffff"></uni-icons>
                <image
                    class="icon nobg"
                    :src="playBtnSrc"
                    mode="widthFix"
                    @click="playPause"></image>
                <uni-icons
                    class="icon"
                    type="arrow-right"
                    color="#ffffff"></uni-icons>
                <uni-icons class="icon" type="list" color="#ffffff"></uni-icons>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.bg {
    width: 100vw;
    height: calc(100vh - 88rpx);
    position: relative;
}
.blur {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: center center;
    filter: blur(20rpx);
    z-index: -9;
}
.rotate {
    width: 100%;
    height: 800rpx;
    overflow: hidden;
}
@keyframes playing {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

.discs {
    width: 100%;
    height: 100%;
    padding: 0 50rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: center center;
    animation: playing 60s infinite linear;
}
.img {
    width: 650rpx;
    height: 650rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 80rpx solid rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    overflow: hidden;
}
.bar {
    margin-top: 200rpx;
    width: 100%;
    display: flex;
    justify-content: space-between;
    input {
        width: 500rpx;
        padding: 0;
    }
}
.control {
    height: 300rpx;
}
.icons-bar {
    display: flex;
    justify-content: center;
    .uni-icons {
        margin: 0 40rpx;
    }
}
.progress {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20rpx;
    color: #ffffff;
    .time {
        width: 80rpx;
        text-align: center;
    }
    slider {
        flex: 1;
    }
}
.play-bar {
    display: flex;
    justify-content: space-around;
    padding: 0 20rpx;
    .icon {
        width: 80rpx;
        height: 80rpx;
        font-size: 80rpx !important;
        display: flex;
        justify-content: center;
        align-items: center;
        ::v-deep text {
            font-size: 80rpx !important;
        }
    }
}
</style>
