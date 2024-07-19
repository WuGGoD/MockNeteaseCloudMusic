<script setup>
import { ref } from 'vue';
import songList from './list.vue';
import { getListApi } from '../../services/index.js';
const list = ref(null);
const getList = async () => {
    const res = await getListApi();
    console.log(res.result);
    list.value = res.result;
};
getList();
</script>

<template>
    <view class="list">
        <songList
            v-for="(item, index) in 5"
            :key="item"
            :songList="list?.slice(index * 6 + 1, (index + 1) * 6)" />
    </view>
</template>

<style>
.list {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
}
</style>
