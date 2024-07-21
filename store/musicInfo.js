import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue'
import {
	getRankDetailApi
} from '../services'

export const useMusicStore = defineStore('music', () => {
	const playList = ref(null)
	const listId = ref('19723756')

	const getSongs = async () => {
		const res = await getRankDetailApi(listId.value)
		playList.value = res.playlist.tracks
	}
	
	const getListId = (id) => {
		listId.value = id
	}
	
	return {
		playList,
		listId,
		getListId,
		getSongs
	}
})