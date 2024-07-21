import {
	defineStore
} from 'pinia'

import {
	ref,
	nextTick
} from 'vue'

import {
	getSearchResultDeatilApi
} from '../services'

export const useUserStore = defineStore('deatil', () => {
	const keyword = ref('')
	const searchResultDetail = ref([])
	const historyList = ref(JSON.parse(localStorage.getItem('searchHistory')) || [])
	
	const getResuletDetailFn = () => {
		if (keyword.value) {
			const getResultList = async () => {
				const res = await getSearchResultDeatilApi(keyword.value)
				nextTick(() => {
					searchResultDetail.value = res.result.songs
				})
			}
			getResultList()
		}
	}

	return {
		searchResultDetail,
		getResuletDetailFn,
		keyword,
		historyList
	}
})