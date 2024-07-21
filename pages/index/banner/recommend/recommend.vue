<script setup>
	import { ref } from 'vue'
	import songsLIstVue from '../rankingPlaylist/songsLIst/songsLIst.vue'
	import { getRecommendApi } from '../../../../services'
	import { useUserStore } from '../../../../store/userInfo'
	
	const userStore = useUserStore()
	const list = ref([])
	
	const getRecommend = async () => {
		const res = await getRecommendApi()
		list.value = res.data.dailySongs
	}
	getRecommend()
	
</script>

<template>
	<songsLIstVue :list="list"></songsLIstVue>
</template>


<style lang="scss" scoped>

</style>
