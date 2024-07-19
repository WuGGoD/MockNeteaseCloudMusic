import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue';
import {
	loginStatus,
	getUserDetail,
	getUserAccount,
	getUserSubcount,
	getUserLevel,
} from '../services';

export const useUserStore = defineStore('user', () => {
	const verify = uni.getStorageSync('verify') ? ref(uni.getStorageSync('verify')) : ref(null)
	const account = uni.getStorageSync('account') ? ref(uni.getStorageSync('account')) : ref(null)

	const getAccount = async () => {
		const res = await loginStatus()
		console.log('89989898989', res);
		uni.setStorageSync('account', res.data.account)
		account.value = res.data.account
		console.log(account.value);
		if (res.data.account) {
			userDetail()
		}
	}

	const userDetail = async () => {
		const res = await getUserDetail(account.value.id)
		const accountInfo = await getUserAccount();
		const subcountInfo = await getUserSubcount();
		const levelInfo = await getUserLevel();
		console.log('detail', res);
		console.log(2222222222, accountInfo);
		console.log(33333, subcountInfo);
		console.log(44444444, levelInfo);
		const obj = {
			...res.profile,
			level: levelInfo.data.level,
			listenSongs: res.listenSongs || 99999,
			createDays: res.createDays || 99999,
		}
		verify.value = obj
		uni.setStorageSync('verify', obj)
	}

	return {
		verify,
		account,
		userDetail,
		getAccount
	}
})