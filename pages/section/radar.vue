<script setup>
import { computed, ref } from 'vue';
import {useUserStore }from '../../store/userInfo.js'
import songList from './list.vue';
import songs from './songs.vue';
import { getListApi } from '../../services/index.js';
const userStore =useUserStore()
const nameList =ref(['推荐歌单' ,'热门榜单','网易云音乐的雷达歌单','专属场景歌单' ,'视频合辑'])
const list = ref(null);
const getList = async () => {
    const res = await getListApi();
    console.log(res.result);
    list.value = res.result;
};
getList();
const num = computed(()=>{
	return userStore.account?2:5
}) //登录与未登录
</script>

<template>
    <view class="list">
        <component
            v-for="(item, index) in num"
            :key="item"
            :songList="list?.slice(index * 6 + 1, (index + 1) * 6)"
			:nameList="nameList[index]"
			:is='index===1?songs:songList'
			 />
    </view>
</template>

<style scoped lang="scss">
.list {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
}
.list::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 */
}
</style>
