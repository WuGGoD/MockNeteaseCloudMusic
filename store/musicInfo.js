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
	const copyList = ref(null)
	const isLoop = ref(false)
	const curIndex = ref(0)
	const listId = ref('24381616') //19723756

	const getSongs = async () => {
		const res = await getRankDetailApi(listId.value)
		playList.value = res.playlist.tracks
		copyList.value = [...res.playlist.tracks]
	}

	const playMethod = bol => {
		//true是random,false是loop
		isLoop.value = bol
		if (bol) {
			playList.value.sort((a, b) => Math.random())
			return
		}
		playList.value = copyList.value
	}
	return {
		playList,
		listId,
		isLoop,
		curIndex,
		getSongs,
		playMethod
	}
})