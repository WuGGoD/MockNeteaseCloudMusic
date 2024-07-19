<script setup>
	import { ref } from 'vue'
	import songsLIstVue from '../rankingPlaylist/songsLIst/songsLIst.vue'
	import { getRecommendApi } from '../../../../services'
	
	const list = ref([])
	
	const getRecommend = async () => {
		const res = getRecommendApi()
		console.log(res)
	}
	getRecommend()
	
</script>

<template>
	<songsLIstVue></songsLIstVue>
</template>


<style lang="scss" scoped>

</style>
