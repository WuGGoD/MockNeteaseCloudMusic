<script setup>
import { ref, watch, computed, nextTick } from 'vue';
import { singleSong, songCheck } from '../../services';
import { useMusicStore } from '../../store/musicInfo';
import { onReady, onLoad } from '@dcloudio/uni-app';
import comment from '@/pages/index/banner/rankingPlaylist/comment/comment.vue';

const show = ref(false);
const clickComment = () => {
    console.log(222222);
    show.value = true;
};

const curIndex = ref(0);

const songUrl = ref('');
const songDetail = ref(null);
const audioManager = uni.createInnerAudioContext();
audioManager.autoplay = true;
const isPlay = ref(true);
let timeAfter;
const duration = ref(0);
const currentTime = ref(0);

const useStore = useMusicStore();

useStore.getSongs().then(() => {
    songDetail.value = useStore.playList[curIndex.value];

    watch(
        () => songDetail.value,
        async () => {
            uni.setNavigationBarTitle({
                title: songDetail.value?.name,
            });
            const isWork = await songCheck(songDetail.value?.al.id);
            if (!isWork.success) {
                isPlay.value = false;
                duration.value = 0;
                currentTime.value = 0;
                audioManager.offCanplay();
                audioManager.offTimeUpdate();
                uni.showToast({
                    title: isWork.message,
                    icon: 'error',
                });
                timeAfter = setTimeout(() => {
                    uni.hideToast();
                    clearTimeout(timeAfter);
                }, 1000);
                return;
            }
            const res = await singleSong(songDetail.value?.al.id);
            console.log(9999999, res, res.data[0].url);
            audioManager.src = res.data[0].url;
            audioManager.onCanplay(() => {
                duration.value = audioManager.duration;
                currentTime.value = audioManager.currentTime;
                audioManager.play();
            });
            audioManager.onTimeUpdate(() => {
                currentTime.value = audioManager.currentTime;
            });
        },
        {
            deep: true,
            immediate: true,
        }
    );
    watch(
        () => curIndex.value,
        () => {
            uni.hideToast();
            clearTimeout(timeAfter);
            songDetail.value = useStore.playList[curIndex.value];
        },
        {
            immediate: true,
        }
    );
});
const playBtnSrc = computed(() => {
    return isPlay.value
        ? '../../static/icon/zanting.png'
        : '../../static/icon/bofang.png';
});
const playPause = () => {
    isPlay.value = !isPlay.value;
    if (audioManager.paused) {
        audioManager.play();
        return;
    }
    audioManager.pause();
};
const changeCurSong = num => {
    if (curIndex.value === 0 && num === -1) {
        curIndex.value = useStore.playList.length - 1;
        return;
    }
    if (curIndex.value === useStore.playList.length - 1 && num === 1) {
        curIndex.value = 0;
        return;
    }
    curIndex.value += num;
};
const zero = num => (num >= 10 ? num : '0' + num);
const formatTime = num =>
    `${zero(Math.floor(num / 60))}:${zero(parseInt(num % 60))}`;
</script>

<template>
    <view class="bg">
        <view
            class="blur"
            :style="{ backgroundImage: `url(${songDetail?.al.picUrl})` }">
        </view>
        <view class="rotate">
            <view class="discs">
                <view :class="['img', { animate: isPlay }]">
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
                <uni-icons
                    type="chat"
                    size="40"
                    color="#ffffff"
                    @click="clickComment"></uni-icons>
            </view>
            <view class="progress">
                <view class="time">
                    {{ formatTime(currentTime) }}
                </view>
                <slider
                    :value="(currentTime / duration) * 100"
                    activeColor="#10AEFF"
                    backgroundColor="#ffffff"
                    block-color="#ffffff"
                    block-size="10" />
                <view class="time">
                    {{ formatTime(duration) }}
                </view>
            </view>
            <view class="play-bar">
                <image
                    v-if="!useStore.isLoop"
                    class="icon"
                    src="../../static/icon/suiji.png"
                    mode="widthFix"
                    @click="useStore.playMethod(true)"></image>
                <uni-icons
                    v-else
                    class="icon"
                    type="loop"
                    color="#ffffff"
                    @click="useStore.playMethod(false)"></uni-icons>
                <uni-icons
                    class="icon"
                    type="arrow-left"
                    color="#ffffff"
                    @click="changeCurSong(-1)"></uni-icons>
                <image
                    class="icon nobg"
                    :src="playBtnSrc"
                    mode="widthFix"
                    @click="playPause"></image>
                <uni-icons
                    class="icon"
                    type="arrow-right"
                    color="#ffffff"
                    @click="changeCurSong(1)"></uni-icons>
                <uni-icons class="icon" type="list" color="#ffffff"></uni-icons>
            </view>
        </view>
    </view>
    <comment v-if="show" @hide="show = false" :songId="songDetail?.al.id" />
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
}
.animate {
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
