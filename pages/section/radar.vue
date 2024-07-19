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
    <songList
        v-for="(item, index) in 5"
        :key="item"
        :songList="list?.slice(index * 6 + 1, (index + 1) * 6)" />
</template>

<style></style>
