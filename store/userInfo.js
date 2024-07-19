import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue';
import {
	loginStatus,
	getUserDetail
} from '../services';

export const useUserStore = defineStore('user', () => {
	const verify = ref(null)
	const account = ref(null)

	const userDetail = async () => {
		const res = await getUserDetail(account.value.id)
		verify.value = {
			...res.profile,
			level: res.level,
			listenSongs: res.listenSongs,
			createDays: res.createDays,
		}
	}

	const getAccount = async () => {
		const res = await loginStatus()
		console.log('1111111', res);
		account.value = res.data.account
		console.log(account.value);
		if (res.data.account) {
			userDetail()
		}
	}
	return {
		verify,
		account,
		userDetail,
		getAccount
	}
})